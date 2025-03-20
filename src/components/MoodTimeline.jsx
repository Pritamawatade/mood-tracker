import { useMemo } from 'react';
import './MoodTimeline.css';

const MoodTimeline = ({ moods, view }) => {
  // Function to get date from n days ago in YYYY-MM-DD format
  const getDateDaysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  };

  // Filter and sort moods based on the selected view
  const filteredMoods = useMemo(() => {
    let daysToShow = 1;
    
    if (view === 'week') {
      daysToShow = 7;
    } else if (view === 'month') {
      daysToShow = 30;
    }
    
    const cutoffDate = getDateDaysAgo(daysToShow - 1);
    
    return moods
      .filter(mood => mood.date >= cutoffDate)
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
  }, [moods, view]);
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if there are moods to display
  if (filteredMoods.length === 0) {
    return (
      <div className="timeline-container empty-timeline">
        <p>No moods recorded for this {view}. Start tracking your mood today!</p>
      </div>
    );
  }

  return (
    <div className="timeline-container">
      <h2>Your Mood {view === 'day' ? 'Today' : view === 'week' ? 'This Week' : 'This Month'}</h2>
      
      <div className="timeline">
        {filteredMoods.map((mood) => (
          <div key={mood.date} className="timeline-item">
            <div className="date-badge">{formatDate(mood.date)}</div>
            <div className="mood-emoji">{mood.emoji}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodTimeline;