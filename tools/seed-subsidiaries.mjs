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
      { name: 'THANH HOA MILL', location: 'Nghi Son Economic, Thanh Hoa', capacity: '250,000 BDMT/year; Chipmill: 5', distance: '15 km', rawMaterial: 'Nghe An, Thanh Hoa (within 200km)' },
      { name: 'DAI DUONG MILL', location: 'Nghi Son Economic, Thanh Hoa', capacity: '200,000 BDMT/year; Chipmill: 4', distance: '17 km', rawMaterial: 'Nghe An, Thanh Hoa (within 200km)' },
      { name: 'PTSC MILL', location: 'Nghi Son Economic, Thanh Hoa', capacity: '200,000 BDMT/year; Chipmill: 4', distance: '0.5 km', rawMaterial: 'Nghe An, Thanh Hoa (within 200km)' },
      { name: 'VINH NHAT MILL', location: 'Nghi Son Economic, Thanh Hoa', capacity: '100,000 BDMT/year; Chipmill: 3', distance: '20 km', rawMaterial: 'Nghe An (within 150km)' },
      { name: 'XUAN SON 1 MILL', location: 'Trieu Son district, Thanh Hoa province', capacity: '50,000 BDMT/year; Chipmill: 2', distance: '80 km', rawMaterial: 'Nghe An, Thanh Hoa (within 50km)' },
      { name: 'NHAT DUY MILL', location: 'Trieu Son district, Thanh Hoa province', capacity: '50,000 BDMT/year; Chipmill: 2', distance: '80 km', rawMaterial: 'Thanh Hoa (within 50km)' },
      { name: 'XUAN SON 2 MILL', location: 'Thach Thanh district, Thanh Hoa province', capacity: '50,000 BDMT/year; Chipmill: 2', distance: '100 km', rawMaterial: 'Thanh Hoa (within 50km)' },
      { name: 'XUAN PHU MILL', location: 'Trieu Son district, Thanh Hoa province', capacity: '50,000 BDMT/year; Chipmill: 2', distance: '80 km', rawMaterial: 'Thanh Hoa (within 50km)' },
      { name: 'TAN NHAT THANKS MILL', location: 'Nhu Thanh district, Thanh Hoa province', capacity: '80,000 BDMT/year; Chipmill: 2', distance: '30 km', rawMaterial: 'Nghe An, Thanh Hoa (within 80km)' },
      { name: 'HUYEN HONG MILL', location: 'Trieu Son district, Thanh Hoa province', capacity: '50,000 BDMT/year; Chipmill: 2', distance: '80 km', rawMaterial: 'Thanh Hoa (within 50km)' },
      { name: 'LAM NGHIEP THANG 5 MILL', location: 'Nghia Dan district, Nghe An province', capacity: '50,000 BDMT/year; Chipmill: 2', distance: '50 km', rawMaterial: 'Nghe An (within 50km)' },
      { name: 'GIA BAO MILL', location: 'Thach Thanh district, Thanh Hoa province', capacity: '50,000 BDMT/year; Chipmill: 2', distance: '80 km', rawMaterial: 'Thanh Hoa (within 50km)' },
      { name: 'THANH TIEN MILL', location: 'Nghi Son Economic', capacity: '50,000 BDMT/year; Chipmill: 2', distance: '2 km', rawMaterial: 'Nghe An, Thanh Hoa (within 100km)' },
      { name: 'PHUC VINH MILL', location: 'Nghia Dan district, Nghe An province', capacity: '50,000 BDMT/year; Chipmill: 2', distance: '50 km', rawMaterial: 'Nghe An (within 50km)' },
      { name: 'HOANG HUY MILL', location: 'Quy Hop district, Nghe An province', capacity: '50,000 BDMT/year; Chipmill: 2', distance: '80 km' },
      { name: 'HOP LUC MILL', location: 'Quy Chau district, Nghe An province', capacity: '100,000 BDMT/year; Chipmill: 2', distance: '110 km' },
    ],
  },
  {
    name: 'Song Lam Port',
    subsidiaries: [
      { name: 'NGHE AN FOREST PRODUCTS COMPANY', capacity: '200,000 BDMT/year', distance: '4 km', rawMaterial: 'Nghe An (within 200km)' },
      { name: 'PHUONG DONG JSC', capacity: '80,000 BDMT/year', distance: '4 km', rawMaterial: 'Nghe An (within 100km)' },
      { name: 'TAY SON 1 LTD', capacity: '80,000 BDMT/year', distance: '60 km', rawMaterial: 'Nghe An (within 100km)' },
      { name: 'TAY SON 2 LTD', capacity: '80,000 BDMT/year', distance: '60 km', rawMaterial: 'Nghe An (within 100km)' },
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
