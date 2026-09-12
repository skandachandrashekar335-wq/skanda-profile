const fs = require('fs');
const path = require('path');

const glbPath = path.join(__dirname, '..', 'public', 'assets', 'computer', 'computer.glb');
const data = new Uint8Array(fs.readFileSync(glbPath));

let offset = 12;
const chunks = [];
while (offset < data.length) {
  const chunkLength = data[offset] | (data[offset+1] << 8) | (data[offset+2] << 16) | (data[offset+3] << 24);
  const chunkType = data[offset+4] | (data[offset+5] << 8) | (data[offset+6] << 16) | (data[offset+7] << 24);
  chunks.push({ chunkType, offset: offset + 8, length: chunkLength });
  offset += 8 + chunkLength;
  if (chunkLength % 4 !== 0) offset += 4 - (chunkLength % 4);
}

const jsonChunk = chunks.find(c => c.chunkType === 0x4E4F534A);
const binChunk = chunks.find(c => c.chunkType === 0x004E4942);
const gltf = JSON.parse(new TextDecoder().decode(data.slice(jsonChunk.offset, jsonChunk.offset + jsonChunk.length)));
const binData = data.slice(binChunk.offset, binChunk.offset + binChunk.length);

function getAccessorFloats(accessorIdx) {
  const acc = gltf.accessors[accessorIdx];
  if (acc.componentType !== 5126) return null;
  const bv = gltf.bufferViews[acc.bufferView];
  const byteOffset = (bv.byteOffset || 0) + (acc.byteOffset || 0);
  const comps = acc.type === 'SCALAR' ? 1 : acc.type === 'VEC2' ? 2 : acc.type === 'VEC3' ? 3 : acc.type === 'VEC4' ? 4 : 1;
  const result = [];
  for (let i = 0; i < acc.count; i++) {
    const vals = [];
    for (let c = 0; c < comps; c++) {
      const start = byteOffset + i * comps * 4 + c * 4;
      vals.push(new DataView(binData.buffer, binData.byteOffset + start, 4).getFloat32(0, true));
    }
    result.push(vals);
  }
  return result;
}

function computeBounds(positions) {
  if (!positions || positions.length === 0) return null;
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  for (const p of positions) {
    if (p[0] < minX) minX = p[0]; if (p[1] < minY) minY = p[1]; if (p[2] < minZ) minZ = p[2];
    if (p[0] > maxX) maxX = p[0]; if (p[1] > maxY) maxY = p[1]; if (p[2] > maxZ) maxZ = p[2];
  }
  return {
    min: [minX, minY, minZ],
    max: [maxX, maxY, maxZ],
    size: [+(maxX - minX).toFixed(4), +(maxY - minY).toFixed(4), +(maxZ - minZ).toFixed(4)],
    center: [+((minX + maxX) / 2).toFixed(4), +((minY + maxY) / 2).toFixed(4), +((minZ + maxZ) / 2).toFixed(4)]
  };
}

// Find GLTF_SceneRootNode
const scene = gltf.scenes[0];
const sketchfab_model = gltf.nodes[scene.nodes[0]];
const root = gltf.nodes[sketchfab_model.children[0]];
const GLTF_SceneRootNode = gltf.nodes[root.children[0]];
const children = GLTF_SceneRootNode.children;
console.log("GLTF_SceneRootNode children:", children.length);

const results = [];

for (const childIdx of children) {
  const node = gltf.nodes[childIdx];
  const name = node.name || `node_${childIdx}`;

  let totalVerts = 0;
  let totalIndices = 0;
  const allLocalPositions = [];

  const stack = [childIdx];
  while (stack.length > 0) {
    const idx = stack.pop();
    const n = gltf.nodes[idx];
    if (n.mesh !== undefined) {
      const mesh = gltf.meshes[n.mesh];
      for (const prim of (mesh.primitives || [])) {
        const posIdx = prim.attributes?.POSITION;
        if (posIdx !== undefined) {
          totalVerts += gltf.accessors[posIdx].count;
          const positions = getAccessorFloats(posIdx);
          if (positions) allLocalPositions.push(...positions);
        }
        if (prim.indices !== undefined) {
          totalIndices += gltf.accessors[prim.indices].count;
        }
      }
    }
    if (n.children) for (const c of n.children) stack.push(c);
  }

  const bounds = computeBounds(allLocalPositions);
  const nodeTransform = {
    pos: node.translation || [0, 0, 0],
    scale: node.scale || [1, 1, 1],
    rot: node.rotation ? `[${node.rotation.map(v => v.toFixed(3)).join(',')}]` : 'none'
  };

  results.push({ name, childIdx, verts: totalVerts, indices: totalIndices, bounds, nodeTransform });
}

results.sort((a, b) => b.verts - a.verts);

console.log("");
console.log("ALL 377 GROUPS — sorted by vertex count (descending)");
console.log("IDX | NAME | VERTS | LOCAL SIZE [W,H,D] | LOCAL CENTER | NODE POS | NODE SCALE");
console.log("----|------|-------|--------------------|--------------|----------|------------");
for (const r of results) {
  const sizeStr = r.bounds ? `[${r.bounds.size.join(',')}]` : 'N/A';
  const centerStr = r.bounds ? `[${r.bounds.center.join(',')}]` : 'N/A';
  const posStr = `[${r.nodeTransform.pos.map(v => v.toFixed(3)).join(',')}]`;
  const scaleStr = `[${r.nodeTransform.scale.map(v => v.toFixed(3)).join(',')}]`;
  console.log(`${r.childIdx} | ${r.name} | ${r.verts} | ${sizeStr} | ${centerStr} | ${posStr} | ${scaleStr}`);
}

console.log("");
console.log("Total verts:", results.reduce((sum, r) => sum + r.verts, 0));

// Breakdown by name prefix
const prefixes = {};
for (const r of results) {
  const prefix = r.name.replace(/\.\d+_\d+$/, '').replace(/_\d+$/, '');
  if (!prefixes[prefix]) prefixes[prefix] = { count: 0, verts: 0 };
  prefixes[prefix].count++;
  prefixes[prefix].verts += r.verts;
}
console.log("");
console.log("BREAKDOWN BY NAME PREFIX:");
for (const [prefix, data] of Object.entries(prefixes).sort((a, b) => b[1].verts - a[1].verts)) {
  console.log(`  ${prefix}: ${data.count} groups, ${data.verts} verts`);
}
