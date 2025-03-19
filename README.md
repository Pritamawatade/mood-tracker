# Mood Tracker App

A simple yet powerful mood tracking application that helps users log and visualize their emotional trends over time.

## Features

- **Daily Mood Selection**: Choose from a variety of mood emojis to represent how you're feeling each day
- **Persistent Storage**: All mood data is stored locally in your browser
- **Multiple Visualization Options**:
  - **Day View**: See your mood for today
  - **Week View**: Track your mood patterns over the past 7 days
  - **Month View**: See your emotional journey over the past 30 days
  - **Calendar View**: Visualize your moods in a monthly calendar format

## Screenshots

![Mood Selector Interface](/src/assets/)
![Mood Timeline View](path/to/mood-timeline-screenshot.png)
![Mood Calendar View](path/to/mood-calendar-screenshot.png)

## Live Demo

Check out the live application [here](https://mood-tracker-app-demo.netlify.app).

## Technologies Used

- React.js
- CSS3 with Responsive Design
- LocalStorage API for data persistence

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mood-tracker.git
cd mood-tracker-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

## How It Works

### Data Structure

The application stores mood data in the following format:

```javascript
[
  { date: "2023-07-01", emoji: "😀" },
  { date: "2023-07-02", emoji: "😐" },
  { date: "2023-07-03", emoji: "😢" }
]
```

### LocalStorage

The application uses browser's LocalStorage to persist mood data between sessions:

- On initial load, the app checks for existing mood data
- Each time a mood is logged or updated, the complete dataset is saved to LocalStorage
- This ensures your mood history is always available, even after closing the browser

### Views

1. **Day View**: Shows only the current day's mood
2. **Week View**: Displays moods from the past 7 days
3. **Month View**: Shows moods from the past 30 days
4. **Calendar View**: Visualizes moods in a monthly calendar format, allowing navigation between months

## Future Enhancements

- Add notes to mood entries
- Export mood data as CSV/JSON
- Statistical analysis of mood patterns
- Customizable mood options
- Dark mode support
- Authentication for multi-device sync

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Emoji artwork provided by [Twemoji](https://twemoji.twitter.com/)
- Calendar implementation inspired by [React Calendar](https://github.com/wojtekmaj/react-calendar)