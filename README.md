# Template

A modern, responsive landing page template built with Next.js, TailwindCSS, and Sanity CMS. Perfect for startups, businesses, and personal projects.

## Features

- 🚀 Built with Next.js 14 and React 18
- 🎨 Styled with TailwindCSS
- 📱 Fully responsive design
- 🌙 Dark mode support
- 📝 Sanity CMS integration
- ⚡ Fast performance
- 🔍 SEO optimized
- 🎯 TypeScript support
- 🎨 Modern UI components
- 📦 Easy to customize

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** TailwindCSS
- **CMS:** Sanity.io
- **Language:** TypeScript
- **UI Components:** Headless UI, Hero Icons
- **Forms:** React Hook Form
- **Theming:** next-themes

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Sanity.io account (for CMS)

### Installation

1. Clone the repository:
```bash
git clone 
cd nextly-template
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` with your Sanity project details.

5. Start the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Sanity Studio

To access the Sanity Studio:

```bash
npm run studio
# or
yarn studio
```

Then open [http://localhost:3333](http://localhost:3333) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── sanity/          # Sanity CMS configuration
└── types/           # TypeScript type definitions
```

## Customization

### Styling

- The template uses TailwindCSS for styling
- Global styles are in `src/app/globals.css`
- Theme configuration is in `tailwind.config.ts`

### Content

- Content is managed through Sanity CMS
- Update content in the Sanity Studio
- Schema definitions are in `src/sanity/schema`

### Components

- Components are located in `src/components`
- Each component is self-contained
- Props are typed with TypeScript

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/nextly-template)

### Other Platforms

1. Build the project:
```bash
npm run build
# or
yarn build
```

2. Start the production server:
```bash
npm run start
# or
yarn start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.




