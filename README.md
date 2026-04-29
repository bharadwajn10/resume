# GitHub Master Resume

A dual-mode resume website that showcases professional experience in both Data Science/Machine Learning and Aerospace/Rocketry domains. Built with React, TypeScript, and Vite, hosted on GitHub Pages.

## Features

- 🔄 Toggle between Data Science and Aerospace resume modes
- 🎨 Distinct visual themes for each mode
- 📱 Fully responsive design
- ♿ Accessible and SEO-friendly
- 📝 Easy content management through Markdown files
- 🚀 Automated deployment to GitHub Pages

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd github-master-resume
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Content Management

All resume content is stored in Markdown files in the `content/` directory:

- `personal.md` - Personal information and contact details
- `education.md` - Education history
- `experience.md` - Work experience
- `positions.md` - Positions of responsibility
- `projects-ds.md` - Data Science projects
- `projects-aero.md` - Aerospace projects
- `skills.md` - Technical skills

Simply edit these files to update your resume content. No code changes required!

## Project Structure

```
github-master-resume/
├── content/           # Markdown content files
├── public/            # Static assets
├── src/
│   ├── styles/        # CSS files
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── .eslintrc.cjs      # ESLint configuration
├── .prettierrc        # Prettier configuration
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
└── package.json       # Project dependencies
```

## Deployment

The project is configured for automatic deployment to GitHub Pages using GitHub Actions. Push to the main branch to trigger deployment.

## Technologies

- **Frontend:** React 18, TypeScript
- **Build Tool:** Vite
- **Styling:** CSS3 with CSS Variables
- **Content:** Markdown (parsed with marked)
- **Testing:** Vitest, fast-check
- **Code Quality:** ESLint, Prettier

## License

MIT
