# M. Ibrahim Ilham — Personal Portfolio

A production-ready personal portfolio website built with pure semantic **HTML5**, **CSS3**, and **vanilla JavaScript**. Engineered with zero dependencies, zero build tools, and zero configuration for instant deployment to GitHub Pages or any static hosting service.

---

## 🚀 Live Demo & Concept

- **Subject**: M. Ibrahim Ilham — Final-year Information Systems student (Universitas Gunadarma, GPA 3.96/4.00, Cumlaude).
- **Dual Profile**: Full-Stack Web Developer (Laravel, React) & Applied Data Scientist (Python, XGBoost, SHAP).
- **Design Philosophy**: *"Engineering rigor, not decoration."* Metrics, real institutional work at Badan Pusat Statistik (BPS), and a named machine learning result driving the visual identity.

---

## 🎨 Design System & Color Tokens

- **Background**: `#F7F8FA` (Soft cool off-white)
- **Surface / Card**: `#FFFFFF` with `1px solid #E4E7EB` border
- **Primary Accent**: `#253B52` (Deep charcoal-blue)
- **Signal Accent (Data & Metrics)**: `#8BC53F` (Signal lime)
- **Primary Text**: `#161B20`
- **Secondary Text**: `#57626C`
- **Typography**:
  - Headings / Display: `Space Grotesk`
  - Body: `IBM Plex Sans`
  - Monospace / Stats / Tags: `IBM Plex Mono`

---

## 📂 File Structure

```text
Portofolio/
├── index.html              # Main semantic HTML5 markup & Open Graph tags
├── css/
│   └── style.css           # Complete responsive stylesheet & design system
├── js/
│   └── main.js             # Vanilla JS: animations, scrollspy, mobile menu
├── assets/
│   └── favicon.svg         # SVG monogram favicon
└── README.md               # Project documentation & deployment guide
```

---

## 💻 How to Preview Locally

### Option 1: Direct File Open (Zero Tooling)
Simply double-click `index.html` or drag and drop it into any modern web browser (Chrome, Firefox, Safari, Edge).

### Option 2: Simple Local HTTP Server
If you prefer running a local development server:

Using **Python 3**:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

Using **Node.js (`npx serve`)**:
```bash
npx serve .
```

Using **VS Code Live Server**:
Right-click `index.html` and select **"Open with Live Server"**.

---

## 🌐 How to Deploy to GitHub Pages

1. **Create a new repository on GitHub**:
   - For a root user domain (`https://<username>.github.io`): Name the repository `<username>.github.io`.
   - For a project site (`https://<username>.github.io/portfolio`): Name the repository any name (e.g. `portfolio`).

2. **Initialize Git and push the files**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of personal portfolio"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Navigate to **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment** → **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`.
   - Click **Save**.
   - Your website will be live in ~1 minute!

---

## ✏️ Customization & Placeholders

The code contains clear HTML and CSS comments indicating placeholders:
1. **GitHub Profile**: Search `PLACEHOLDER: Replace 'https://github.com/[username]'` in `index.html` and update with your handle.
2. **CV PDFs (IND & ENG)**: Place your CV PDF files in the `assets/` folder (e.g. `./assets/CV_M_Ibrahim_Ilham_IND.pdf` and `./assets/CV_M_Ibrahim_Ilham_ENG.pdf`) or update their `href` attributes in `index.html`.
3. **Project Source Code & Detail Links**: Update `href="#"` in the `#work` section for each project.
4. **Profile Photo (Optional)**: If you wish to replace the monogram avatar tile with a photo, follow the comment in `#about` to insert an `<img>` tag with `class="avatar-tile"`.
5. **WhatsApp (Optional)**: Search `OPTIONAL WHATSAPP CONTACT` in `index.html` and uncomment the card if you wish to make your phone number publicly accessible.

---

## 📄 License

Created by **M. Ibrahim Ilham**. Available under the [MIT License](LICENSE).
