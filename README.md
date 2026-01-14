# Picture Dictionary

A React + Node.js application that displays clickable pictures of everyday objects. Click any picture to hear the word spoken aloud using text-to-speech.

## Features

- **Four categories**: Food, Animals, Household Items, Colors
- **Text-to-Speech**: Click any picture to hear the word pronounced
- **Responsive design**: Works on desktop and mobile devices
- **Easy to extend**: Add new categories by simply creating JSON files

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript
- **Audio**: Web Speech API (browser built-in TTS)
- **Images**: Unsplash

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/chrisyuaners/picture-dictionary.git
   cd picture-dictionary
   ```

2. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   cd ..
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## Project Structure

```
picture-dictionary/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # UI components
│       ├── hooks/          # Custom React hooks
│       ├── services/       # API utilities
│       └── types/          # TypeScript types
├── server/                 # Express backend
│   └── src/
│       ├── routes/         # API routes
│       └── data/           # JSON data files
│           ├── categories.json
│           └── items/      # Category item files
└── package.json            # Root workspace config
```

## Adding New Categories

1. Add the category to `server/src/data/categories.json`:
   ```json
   {
     "id": "vehicles",
     "name": "Vehicles",
     "icon": "🚗",
     "description": "Cars, bikes, and other vehicles",
     "itemCount": 5
   }
   ```

2. Create `server/src/data/items/vehicles.json`:
   ```json
   {
     "categoryId": "vehicles",
     "items": [
       {
         "id": "vehicles-car",
         "word": "Car",
         "imageUrl": "https://images.unsplash.com/photo-..."
       }
     ]
   }
   ```

No code changes required - the app will automatically pick up the new category.

## License

MIT
