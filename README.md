# BNV SHE CON — Official Website

**Complete Safety & ECO Solution for Business Sustenance**  
Training | Consultancy | Sustenance

---

## 📁 Project Structure

```
BNVSHECON/
├── index.html          ← Main website (single-page)
├── css/
│   ├── style.css       ← Core design system & all section styles
│   └── additions.css   ← Supplementary styles for extended sections
├── js/
│   └── main.js         ← All interactivity (navbar, form, counters, marquee)
├── assets/
│   └── logo.png        ← BNV SHE CON company logo  ← ADD THIS FILE
└── README.md
```

---

## ⚙️ Setup & Deployment

### 1. Add the Company Logo
Place the BNV SHE CON logo image as:
```
assets/logo.png
```
The logo is referenced throughout the site (navbar, footer, og:image).

### 2. Set Up the Enquiry Form (Formspree)

The enquiry form uses [Formspree](https://formspree.io) — a free service for static site form emails.

**Steps:**
1. Go to [https://formspree.io](https://formspree.io) and create a free account
2. Create a new form and set the destination email to: `vijay@bnvshecon.com`
3. Copy your **Form ID** (e.g. `xpwzabcd`)
4. Open `js/main.js` and find line:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';
   ```
5. Replace `YOUR_FORMSPREE_ID` with your actual form ID:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwzabcd';
   ```

**What the owner receives:**
```
Subject: New Enquiry from [Name] – BNV SHE CON
Body:
  Name:    [Visitor Name]
  Phone:   [Visitor Phone]
  Purpose: [Visitor Message]
```

### 3. Deploy to GitHub Pages

```bash
# 1. Create a new GitHub repository (e.g. "bnvshecon")
# 2. Add all files and push:
git init
git add .
git commit -m "Initial BNV SHE CON website"
git remote add origin https://github.com/YOUR_USERNAME/bnvshecon.git
git push -u origin main

# 3. Go to repository Settings → Pages
#    Source: Deploy from branch → main → / (root)
#    Save

# Your site will be live at:
# https://YOUR_USERNAME.github.io/bnvshecon/
```

---

## 🌐 Website Sections

| Section | ID | Description |
|---|---|---|
| Hero | `#home` | Full-screen hero with animated stats |
| About | `#about` | Company overview & 3 pillars |
| Services (Domain 1: Safety) | `#services` | 9 safety service cards |
| Environment (Domain 2) | `#environment` | EMS concept, Eco Triad, 6% deliverable, Dashboard |
| Domain 3 | `#domain3` | ISO systems, Ergonomics & Emergency, Training |
| Why Choose Us | `#why-us` | 11 key differentiators |
| Certifications | `#certifications` | 6 certification cards + qualifications |
| Clients | `#clients` | Animated marquee + 10 industry tags |
| Team | `#team` | 4-member team grid + founder detail |
| Enquiry | `#contact` | Contact info + Formspree form |
| Footer | — | Links, contact, copyright |

---

## ✉️ Contact Details (Pre-configured)

- **Phone:** +91 9740900401
- **Email:** vijay@bnvshecon.com
- **Address:** #51, 3rd Main Road, Basaveshwara Layout, Vijaya Nagar, Bangalore – 560040
- **WhatsApp:** [wa.me/919740900401](https://wa.me/919740900401)

---

## 🛠️ Technologies Used

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, CSS Grid, Flexbox, animations
- **Vanilla JavaScript** — No frameworks, no dependencies
- **Font Awesome 6** — Icons
- **Google Fonts** — Inter + Outfit typefaces
- **Formspree** — Form email delivery (free tier: 50 submissions/month)

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| > 1024px | Full desktop multi-column |
| 768–1024px | Tablet two-column |
| < 768px | Mobile single-column |
| < 480px | Mobile optimized |

---

*© 2025 BNV SHE CON. All Rights Reserved.*
