const fs = require('fs');
const path = require('path');

const API_KEY = process.env.ELEVENLABS_API_KEY;
const BASE_URL = 'https://api.elevenlabs.io/v1';

// Denzel - Authentic Jamaican Gangster voice
const VOICE_ID = 'dhwafD61uVd8h85wAZSE';

// Jamaican style phrases
const INTROS = [
  'Yo mon! Dis a ',
  'Wagwan! Check dis ',
  'Aye! Dat deh is a ',
  'Bless up! A ',
  'Big up! Dis a ',
  'Hear me now! A ',
];

const OUTROS = [
  ', seen!',
  ', ya zimme!',
  ', respect!',
  ', irie!',
  ', big ting!',
  ', one love!',
];

// All words from the dictionary
const WORDS = [
  // Food
  'Apple', 'Banana', 'Orange', 'Bread', 'Cheese', 'Egg', 'Milk', 'Carrot', 'Tomato', 'Strawberry',
  // Animals
  'Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Horse', 'Cow', 'Elephant', 'Lion', 'Butterfly',
  // Household
  'Chair', 'Table', 'Lamp', 'Clock', 'Book', 'Cup', 'Bed', 'Door', 'Window', 'Key',
  // Colors
  'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Black'
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePhrase(word) {
  const intro = getRandomItem(INTROS);
  const outro = getRandomItem(OUTROS);
  return `${intro}${word}${outro}`;
}

async function generateAudio(text, outputPath) {
  const response = await fetch(`${BASE_URL}/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': API_KEY
    },
    body: JSON.stringify({
      text: text,
      model_id: 'eleven_turbo_v2_5',
      voice_settings: {
        stability: 0.3,
        similarity_boost: 0.85,
        style: 0.7
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`ElevenLabs API error: ${response.status} - ${error}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
  console.log(`✓ Generated: ${outputPath}`);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  if (!API_KEY) {
    console.error('Error: ELEVENLABS_API_KEY environment variable not set');
    process.exit(1);
  }

  const audioDir = path.join(__dirname, '..', 'server', 'src', 'audio');

  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  console.log('🎤 Generating Jamaican Gangster voice audio...\n');

  let count = 0;
  const total = WORDS.length;

  for (const word of WORDS) {
    const phrase = generatePhrase(word);
    const filename = `${word.toLowerCase()}.mp3`;
    const outputPath = path.join(audioDir, filename);

    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  Skipping (exists): ${filename}`);
      count++;
      continue;
    }

    try {
      await generateAudio(phrase, outputPath);
      count++;
      console.log(`   "${phrase}"`);
      console.log(`   Progress: ${count}/${total}\n`);
      await sleep(400);
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
    }
  }

  console.log(`\n✅ Done! Generated ${count} audio files.`);
}

main().catch(console.error);
