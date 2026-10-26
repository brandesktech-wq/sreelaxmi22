# Sree Laxmi Developers — Hostinger Static Website Deployment Guide

This guide provides step-by-step instructions to deploy the **Sree Laxmi Developers** static production website (`sree-laxmi-developers-static-fixed.zip`) to **Hostinger Shared / Cloud Hosting (`public_html`)**.

---

## Exact Generated Production Bundle Filenames

The production `index.html` at the root of `sree-laxmi-developers-static-fixed.zip` (and `dist/index.html`) references these exact compiled bundles inside `/assets/`:

- **JavaScript Bundle:** `/assets/index-GiNmNvae.js` (`622,736` bytes)
- **Stylesheet Bundle:** `/assets/index-BIWaGigz.css` (`223,709` bytes)

```html
<script type="module" crossorigin src="/assets/index-GiNmNvae.js"></script>
<link rel="stylesheet" crossorigin href="/assets/index-BIWaGigz.css">
```

All CSS, JavaScript, images, SVG floor plans, logos, and PDF brochures use root-relative paths (`/assets/...`) configured via `base: '/'` in `vite.config.ts`, ensuring every asset loads directly from your own deployed Hostinger domain.

---

## Why the Homepage Previously Appeared Black and White (And How This Fix Solves It)

When a webpage renders as unstyled "black and white" text and images on Hostinger, the HTML/JavaScript loaded but the production stylesheet (`/assets/index-BIWaGigz.css`) failed to load (HTTP 404 or stale `assets/` directory). This happens if:
1. An older `assets/` folder on Hostinger contained a previous build hash while `index.html` referenced `/assets/index-BIWaGigz.css`, **or**
2. The source `public/assets/` folder (which only contains raw images and no compiled `.css`/`.js` bundles) was uploaded to `public_html/assets/` instead of the compiled `dist/assets/` folder.

**Important:** Before extracting `sree-laxmi-developers-static-fixed.zip` on Hostinger, **delete the existing `index.html` and `assets/` folder inside `public_html`** so both `public_html/index.html` and `public_html/assets/index-BIWaGigz.css` + `public_html/assets/index-GiNmNvae.js` are freshly extracted together.

---

## Quick 9-Step Hostinger Deployment Checklist

1. **Download the ZIP file:** Save `sree-laxmi-developers-static-fixed.zip` to your computer.
2. **Log in to Hostinger hPanel:** Go to [https://hpanel.hostinger.com](https://hpanel.hostinger.com) and sign in to your account.
3. **Open File Manager for the intended domain:** Navigate to **Websites** → click **Manage** next to your domain → select **File Manager**.
4. **Open and clean the `public_html` directory:** Double-click `public_html` to enter your domain's web root. Delete any existing `index.html`, `default.php`, and old `assets/` directory so no stale files remain.
5. **Upload `sree-laxmi-developers-static-fixed.zip`:** Click the **Upload** button in the top-right corner of File Manager, choose **File**, and select `sree-laxmi-developers-static-fixed.zip`.
6. **Extract the archive directly into `public_html`:** Right-click `sree-laxmi-developers-static-fixed.zip` → click **Extract** → enter `.` (a single dot) or select `public_html` so the files extract directly into `public_html` without creating a nested subfolder. Delete the `.zip` file after extraction.
7. **Confirm `index.html` and `/assets/` bundles are inside `public_html`:**
   - `public_html/index.html`
   - `public_html/.htaccess` (enable **Show Hidden Files** in File Manager settings to see `.htaccess`)
   - `public_html/assets/index-GiNmNvae.js`
   - `public_html/assets/index-BIWaGigz.css`
8. **Open the domain and hard-refresh (`Ctrl + F5` or `Cmd + Shift + R`):** Visit your domain in a browser, perform a hard refresh to clear any cached response, and test navigation across Home, About Us, Project Portfolio (`Ongoing`, `Upcoming`, `Completed`), Project Detail pages (Floor Plans, Horizontal Gallery, Video Reveal, Brochure download), Blogs, Gallery, and Contact Us.
9. **Enable HTTPS if needed:** In Hostinger hPanel, go to **Security → SSL** (or **Advanced → SSL**), ensure the free Let's Encrypt SSL certificate is **Active**, and toggle **Force HTTPS** on.

---

## Archive Structure (`sree-laxmi-developers-static-fixed.zip`)

```text
public_html/ (Deployment Root)
├── index.html                                           # Production HTML entry point
├── .htaccess                                            # Apache/LiteSpeed SPA routing, MIME types, GZIP & caching
├── README-HOSTINGER.md                                  # This deployment guide
└── assets/
    ├── index-GiNmNvae.js                                # Compiled & minified React application bundle (622 KB)
    ├── index-BIWaGigz.css                               # Compiled & minified production stylesheet (223 KB)
    ├── hero-slide-1.jpg, hero-slide-2.jpg               # Hero slider images
    ├── our-story-residence.jpg                          # About / Our Story architectural imagery
    ├── project-gardenia.jpg, project-meadows.jpg, ...   # Featured project cards
    ├── gallery-balcony-detail.jpg, ...                  # Architectural gallery photography
    ├── leader-managing-partner.svg, leader-partner.svg  # Leadership portraits
    ├── aistudio/                                        # Brand logo & high-resolution project/gallery assets
    ├── blogs/                                           # Blog post cover images
    ├── projects/                                        # Project detail & gallery webp/jpg assets
    ├── floor-plans/                                     # 12 Ground & Typical Floor Block A–F SVG blueprints
    └── brochures/
        └── sree-laxmi-gardenia-brochure.pdf             # Official Sree Laxmi Gardenia PDF brochure
```

---

## Remaining Manual Configuration & Future Database Integration

1. **Static Operation (No Backend or Database Required Now):**
   - All pages, project portfolios, individual project detail pages, floor plans, horizontal galleries, video sections, blog articles, and brochure downloads run 100% statically from local data modules (`src/data/projectsData.js` and `src/data/blogsData.js`).
   - No Node.js server, Express process, or MongoDB connection is required to host and browse the website on Hostinger.

2. **Enquiry Forms & Future MongoDB / API Connection (`src/config/apiConfig.js`):**
   - Both enquiry forms (**Start a Conversation** on the Home/Project Detail pages and **Get in Touch** on the Contact Us page) remain visually complete and perform full client-side validation (name, 10–15 digit phone number, email format, project selection, and message length).
   - While no backend is connected, submitting a validated form displays a clear message stating that online enquiry submission will be enabled after backend and database integration (and provides direct Phone, WhatsApp `+91 98498 35455`, and Email links). It never shows a fake submission-success message.
   - When you deploy your Node.js/Express + MongoDB API later, set `VITE_API_BASE_URL=https://api.yourdomain.com` in your `.env` file and rebuild (`npm run build`). The isolated service in `src/config/apiConfig.js` will automatically send `POST` requests to `${VITE_API_BASE_URL}/api/enquiries`.
