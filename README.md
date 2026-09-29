# Jothivasan Portfolio

The personal portfolio website of Jothivasan, a product-minded full-stack developer. It presents selected work, technical skills, experience, and contact details through a responsive, motion-led interface.

## Highlights

- Responsive portfolio layout for desktop and mobile
- Project showcase with technology tags and project details
- Experience and skills sections, plus a dedicated `/contact` page
- GSAP and Motion-powered interactions
- SEO metadata, Open Graph image, sitemap, and robots configuration
- Resume download and social/contact links

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS, GSAP, Motion, Phosphor Icons, and PostHog.

## Run locally

Requirements: Node.js 18 or later.

```bash
npm install
npm run dev
```

Create a production build with `npm run build` and preview it with `npm run preview`.

The build includes both `dist/index.html` and `dist/contact/index.html`. Serve directory indexes so `/contact` and `/contact/` resolve to the contact document; no SPA rewrite is required on static hosts. Navigation uses native links, including browser Back/Forward and links from Contact back to portfolio sections. Old `/#contact` bookmarks redirect to `/contact`.

Run `node --test tests/contact.test.mjs` for contact delivery checks using mocked requests (no email is sent).

## Project structure

- `src/` – application components, styles, and entry points
- `public/` – resume, logo, Open Graph image, sitemap, and robots file
- `index.html` – document metadata and structured SEO information

## License

Released under the MIT License. See [LICENSE](LICENSE).
