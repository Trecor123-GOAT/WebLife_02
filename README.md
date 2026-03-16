# WebLife
A browser-based life simulator game for itch.io
# 🎮 WebLife

A browser-based life simulator inspired by BitLife and The Sims, but with a focus on meaningful choices and emergent gameplay!

## 🌟 Features

- **Character Creation**: Create your own character and start their life from birth
- **Life Progression**: Progress through different life stages (childhood, teenage, young adult, middle-aged, elderly)
- **Dynamic Events**: Experience random life events that shape your character's destiny
- **Career System**: Choose from 20+ different careers with progression and salary variations
- **Relationships**: Build friendships, romantic relationships, and even get married
- **Stats Management**: Track happiness, health, energy, intelligence, attractiveness, and charisma
- **Save/Load System**: Save your progress and continue your life later
- **Achievements**: Unlock achievements as you reach milestones
- **Pure Browser-Based**: No downloads needed - play directly in your browser!

## 🎮 How to Play

1. **Visit the game**: Open `index.html` in your web browser
2. **Create a Character**: Enter your name and choose your gender
3. **Live Your Life**: Make choices each year:
   - Get a job and advance your career
   - Make friends and find romance
   - Take care of your health and happiness
   - Experience random life events
4. **Save Your Progress**: Your game saves automatically to your browser
5. **Continue Your Story**: Load your game anytime and continue living!

## 🎯 Core Systems

### Character Stats
- **Happiness** (0-100): How satisfied your character is with life
- **Health** (0-100): Physical well-being
- **Energy** (0-100): Daily energy and stamina
- **Intelligence** (0-100): Problem-solving ability
- **Attractiveness** (0-100): Physical appearance
- **Charisma** (0-100): Social ability and charm

### Life Events
Your character experiences random life events based on their age:
- Getting bullied at school
- Winning competitions
- Falling in love
- Getting fired from jobs
- Getting promotions
- Starting families
- And many more!

### Careers
Choose from careers like:
- Teacher, Nurse, Software Developer, Police Officer
- Doctor, Lawyer, CEO, Engineer
- Artist, Musician, Actor, Athlete
- And 10+ more!

### Relationships
- **Make friends** by meeting new people
- **Ask people on dates** to develop romance
- **Get married** if you find the right person
- **Have babies** to start a family
- **Maintain relationships** or they fade over time

## 💾 Save System

Your game automatically saves to your browser's local storage. You can:
- Save manually with the "Save Game" button
- Load your previous game from the main menu
- Continue playing anytime without losing progress

## 🚀 Development

### Tech Stack
- **HTML5**: Structure
- **CSS3**: Styling and animations
- **JavaScript (Vanilla)**: Game logic

### File Structure
```
WebLife/
├── index.html              # Main game file
├── css/
│   └── style.css          # Game styling
├── js/
│   ├── main.js            # Entry point
│   ├── game.js            # Game engine
│   ├── character.js       # Character class
│   ├── events.js          # Event system
│   ├── careers.js         # Career system
│   ├── relationships.js   # Relationship system
│   ├── ui.js              # UI rendering
│   └── utils.js           # Utility functions
└── README.md              # This file
```

## 📋 Game Loop

Each year in the game:
1. Character ages by 1 year
2. Stats naturally degrade slightly
3. Job income is added (if employed)
4. Random event occurs
5. Relationships naturally degrade if not maintained
6. Career advancement chance occurs
7. Random opportunities may appear

## 🎮 Future Features

Planned additions:
- More career paths and specializations
- Skill tree system with training
- Property/housing system
- Pet ownership
- Hobbies and interests
- Crime/Prison system
- Education branching (different college majors)
- Multiple language support
- Achievements and leaderboards
- Mobile optimization
- Sound effects and music

## 🐛 Known Limitations

- Save data is stored locally in your browser (clears if you clear browser data)
- Game progress is per-device (not synced across devices)
- No multiplayer features

## 📱 How to Play on itch.io

To publish WebLife on itch.io:
1. Go to https://itch.io/
2. Create an account or log in
3. Click "Upload New Project"
4. Fill in project details
5. Upload the game files (or link to GitHub Pages)
6. Set it to "HTML" project type
7. Publish!

You can also host this on **GitHub Pages** for free:
1. Go to repository settings
2. Enable GitHub Pages
3. Select the `main` branch as source
4. Your game will be live at `https://username.github.io/WebLife/`

## 🎨 Credits

Created by: **Trecor123-GOAT**

Inspired by:
- BitLife (by Candywriter LLC)
- The Sims (by Maxis/Electronic Arts)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Feel free to fork this project and add your own features! Some ideas:
- New life events
- Additional careers
- New UI themes
- Gameplay improvements
- Bug fixes

## 💬 Feedback & Support

Found a bug? Have a suggestion? Feel free to open an issue on GitHub!

---

**Enjoy living your WebLife! 🎮✨**
