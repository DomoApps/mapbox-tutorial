# Mapbox World Map
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FDomoApps%2Fmapbox-tutorial.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FDomoApps%2Fmapbox-tutorial?ref=badge_shield)


A Domo Custom App that renders a world map with [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/), powered by a Domo dataset. Points are sized and colored by city population; the underlying dataset is wired through `manifest.json` mapping and served to the app via the dev-server proxy.

This repo is the companion sample for the **[Mapbox World Map tutorial](https://domo.com/docs/portal/Apps/App-Framework/Tutorials/React/Todo-App)**.

## What it demonstrates

- Scaffolding a Vite + React + TypeScript app with the [DA CLI](https://domo.com/docs/portal/Apps/App-Framework/Tools/da-cli)
- Uploading a CSV to Domo and wiring it through `manifest.json` `mapping[]` with field aliases
- Fetching mapped data with `ryuu.js` (`domo.get('/data/v1/geoData')`)
- Rendering points as a GeoJSON circle layer with per-feature radius/color expressions
- Using a custom Mapbox style (`map-style.json`) or a hosted Mapbox Studio style

## Project layout

```
src/
├── main.tsx                       # App entry (Provider optional — Redux is scaffolded but unused)
├── components/
│   ├── App/App.tsx                # Renders <Map />
│   └── Map/
│       ├── Map.tsx                # Fetch, transform, init map, add layer
│       ├── Map.module.scss
│       └── map-style.json         # Custom monochrome style (optional)
data/
└── World_Cities.csv               # Sample source dataset (~47k rows)
```

## Prerequisites

- Node 18+
- The [DA CLI](https://www.npmjs.com/package/@domoinc/da) and the [Domo CLI](https://domo.com/docs/portal/Apps/App-Framework/Quickstart/Setup-and-Installation)
- `domo login` completed against your target instance
- A free [Mapbox account](https://account.mapbox.com/auth/signup/) and access token

## Getting started

1. Upload `data/World_Cities.csv` to your Domo instance and grab its dataset ID.
2. Paste the dataset ID into `public/manifest.json` under `mapping[0].dataSetId`.
3. Publish an initial design to get a `proxyId`:

   ```bash
   pnpm install
   pnpm upload
   ```

4. Create a card on the published design (select the dataset when prompted) and copy the `id` + `proxyId` back into `public/manifest.json`.
5. Paste your Mapbox access token into `src/components/Map/Map.tsx` (replace `YOUR_MAPBOX_ACCESS_TOKEN`).
6. Run locally:

   ```bash
   pnpm start
   ```

See the [tutorial](https://domo.com/docs/portal/Apps/App-Framework/Tutorials/React/Todo-App) for the full walk-through.

## Scripts

| Command          | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `pnpm start`     | Vite dev server with the Domo proxy                   |
| `pnpm build`     | Lint, test, and build for production                  |
| `pnpm upload`    | Build and `domo publish` in one step                  |
| `pnpm generate`  | Scaffold new components / reducers with `da generate` |
| `pnpm test`      | Run Vitest                                            |
| `pnpm storybook` | Launch Storybook                                      |


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FDomoApps%2Fmapbox-tutorial.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FDomoApps%2Fmapbox-tutorial?ref=badge_large)