# Jothivasan Portfolio

Jothivasan’s portfolio, built with Next.js App Router, React, TypeScript, Tailwind CSS, GSAP, and Motion. The existing interface, fonts, responsive styles, and theme-reveal animation are retained.

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Copy `.env.example` to `.env.local` when you are ready to configure Supabase for writing content. The portfolio has no analytics tracking.

## Production

```bash
npm run build
npm run start
```

Run `npm run typecheck` for TypeScript validation. With the production server running, `npm run check:production -- http://127.0.0.1:3000` verifies routes, redirects, metadata, section links, form fields, and local assets without submitting messages. Deploy with a Next.js-compatible Node host or Vercel. The production output is `.next/`, not the former Vite `dist/` directory; do not use an SPA fallback or the former static-host configuration. Next handles page requests, redirects, metadata, and local image optimization.

### Vercel deployment

The root `vercel.json` selects the Next.js framework, runs `npm run build`, and resets the output directory to the framework default. This overrides an old `dist` output directory saved in Vercel Project Settings.

If configuring the project through the dashboard, select **Next.js** as the Framework Preset and turn off the **Output Directory** override under **Settings → Build and Deployment**. Keep the Root Directory at the repository root. Deploy a new commit containing `vercel.json` so the updated configuration is applied.

## Routes

- `/`: Hero, About, Work, Experience, Writing, and Footer
- `/contact`: Contact information and the existing Web3Forms contact form
- `/privacy`: Portfolio privacy policy, shared navigation/footer, and contact data handling
- `/#about`, `/#projects`, `/#experience`, `/#writing`, `/#hero`: Section bookmarks
- `/#contact`: Redirects to `/contact` in the client (URL fragments are not sent to servers)
- `/contact/`, `/contact/index.html`, `/index.html`: Redirect to canonical routes
- Public assets, résumé, `/robots.txt`, and `/sitemap.xml` retain their URLs

Internal navigation uses `next/link`, with the existing smooth section scrolling and mobile-menu exit animation. Refreshing either page serves its own HTML and metadata. Saved/system themes are applied before hydration, and toggling retains the existing GSAP view-transition reveal and reduced-motion fallback.

## Structure

- `src/app/`: Server-rendered routes, root layout, metadata, and shared style imports
- `src/components/layout/SiteShell.tsx`: Client-side theme and intro lifecycle
- `src/components/`: Existing sections, navigation, footer, and animation components
- `src/components/contact/`: Existing form, validation, clipboard, and feedback behavior
- `src/styles/` and `src/index.css`: Original styling and breakpoints
- `src/lib/`: Page metadata helper and preserved JSON-LD
- `src/assets/`: Project images imported by `next/image`
- `public/`: Résumé, logo, Open Graph image, sitemap, and robots file

The Contact form continues to send directly to Web3Forms; no new backend or mail credentials are required. Its cooldown, spam checks, timeout, and error recovery are unchanged.

Privacy policy copy and its reviewed date live in `src/data/privacy.ts`. Update them when form delivery, content services, email handling, or retention practices change; confirm inbox retention and production hosting details before adding specific claims.

## License

Released under the MIT License. See [LICENSE](LICENSE).

## Future Supabase writing content

The official `@supabase/supabase-js` client is installed. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local` using your project URL and publishable key. `src/lib/supabase.ts` creates a client only when both values exist, without auth/session persistence. No table is queried yet.

`src/services/writing.ts` is the writing section’s async data source. It currently returns the explicitly named `MOCK_WRITING_POSTS` to keep the layout working. Once the table details are available, replace that return with the real query and map its rows to the existing `WritingPost` type. Add generated database types and published-post filtering for the actual schema; configure public read access with row-level security. Do not use a secret or service-role key in public environment variables.

Review the privacy policy when Supabase fetching is enabled. It is not currently listed as an active data processor because the portfolio makes no Supabase requests yet.
