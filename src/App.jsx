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
      try {
        const parsedMoods = JSON.parse(savedMoods);
        setMoods(parsedMoods);
      } catch (error) {
        console.error("Error parsing mood data from localStorage:", error);
        // If parsing fails, start with empty array
        setMoods([]);
      }
    }
  }, []);

  // Save moods to localStorage whenever moods state changes
  useEffect(() => {
    if (moods.length > 0) {
      localStorage.setItem('moodData', JSON.stringify(moods));
    }
  }, [moods]);

  // Add a new mood entry
  const addMood = (emoji) => {
    // Format the date consistently as YYYY-MM-DD
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // This ensures consistent YYYY-MM-DD format
    
    // Check if we already have a mood for today
    const existingMoodIndex = moods.findIndex(mood => mood.date === formattedDate);
    
    let updatedMoods;
    if (existingMoodIndex !== -1) {
      // Update existing mood
      updatedMoods = [...moods];
      updatedMoods[existingMoodIndex] = { date: formattedDate, emoji };
    } else {
      // Add new mood
      updatedMoods = [...moods, { date: formattedDate, emoji }];
    }
    
    // Update state AND ensure it's saved to localStorage immediately
    setMoods(updatedMoods);
    localStorage.setItem('moodData', JSON.stringify(updatedMoods));
  };

  return (
    <div className="app-container">
      <header>
        <h1>Daily Mood Tracker</h1>
      </header>

      <MoodSelector onMoodSelect={addMood} moods={moods} />

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