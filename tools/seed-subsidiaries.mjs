// One-time seed: write the subsidiaries network into Sanity as the single "subsidiaries" document
// (one Studio tab) so the client manages it in one place. Mirrors the runtime fallback in
// src/app/core/subsidiaries/subsidiaries.data.ts. Idempotent: fixed _id "subsidiaries" +
// createOrReplace; also deletes any leftover per-mill `subsidiary` docs from the initial model.
//
//   node tools/seed-subsidiaries.mjs            # write (needs SANITY_WRITE_TOKEN)
//   node tools/seed-subsidiaries.mjs --dry-run  # print mutations, no write
import { pathToFileURL } from 'node:url';

const PROJECT = 'a2vvkgqy';
const DATASET = 'production';
const API_VERSION = '2026-03-01';

const PORTS = [
  {
    name: 'Nghi Son Port',
    subsidiaries: [
      { name: 'THANH HOA MILL', location: 'Nghi Son Economic, Thanh Hoa', rawMaterial: 'Nghe An, Thanh Hoa (within 200km)' },
      { name: 'DAI DUONG MILL', location: 'Nghi Son Economic, Thanh Hoa', rawMaterial: 'Nghe An, Thanh Hoa (within 200km)' },
      { name: 'PTSC MILL', location: 'Nghi Son Economic, Thanh Hoa', rawMaterial: 'Nghe An, Thanh Hoa (within 200km)' },
      { name: 'TAN NHAT THANKS MILL', location: 'Nhu Thanh district, Thanh Hoa province', rawMaterial: 'Nghe An, Thanh Hoa (within 80km)' },
      { name: 'XUAN SON BAI TRANH MILL', location: 'Trieu Son district, Thanh Hoa province', rawMaterial: 'Nghe An, Thanh Hoa (within 50km)' },
      { name: 'DONG HOI MILL', location: 'Quy Chau district, Nghe An province', rawMaterial: 'Nghe An, Thanh Hoa (within 50km)' },
      { name: 'HOP LUC MILL', location: 'Quy Chau district, Nghe An province', rawMaterial: 'Nghe An, Thanh Hoa (within 50km)' },
    ],
  },
  {
    name: 'Vissai Port',
    subsidiaries: [
      { name: 'NGHE AN FOREST PRODUCTS COMPANY', capacity: '200,000 BDMT/year', rawMaterial: 'Nghe An (within 200km)' },
      { name: 'PHUONG DONG JSC', capacity: '80,000 BDMT/year', rawMaterial: 'Nghe An (within 100km)' },
      { name: 'TAY SON 1 LTD', capacity: '80,000 BDMT/year', rawMaterial: 'Nghe An (within 100km)' },
      { name: 'TAY SON 2 LTD', capacity: '80,000 BDMT/year', rawMaterial: 'Nghe An (within 100km)' },
      { name: 'SONG LAM YARD' },
    ],
  },
];

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function buildMutations() {
  const ports = PORTS.map((port) => ({
    _key: slug(port.name),
    _type: 'port',
    name: port.name,
    subsidiaries: port.subsidiaries.map((s) => ({
      _key: slug(s.name),
      _type: 'subsidiaryItem',
      name: s.name,
      ...(s.location ? { location: s.location } : {}),
      ...(s.capacity ? { capacity: s.capacity } : {}),
      ...(s.distance ? { distance: s.distance } : {}),
      ...(s.rawMaterial ? { rawMaterial: s.rawMaterial } : {}),
    })),
  }));

  // Remove the earlier per-mill documents, then write the single "subsidiaries" document.
  return [
    { delete: { query: '*[_type == "subsidiary"]' } },
    { createOrReplace: { _id: 'subsidiaries', _type: 'subsidiaries', ports } },
  ];
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const mutations = buildMutations();
  const total = PORTS.reduce((n, p) => n + p.subsidiaries.length, 0);
  console.log(`Built singleton with ${PORTS.length} ports, ${total} subsidiaries (+ cleanup of old docs).`);
  if (dryRun) {
    console.log(JSON.stringify(mutations.find((m) => m.createOrReplace), null, 2).slice(0, 1200));
    return;
  }
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) throw new Error('SANITY_WRITE_TOKEN is not set');
  const url = `https://${PROJECT}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}?returnIds=true`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ mutations }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Sanity write failed: ${res.status} ${JSON.stringify(json)}`);
  console.log(`Done. ${total} subsidiaries written as the single "subsidiaries" document.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
