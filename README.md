# OFC-index

OFC company marketing website. Angular 19 SSR + Tailwind v4, bilingual VN/EN.

## Local development

```bash
npm install
npm run dev        # http://localhost:4200
npm run build      # browser + server bundles → dist/ofc-index/
npm run serve:ssr  # SSR server on http://localhost:4000
npm run lint
npm run typecheck
```

## THC Sanity configuration

- Project: `a2vvkgqy`.
- Website content, company settings and subsidiaries: dataset `thc-data`.
- News temporarily stays in `production`: homepage news, news listings, article details,
  and the news aggregator all use the existing dataset. Edit news in the OFC Studio.
- THC Studio target: `https://thc.sanity.studio`, configured with `studioHost: 'thc'`.
  This is the intended deployment URL; local configuration does not publish or reserve it.
- Copy `sanity/.env.example` to `sanity/.env` and set `SANITY_STUDIO_PROJECT_ID=a2vvkgqy`.
  Run `npm run dev` inside `sanity/` for local editing. Deploy separately when ready.
- Keep the OFC Studio deployment appId out of this branch.
- Push only when explicitly requested. Pushing Studio changes on `THC-develop` can trigger
  the Studio workflow; Cloudflare Pages also deploys this branch through Git integration.
