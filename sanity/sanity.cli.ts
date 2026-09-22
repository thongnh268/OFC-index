import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'thc-data',
  },
  // THC has its own hosted Studio; never reuse the OFC deployment appId.
  studioHost: 'thc',
});
