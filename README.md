# Datenstory Sensoren

An interactive data story about the perception of sensors in public space
("Wahrnehmung von Sensoren im öffentlichen Raum"). The project turns raw survey
data into a scrollable, chapter-based narrative built with
[SvelteKit](https://svelte.dev/docs/kit) and [D3](https://d3js.org/).

## Tech stack

- **SvelteKit 2** with **Svelte 5** (runes mode enabled)
- **TypeScript**
- **Vite 8** for dev/build tooling
- **D3** for data visualisation
- **@elekcsv/core** for CSV parsing in the data pipeline
- **Style Dictionary** for design tokens
- **Vitest** (+ Playwright) for unit and component tests
- **ESLint** + **Prettier** for linting and formatting
- **@sveltejs/adapter-static** for static-site output (deployable to GitHub Pages)

## Getting started

Install dependencies and start the dev server:

```sh
npm install
npm run dev

# or open the app in a new browser tab
npm run dev -- --open
```

## Project structure

```
src/
├─ components/   # Reusable figure components (BarChart, Donut, Stat, Meta)
├─ data/         # Raw CSV, generated JSON datasets, copy and personas
├─ lib/          # Shared library code and assets
├─ routes/       # SvelteKit routes
│  └─ story/     # Story chapters: intro, wissen, kameras, 
│                # vertrauen, personas, perspektive, abschluss
│               
├─ runes/        # Svelte runes-based state (e.g. storyFilter)
├─ scripts/      # Data pipeline (parser, mapper, charts, preprocess), tests
├─ story/        # Story building blocks (Section, ChartBlock, StatBlock, PersonaCard)
└─ styles/       # Global CSS (reset, normalize, variables, app)

properties/      # Design properties source files (category, color, font-size, story)
tasks/           # Build tasks (style dictionary token generation)
static/          # Static assets served as is
build/           # Generated static-site output
```

## Data pipeline

Raw survey data lives in `src/data/` as CSV file. Scripts under `src/scripts/`
transform it into the JSON datasets the app processes.

The pipeline runs in two stages:

1. **`pipeline.ts`** — parses the source CSV, preprocesses values, applies survey
   weights, and outputs `rows.*.json` and `columns.*.json`.
2. **`mapper.ts`** — maps columns into chart structures and outputs
   `charts.*.json`.

Generate datasets with the provided scripts:

```sh
# sample dataset (Daten_Werte_Sensoren_sample.csv) for low-key testing
npm run data:sample

# full dataset (Daten_Werte_Sensoren.csv)
npm run data:full

# both
npm run data:all
```

## Design properties

Design properties are defined in `properties/` and compiled with Style dictionary:

```sh
npm run style
```

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build the production static site |
| `npm run build:gh-pages` | Build with the GitHub Pages base path |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Type-check the project with `svelte-check` |
| `npm run check:watch` | Type-check in watch mode |
| `npm run lint` | Run Prettier and ESLint checks |
| `npm run format` | Format the codebase with Prettier |
| `npm run test` | Run the unit tests once |
| `npm run test:unit` | Run Vitest in watch mode |
| `npm run style` | Generate design tokens via Style Dictionary |
| `npm run data:sample` / `data:full` / `data:all` | Generate datasets from CSV |

## Building & deployment

Create a production build:

```sh
npm run build
```

The app uses `@sveltejs/adapter-static`, so the output in `build/` is a fully
static site. Preview it with `npm run preview`.

For GitHub Pages, build with the base path set:

```sh
npm run build:gh-pages
```

The base path is configured via the `BASE_PATH` environment variable in
[svelte.config.js](svelte.config.js).

## Testing

Tests use Vitest with Playwright for component/browser tests:

```sh
npm run test
```

Test files live alongside the code and under `src/scripts/tests/`.

A previous version of the application was based on https://github.com/the-pudding/svelte-starter but later moved to a standard Svelte Starter Project because many of the features were not necessary in the project.
