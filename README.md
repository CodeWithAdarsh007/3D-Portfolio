# Adarsh Pandey - Portfolio

A modern portfolio website built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion. Features a dark space-themed design with interactive project previews.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/adarshpandey/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the site locally.

## 📖 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main page (home)
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── main/              # Page-level components (Hero, Projects, Skills)
│   └── sub/               # Reusable components (Cards, Modal, etc.)
├── config/
│   └── index.ts           # Site metadata
├── constants/
│   └── index.ts           # Data (projects, skills, nav links)
├── lib/
│   ├── motion.ts          # Framer Motion animations
│   └── utils.ts           # Utility functions
└── public/                # Static assets (images, videos)
```

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Deployment:** Vercel

## 📱 Features

- **Hero Section** - Personal introduction with call-to-action buttons
- **Skills Grid** - Visual display of technical skills with icons
- **Project Cards** - Interactive cards showing live site previews
- **Project Modal** - Full-screen modal for viewing complete projects
- **Dark Theme** - Space-themed dark UI with purple accents
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🚀 Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/import)
3. Deploy automatically on every push

### Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`

### Manual

```bash
npm run build
npm start
```

## 🔧 Configuration

Edit `config/index.ts` and `constants/index.ts` to customize:
- Site metadata (title, description)
- Hero content (headline, subheadline, CTAs)
- Projects (name, description, URL, tags)
- Skills (name, icons)
- Social links (email, LinkedIn, Instagram, WhatsApp)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contact

**Adarsh Pandey**
- Website: https://adarshpandey.dev
- Email: hello@adarshpandey.dev
- LinkedIn: https://linkedin.com/in/adarshpandey
- Instagram: https://instagram.com/adarshpandey
