import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  // Hosted Studio at https://ofc.sanity.studio/ — pinning the appId keeps `sanity deploy`
  // non-interactive (no prompt), so it can run unattended (e.g. in CI).
  deployment: {
    appId: 'hrbvufqy2aexh62uzgwamoc3',
  },
});
