import { useState } from 'react';
import './MoodSelector.css';

const MoodSelector = ({ onMoodSelect }) => {
  const moods = [
    { emoji: '😀', name: 'Happy' },
    { emoji: '😊', name: 'Content' },
    { emoji: '😐', name: 'Neutral' },
    { emoji: '😢', name: 'Sad' },
    { emoji: '😡', name: 'Angry' },
    { emoji: '😴', name: 'Tired' },
    { emoji: '🤩', name: 'Excited' },
    { emoji: '😰', name: 'Anxious' }
  ];

  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodClick = (emoji) => {
    setSelectedMood(emoji);
    onMoodSelect(emoji);
  };

  return (
    <div className="mood-selector">
      <h2>How are you feeling today?</h2>
      <div className="emoji-grid">
        {moods.map((mood) => (
          <button
            key={mood.name}
            className={`mood-button ${selectedMood === mood.emoji ? 'selected' : ''}`}
            onClick={() => handleMoodClick(mood.emoji)}
            aria-label={`Select ${mood.name} mood`}
          >
            <span className="emoji">{mood.emoji}</span>
            <span className="mood-name">{mood.name}</span>
          </button>
        ))}
      </div>
      {selectedMood && (
        <div className="selected-mood-container">
          <p>You selected: {selectedMood}</p>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;