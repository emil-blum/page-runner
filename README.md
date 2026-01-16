# Page Runner

A speed reading web application using **RSVP (Rapid Serial Visual Presentation)** with **Optimal Recognition Point (ORP)** highlighting for improved reading speed and comprehension.

![Page Runner Demo](https://via.placeholder.com/800x400?text=Page+Runner+Screenshot)

## What is RSVP?

Rapid Serial Visual Presentation is a speed reading technique that displays text one word at a time in a fixed position. This eliminates the need for eye movements (saccades) that typically slow down reading, allowing readers to process text much faster than traditional reading methods.

## What is ORP?

The **Optimal Recognition Point** is the specific character in a word where your eye naturally focuses for fastest recognition. Research shows this point is typically located slightly left of center (around 30-35% into the word). 

Page Runner highlights this letter and anchors it to a fixed center position, so your eye never needs to move — words shift around the ORP rather than being centered traditionally. This technique, pioneered by technologies like Spritz, significantly improves both speed and comprehension.

### ORP Position by Word Length

| Word Length | ORP Index | Example |
|-------------|-----------|---------|
| 1 letter | 0 | **a** |
| 2 letters | 0 | **a**s |
| 3 letters | 1 | t**h**e |
| 4-5 letters | 1 | k**i**nd |
| 6-7 letters | 2 | ba**l**ance |
| 8-9 letters | 3 | imp**o**rtantly |
| 10-11 letters | 3 | com**p**letely |
| 12-13 letters | 4 | comp**r**ehension |
| 14+ letters | ~30% | calculated dynamically |

## Features

- **Adjustable Speed**: 100-1000 words per minute (WPM)
- **Smart Pacing**: Automatic pauses for punctuation and long words
- **ORP Highlighting**: Toggle on/off with customizable color
- **Theme Support**: Light, Dark, and fully Custom color modes
- **Internationalization (i18n)**: English, Spanish, Portuguese, German, French, and Latvian
- **Progress Tracking**: Visual progress bar with word count and time estimates
- **Responsive Design**: Works on desktop and mobile browsers

## Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool and dev server
- **CSS Grid** — For pixel-perfect ORP centering
- **Google Fonts** — Crimson Pro (display) + DM Sans (UI)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/page-runner.git
   cd page-runner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite — just click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. For production deployment:
   ```bash
   vercel --prod
   ```

### Environment Variables

No environment variables are required for basic deployment.

## Project Structure

```
page-runner/
├── public/
│   └── favicon.svg          # App favicon
├── src/
│   ├── App.jsx              # Main Page Runner component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── .eslintrc.cjs            # ESLint configuration
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## Usage Tips

### Recommended Reading Speeds

| Level | WPM | Best For |
|-------|-----|----------|
| Beginner | 200-300 | Getting comfortable with RSVP |
| Intermediate | 300-450 | Daily reading practice |
| Advanced | 450-600 | Experienced speed readers |
| Expert | 600-900+ | Skimming and trained readers |

### Best Practices

1. **Start slow** — Begin at 250-300 WPM and gradually increase
2. **Use the ORP** — Keep your eyes fixed on the highlighted letter
3. **Don't subvocalize** — Try not to "speak" the words in your head
4. **Take breaks** — Speed reading is mentally intensive
5. **Practice regularly** — Consistency improves comprehension at higher speeds

## Customization

### Adding New Languages

Edit the `translations` object in `src/App.jsx`:

```javascript
const translations = {
  // ... existing languages
  ja: {
    title: 'Page Runner',
    subtitle: '最適認識点による速読',
    // ... add all translation keys
  },
};
```

Then add the language option to the select dropdown in the settings panel.

### Changing the ORP Algorithm

Modify the `calculateORP` function in `src/App.jsx`:

```javascript
const calculateORP = (word) => {
  const len = word.length;
  // Customize the logic here
  return Math.floor(len * 0.3); // Example: always 30% into word
};
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [Spritz](https://spritz.com) and Kindle's Word Runner
- ORP research from speed reading and eye-tracking studies
- Built with assistance from Claude (Anthropic)

---

Made with ☕ and curiosity
