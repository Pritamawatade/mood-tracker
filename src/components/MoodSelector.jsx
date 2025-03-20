import { useState, useEffect } from 'react';
import './MoodSelector.css';

const MoodSelector = ({ onMoodSelect, moods }) => {
  const moodOptions = [
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

  // Get today's date in YYYY-MM-DD format for consistency
  const today = new Date().toISOString().split('T')[0];

  // When component mounts or moods change, set the selected mood if today's mood exists
  useEffect(() => {
    const todaysMood = moods.find(mood => mood.date === today);
    if (todaysMood) {
      setSelectedMood(todaysMood.emoji);
    }
  }, [moods, today]);

  const handleMoodClick = (emoji) => {
    setSelectedMood(emoji);
    onMoodSelect(emoji);
  };

  return (
    <div className="mood-selector">
      <h2>How are you feeling today?</h2>
      <div className="emoji-grid">
        {moodOptions.map((mood) => (
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