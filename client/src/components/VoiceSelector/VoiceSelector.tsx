import './VoiceSelector.css';

export type VoiceType = 'rapper' | 'trump' | 'chef' | 'ralph' | 'hobo';

interface VoiceSelectorProps {
  selectedVoice: VoiceType;
  onVoiceChange: (voice: VoiceType) => void;
}

const VOICES: { id: VoiceType; name: string; emoji: string; description: string }[] = [
  { id: 'rapper', name: 'Rapper', emoji: '🎤', description: 'YO! SHEESH!' },
  { id: 'trump', name: 'Trump', emoji: '🍊', description: 'Tremendous!' },
  { id: 'chef', name: 'Italian Chef', emoji: '🤌', description: 'Mamma mia!' },
  { id: 'ralph', name: 'Ralph Wiggum', emoji: '👃', description: 'I\'m learnding!' },
  { id: 'hobo', name: 'Hobo', emoji: '🥫', description: 'Spare change?' },
];

export function VoiceSelector({ selectedVoice, onVoiceChange }: VoiceSelectorProps) {
  return (
    <div className="voice-selector">
      <div className="voice-selector__label">VOICE MODE:</div>
      <div className="voice-selector__options">
        {VOICES.map((voice) => (
          <button
            key={voice.id}
            className={`voice-selector__button ${selectedVoice === voice.id ? 'voice-selector__button--active' : ''}`}
            onClick={() => onVoiceChange(voice.id)}
            title={voice.description}
          >
            <span className="voice-selector__emoji">{voice.emoji}</span>
            <span className="voice-selector__name">{voice.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
