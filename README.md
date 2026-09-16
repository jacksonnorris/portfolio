# portfolio

Personal portfolio site. React + Material UI, deployed to GitHub Pages.

**Live:** [jacksonnorris.github.io/portfolio](https://jacksonnorris.github.io/portfolio)

## Running it

```bash
npm install
```

```bash
npm start
```

The dev server serves at `http://localhost:3000/portfolio`, not at the root, because
`homepage` in `package.json` is set for GitHub Pages.

## The map needs a token

`src/components/Map.tsx` reads `process.env.REACT_APP_MAPBOX_TOKEN`. Without it the
map renders blank, so create a `.env` in the project root:

```bash
echo "REACT_APP_MAPBOX_TOKEN=pk.your_token_here" > .env
```

`.env` is gitignored. Create React App inlines the value at **build time**, which
means a production build made without the token ships a broken map. Check `.env`
exists before deploying.

## Content lives in JSON, not in components

Most edits don't need a component change:

| File | What it holds |
|---|---|
| `src/data/portfolioData.json` | Name, intro, contact links, every project card |
| `src/data/mapData.json` | Map points, their coordinates and descriptions |

A project card supports `title`, `subtitle`, `description`, `tags`, an optional
`status` badge, and a `links` array. Each link takes a `url`, a `label`, and an
`icon` key of `apple`, `android`, `web`, or `github`. Cards are grouped into
sections by their `category` field (`professional` or `earlier`), and the tag
chips above the grid filter across both sections.

`about` is an array of paragraphs, so adding one is a JSON edit.

## Layout

```
src/
  components/    Hero, Projects, Map, ContactForm, Header, ControlPanel, Theme
  contexts/      ThemeContext (light/dark mode and text size)
  data/          portfolioData.json, mapData.json, portfolio.ts (typed access)
  types/         the shapes of the JSON content and the theme settings
  theme.ts       standalone light/dark palettes used by the map popups
```

Everything is TypeScript (`npm run typecheck`). The JSON files stay plain JSON
so they're easy to edit; `src/data/portfolio.ts` applies the types, and the
tests assert the JSON actually matches them.

Routes are `/` (hero, projects, contact) and `/map`. The contact form posts to
Formspree.

## Deploying

```bash
npm run deploy
```

Builds and pushes `build/` to the `gh-pages` branch. Deploying is separate from
committing: pushing to `main` does not update the live site, and `npm run deploy`
does not commit your source.
