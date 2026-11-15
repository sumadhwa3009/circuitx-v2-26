# CircuitX'26 – Santa Doom (frontend)

Next.js 14 (App Router) + TypeScript + plain CSS (src/styles). No backend.

## Run
    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Edit event details
All event facts live in `src/config/event.ts`. Set `registration.unstopUrl` and `registration.status` ("open") to enable every registration button at once. Set `registration.pptTemplateUrl` to show the template download. Content lives in `src/data/` (announcements, FAQs, domains, schedule).

## Deploy (Vercel)
1. Push to GitHub. 2. Import the repo in Vercel (framework: Next.js, defaults). 3. Optionally set `NEXT_PUBLIC_SITE_URL` to your domain. No database or secrets are needed.
