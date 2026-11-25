# Matthew Martus — Portfolio

Personal portfolio website for **Matthew Rimar Martus**, built with **React (JavaScript + JSX)**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

## Tech Stack

- **Framework:** React 18 (JavaScript / JSX only)
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **Motion:** Framer Motion (`<MotionConfig reducedMotion="user">`)
- **Icons:** Lucide React

## Folder Structure

```text
matthew-portfolio/
├── index.html                        # SEO & Open Graph meta tags, Google Fonts
├── package.json                      # Dependencies & Vite scripts
├── postcss.config.js                 # PostCSS plugin config for Tailwind v4
├── vite.config.js                    # Vite config
├── public/
│   ├── favicon.svg                   # Monogram SVG favicon
│   └── images/
│       └── projects/                 # Drop project screenshots here
└── src/
    ├── App.jsx                       # Page layout assembling all sections
    ├── index.css                     # Tailwind import, tokens, focus & scrollspy rules
    ├── main.jsx                      # React entry point with reduced-motion config
    ├── data/
    │   └── portfolio.js              # Single source of truth for copy, projects, skills, certs & links
    └── components/
        ├── About.jsx                 # About narrative & current focus list
        ├── Certifications.jsx        # Certifications list
        ├── Contact.jsx               # Email CTA, clipboard copy & social links
        ├── Footer.jsx                # Minimal footer & back-to-top anchor
        ├── Hero.jsx                  # Hero section with CTAs and GitHub tagline
        ├── MotionPrimitives.jsx      # Reusable Framer Motion reveal wrappers
        ├── Navbar.jsx                # Sticky minimal navigation with scrollspy & mobile menu
        ├── ProjectCard.jsx           # Project card with screenshot slot, role, chips & repo links
        ├── Projects.jsx              # Selected work grid
        └── Skills.jsx                # Categorized skills & practices grid
```

## Local Development

```bash
# Install dependencies
npm install

# Start the development server (http://localhost:5173)
npm run dev

# Create a production build in dist/
npm run build

# Preview the production build locally
npm run preview
```

## Editing Content

All copy, project details, screenshot paths, skills, certifications, and links live in `src/data/portfolio.js`. Search for `TODO:` across `src/data/portfolio.js` and `index.html` to find optional items ready to fill in (screenshots, live demo URLs, certification dates/links, Open Graph preview image, and resume PDF).

## Deploying

### Vercel

1. Push this project to a GitHub repository.
2. Import the repository in [Vercel](https://vercel.com/).
3. Vercel auto-detects Vite:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy. Update `og:url` in `index.html` with your live Vercel URL and add `public/og-preview.png`.

### Netlify

1. Push this project to a GitHub repository.
2. Create a new site from Git in [Netlify](https://app.netlify.com/).
3. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy. Update `og:url` in `index.html` with your live Netlify URL and add `public/og-preview.png`.
