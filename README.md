# Avishka Madushan — Personal Portfolio Website

A responsive, single-page personal portfolio website for **Avishka Madushan**, an IT student and software developer from Sri Lanka. The site showcases projects, skills, resume, and blog posts, and serves as the live landing page for [avishkamadushan.lk](https://www.avishkamadushan.lk/).

Live site: [avishkamadushan.lk](https://www.avishkamadushan.lk/)

---

## About This Repo

This repository holds the full source for the portfolio: a static HTML/CSS/JS site with no build step, deployed on GitHub Pages behind a custom domain. All page content — projects, blog posts, skills — is data-driven from JS objects inside `index.html`, so the grid, filters, and modals stay in sync automatically when an entry is added or edited.

Current featured projects:

- **Lakwedha – Ravana 2.0** — a 6-member group project: an end-to-end Ayurvedic healthcare platform for Sri Lanka spanning a Flutter patient app, a React doctor portal, a Next.js admin panel, and a shared Node.js/Express + MongoDB API.
- **Mathify – Kids Multiplication Game** — an individual project: a gamified, cross-platform Flutter + Node.js app that builds multiplication fluency in children through adaptive lessons, achievements, and rankings.
- **Personal Portfolio Website** — this site itself, documented as a project in its own right.

---

## Features

- Animated splash/loading screen with particle canvas and progress bar
- Responsive navigation with smooth scroll to sections
- Light/dark theme toggle with persisted preference and forced-colors (Windows High Contrast) support
- **Blog** — articles and vlogs (IFS industry visit, IIT Career Day, portfolio build)
- **About** — personal introduction and background
- **Resume** — education history and certifications
- **Services** — Backend Development, Web Development, Mobile App Development, Photography, Videography, Teaching
- **Skills** — HTML, CSS, JavaScript, Python, Java, GitHub, SQL/MongoDB with progress bars
- **Projects** — filterable card grid (All / Group / Individual / Web / Mobile) with a modal detail view showing tech stack, features, timeline, GitHub link, demo link, downloadable PDF report, and update history per project
- **Contact** — location, phone, email, and website details
- SEO-optimised with Open Graph, Twitter Card, and JSON-LD structured data
- `llms.txt` for AI/LLM discoverability, plus `robots.txt` and `sitemap.xml`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 (fluid grids, `clamp()` typography), Bootstrap, Animate.css, AOS |
| Scripts | Vanilla JS, jQuery, Owl Carousel, Magnific Popup, Scrollax |
| Icons | Bootstrap Icons, IcoMoon, Ionicons |
| Fonts | Poppins (Google Fonts) |

---

## Project Structure

```
avishka_madushan/
├── index.html          # Main single-page application (content, projects/blog data, scripts)
├── css/
│   ├── style.css       # Core styles
│   ├── premium.css     # Custom premium styles (theme, grids, cards, modal)
│   ├── responsive.css  # Breakpoints and accessibility (forced-colors) overrides
│   └── ...             # Third-party CSS libraries
├── js/
│   ├── main.js         # Custom JavaScript
│   ├── premium.js      # Splash screen & animations
│   └── ...             # Third-party JS libraries
├── images/             # Portfolio images and project screenshots
├── fonts/              # Icon font files
├── cv/                 # Downloadable CV/resume PDF
├── pdf/                # Per-project case-study/report PDFs (referenced by each project's `pdf` field)
├── llms.txt            # Site summary for AI/LLM crawlers
├── robots.txt
└── sitemap.xml
```

To add or update a project, edit the corresponding entry in the `projectData` object in `index.html` — the card grid and modal render from that data automatically. To enable a project's "Download PDF" button, drop the file in `pdf/` and set that project's `pdf` field to the relative path (see `pdf/README.txt`).

---

## Getting Started

No build step is required. Simply open `avishka_madushan/index.html` in a browser, or serve the folder with any static file server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js (npx)
npx serve avishka_madushan
```

---

## Contact

- **Email:** avishkamadushan4338@gmail.com
- **LinkedIn:** [avishka-madushan-2a5027353](https://www.linkedin.com/in/avishka-madushan-2a5027353/)
- **GitHub:** [avishkamadushan4338](https://github.com/avishkamadushan4338)
