# divyasakre.github.io

Personal portfolio for Divya Sakre. It's plain HTML, CSS and JavaScript, with no build step, no framework and no paid services.

## What's in here

```
index.html                    Home page (hero, about, experience, work, skills, education, contact)
work/recipe-management.html   Case study: Recipe Management System (Ketsol)
work/manufacturing-suite.html Case study: Ketsol Manufacturing Suite (KMS)
work/industrial-vision.html   Case study: KVision and on-site computer vision
work/data-platform.html       Case study: CauseFleet data foundation
assets/styles.css             All styles (colors are set at the top in :root)
assets/main.js                Interactions: typing headline, project filters, IT/OT diagram, scroll reveal
assets/Divya_Sakre_Resume.pdf Downloadable resume (phone number removed)
assets/certs/                 Certificate images
.nojekyll                     Tells GitHub Pages to serve the files as they are
```

## Put it live on GitHub Pages (free), about 5 minutes

1. Sign in to GitHub as **divyasakre**.
2. Create a new **public** repository named exactly **`divyasakre.github.io`**. Don't add a README.
3. On the new repo page, click **uploading an existing file**. Drag in **everything inside this folder** (index.html, the `assets` and `work` folders, `.nojekyll`, this README), then click **Commit changes**.
   - Windows hides `.nojekyll` by default. If it doesn't appear, the site still works without it.
4. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/(root)**, then **Save**.
5. Wait 1–2 minutes. The site is live at **https://divyasakre.github.io/**

To update later, open the file on GitHub, click the pencil icon, edit and commit. The site redeploys on its own.

## Common edits

- **Add a LinkedIn recommendation:** in `index.html`, copy one `<figure class="quote">` block in the Recommendations section and change the text.
- **Change colors:** edit the variables at the top of `assets/styles.css` (`--blue`, `--sky`, `--navy`).
- **Swap the resume:** replace `assets/Divya_Sakre_Resume.pdf` with a new file of the same name.
- **Add a project to the filter:** give its card `data-tags="mes fullstack ai data"` (any combination).

## Preview on your computer

Double-click `index.html`. To preview it exactly as hosted, run `python -m http.server` in this folder and open http://localhost:8000.
