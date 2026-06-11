// The project id is public — it appears in every API request from the browser.
// TODO(day-4): fill in after creating the project at https://www.sanity.io/manage
// (also set sanity/.env for the studio — see sanity/.env.example).
export const SANITY_CONFIG = {
  projectId: 'your-project-id',
  dataset: 'production',
  apiVersion: '2026-03-01',
} as const;
