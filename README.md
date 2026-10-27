# Joshua Mendoza — QA Engineer Portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Edit content

All copy lives in [src/data/content.ts](src/data/content.ts): profile, skills, experience, projects, awards, philosophy.
The résumé is served from `public/Joshua-Mendoza-QA-CV.pdf` — replace the file to update it.

Optional env var: `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`) for canonical URL, Open Graph, robots, and sitemap.

## Deploy

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/Sogero/joshua-qa-portfolio.git
   git branch -M main
   git push -u origin main
   ```
2. **Import into Vercel**: vercel.com/new → pick `Sogero/joshua-qa-portfolio` → framework is auto-detected as Next.js.
3. **Configure**: defaults work (build `next build`, output auto). Add `NEXT_PUBLIC_SITE_URL` under Settings → Environment Variables once the final URL is known, then redeploy.
4. **Custom domain**: Project → Settings → Domains → Add, then create the DNS record Vercel shows (A record for apex, CNAME for `www`). Update `NEXT_PUBLIC_SITE_URL` to match.
