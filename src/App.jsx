import { useState, useEffect } from 'react';
import './App.css';
import MoodSelector from './components/MoodSelector';
import MoodTimeline from './components/MoodTimeline';
import MoodCalendar from './components/MoodCalendar';

function App() {
  const [moods, setMoods] = useState([]);
  const [view, setView] = useState('day'); // 'day', 'week', 'month'
  const [showCalendar, setShowCalendar] = useState(false);

  // Load moods from localStorage on component mount
  useEffect(() => {
    const savedMoods = localStorage.getItem('moodData');
    if (savedMoods) {
      setMoods(JSON.parse(savedMoods));
    }
  }, []);

  // Save moods to localStorage whenever moods state changes
  useEffect(() => {
    localStorage.setItem('moodData', JSON.stringify(moods));
  }, [moods]);

  // Add a new mood entry
  const addMood = (emoji) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if we already have a mood for today
    const existingMoodIndex = moods.findIndex(mood => mood.date === today);
    
    if (existingMoodIndex !== -1) {
      // Update existing mood
      const updatedMoods = [...moods];
      updatedMoods[existingMoodIndex] = { date: today, emoji };
      setMoods(updatedMoods);
    } else {
      // Add new mood
      setMoods([...moods, { date: today, emoji }]);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Daily Mood Tracker</h1>
      </header>

      <MoodSelector onMoodSelect={addMood} />

      <div className="view-toggle">
        <button 
          className={view === 'day' ? 'active' : ''} 
          onClick={() => setView('day')}
        >
          Day
        </button>
        <button 
          className={view === 'week' ? 'active' : ''} 
          onClick={() => setView('week')}
        >
          Week
        </button>
        <button 
          className={view === 'month' ? 'active' : ''} 
          onClick={() => setView('month')}
        >
          Month
        </button>
        <button 
          className={showCalendar ? 'active' : ''} 
          onClick={() => setShowCalendar(!showCalendar)}
        >
          Calendar
        </button>
      </div>

      {showCalendar ? (
        <MoodCalendar moods={moods} />
      ) : (
        <MoodTimeline moods={moods} view={view} />
      )}
    </div>
  );
}

export default App;