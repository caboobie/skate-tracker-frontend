# Skate Sharpening Tracker – Frontend

React single-page app for tracking skate sharpenings for customers of my own sharpening business (BRSS). It is a client for the REST API in [caboobie/skate-sharpening-tracker](https://github.com/caboobie/skate-sharpening-tracker).

## Features

- **Password gate** – on first load you enter a password, which is stored in `localStorage` and sent as an `x-api-key` header on every API request. A `401` response clears the stored key and reloads the app so you can re-enter it.
- **Customer list** – searchable list of customers (name, team, position), with an "Add Customer" form.
- **Customer page** – customer details and sharpening history (date, hollow, price, notes), a form to log a sharpening (hollow chosen from the API's list, optional price and notes), and delete with confirmation.
- **"Same as last time"** – one-click button that logs a new sharpening using the previous sharpening's hollow and price.
- **Stats page** – counts of most common hollows overall and grouped by customer position.
- **Dark mode** – styles follow the OS `prefers-color-scheme` setting.

## Tech stack

- React 19, React Router 7
- Vite 8 with `@vitejs/plugin-react`
- ESLint
- [`serve`](https://github.com/vercel/serve) to host the built files; deployed on Railway

## Getting started

Requires Node.js and npm.

```bash
npm install
npm run dev      # Vite dev server with HMR
```

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm start` | Serve `dist/` as an SPA on `$PORT` (default 3000) |
| `npm run lint` | Run ESLint |

## Configuration

There are no environment variables. The API base URL is hard-coded as `API_URL` in [`src/api.js`](src/api.js) and points at the deployed Railway backend. To use a different backend (e.g. a local one), edit that constant. You will need the backend's API key/password to use the app.

## Project structure

```
src/
  main.jsx          entry point
  App.jsx           password gate, nav and routes
  api.js            API key storage and fetch wrapper
  CustomerList.jsx  route /
  CustomerPage.jsx  route /customers/:id
  StatsPage.jsx     route /stats
```

## Related

- Backend API: [caboobie/skate-sharpening-tracker](https://github.com/caboobie/skate-sharpening-tracker)
