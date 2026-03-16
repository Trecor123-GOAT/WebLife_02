// UI System - handles all screen rendering and interactions

class UI {
    constructor() {
        this.appContainer = document.getElementById('app');
        this.currentScreen = null;
    }
    
    // Show main menu
    showMenu() {
        this.appContainer.innerHTML = `
            <div class="container">
                <div class="header">
                    <h1>🎮 WebLife</h1>
                    <p>A browser-based life simulator</p>
                </div>
                
                <div style="text-align: center; padding: 40px 0;">
                    <h2 style="color: #333; margin-bottom: 30px;">Welcome to WebLife!</h2>
                    <p style="color: #666; margin-bottom: 40px; font-size: 1.1em;">
                        Create your character and live a virtual life full of choices and consequences.
                    </p>
                    
                    <div class="button-group" style="max-width: 300px; margin: 0 auto;">
                        <button class="btn-primary" onclick="ui.showCharacterCreation()">
                            🆕 New Game
                        </button>
                        ${hasSavedGame() ? `
                            <button class="btn-secondary" onclick="game.loadGame(); ui.showGameScreen();">
                                📂 Load Game
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }
    
    // Show character creation screen
    showCharacterCreation() {
        this.appContainer.innerHTML = `
            <div class="container">
                <div class="header">
                    <h1>Create Your Character</h1>
                    <p>Start your life story</p>
                </div>
                
                <div class="char-creation">
                    <div class="form-group">
                        <label>Character Name:</label>
                        <input type="text" id="charName" placeholder="Enter your name" value="Alex">
                    </div>
                    
                    <div class="form-group">
                        <label>Gender:</label>
                        <select id="charGender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    
                    <p style="color: #666; margin-bottom: 20px; font-size: 0.95em;">
                        You start life as a newborn. Your initial stats are randomized, 
                        but your choices will shape your future!
                    </p>
                    
                    <div class="button-group">
                        <button class="btn-primary" onclick="ui.createCharacter()">
                            ✅ Create Character
                        </button>
                        <button class="btn-secondary" onclick="ui.showMenu()">
                            ❌ Back
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Focus on name input
        setTimeout(() => {
            document.getElementById('charName').focus();
        }, 100);
    }
    
    // Create character and start game
    createCharacter() {
        const name = document.getElementById('charName').value.trim();
        const gender = document.getElementById('charGender').value;
        
        if (!name) {
            showNotification('Please enter a name!', 'warning');
            return;
        }
        
        game.startNewGame(name, gender);
        showNotification(`Welcome, ${name}!`, 'success');
        this.showGameScreen();
    }
    
    // Show main game screen
    showGameScreen() {
        if (!game.character) return;
        
        const character = game.character;
        const status = game.getGameStatus();
        const actions = game.getAvailableActions();
        
        this.appContainer.innerHTML = `
            <div class="container">
                <div class="header">
                    <h1>🎮 ${character.name}'s Life</h1>
                    <p>Age ${character.age} | Year ${character.year} | ${character.currentJob ? character.currentJob.name : 'Unemployed'}</p>
                </div>
                
                <div class="life-stats">
                    <div class="life-stat-card">
                        <div class="label">💰 Money</div>
                        <div class="value">${formatMoney(character.money)}</div>
                    </div>
                    <div class="life-stat-card">
                        <div class="label">😊 Happiness</div>
                        <div class="value">${character.happiness}/100</div>
                    </div>
                    <div class="life-stat-card">
                        <div class="label">❤️ Health</div>
                        <div class="value">${character.health}/100</div>
                    </div>
                    <div class="life-stat-card">
                        <div class="label">⚡ Energy</div>
                        <div class="value">${character.energy}/100</div>
                    </div>
                </div>
                
                <div class="game-screen">
                    <div class="stats-panel">
                        <h3>📊 Character Stats</h3>
                        
                        ${this.renderStatBar('Happiness', character.happiness)}
                        ${this.renderStatBar('Health', character.health)}
                        ${this.renderStatBar('Energy', character.energy)}
                        ${this.renderStatBar('Intelligence', character.intelligence)}
                        ${this.renderStatBar('Attractiveness', character.attractiveness)}
                        ${this.renderStatBar('Charisma', character.charisma)}
                        
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd;">
                            <p><strong>📚 Education:</strong> ${character.education}</p>
                            <p><strong>👥 Friends:</strong> ${character.relationships.length}</p>
                            <p><strong>⭐ Fame:</strong> ${character.fame}</p>
                        </div>
                    </div>
                    
                    <div class="events-panel">
                        <h3>🎯 Actions & Events</h3>
                        
                        <div style="display: grid; gap: 10px; margin-bottom: 20px;">
                            ${actions.map(action => `
                                <button class="btn-secondary" 
                                    style="text-align: left; padding: 10px;"
                                    onclick="ui.handleAction('${action.action}')">
                                    <strong>${action.name}</strong><br>
                                    <small style="color: #999;">${action.description}</small>
                                </button>
                            `).join('')}
                        </div>
                        
                        <div style="border-top: 2px solid #ff6b6b; padding-top: 15px;">
                            <button class="btn-danger" style="width: 100%; margin-bottom: 10px;" onclick="game.saveGame()">
                                💾 Save Game
                            </button>
                            <button class="btn-secondary" style="width: 100%;" onclick="ui.showMenu()">
                                🏠 Main Menu
                            </button>
                        </div>
                    </div>
                </div>
                
                ${character.lifeEvents.length > 0 ? `
                    <div style="margin-top: 30px; background: #f9f9f9; padding: 20px; border-radius: 10px;">
                        <h3>📖 Recent Life Events</h3>
                        <div style="max-height: 200px; overflow-y: auto;">
                            ${character.lifeEvents.slice(-5).reverse().map(event => `
                                <div class="event-text">
                                    <strong>Age ${event.age} (Year ${event.year}):</strong> ${event.text}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    // Render a stat bar
    renderStatBar(name, value) {
        let color = '#667eea';
        if (value < 30) color = '#ff6b6b';
        else if (value < 60) color = '#ffd43b';
        
        return `
            <div class="stat-item">
                <div class="stat-name">${name}: ${value}%</div>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${value}%; background: ${color};">
                    </div>
                </div>
            </div>
        `;
    }
    
    // Handle action clicks
    handleAction(actionName) {
        if (actionName === 'makeFriend') {
            const result = game.executeAction('makeFriend');
            showNotification(result.message, result.success ? 'success' : 'warning');
            this.showGameScreen();
        } 
        else if (actionName === 'hangOut') {
            this.showSelectPersonDialog('Hang Out', (person) => {
                const result = game.executeAction('hangOut', person);
                showNotification(result.message, result.success ? 'success' : 'warning');
                this.showGameScreen();
            });
        }
        else if (actionName === 'askDate') {
            this.showSelectPersonDialog('Ask on a Date', (person) => {
                const result = game.executeAction('askDate', person);
                showNotification(result.message, result.success ? 'success' : 'warning');
                this.showGameScreen();
            });
        }
        else if (actionName === 'getJob') {
            this.showSelectJobDialog((job) => {
                const result = game.executeAction('getJob', job);
                showNotification(result.message, result.success ? 'success' : 'warning');
                this.showGameScreen();
            });
        }
        else if (actionName === 'workHarder' || actionName === 'quitJob' || 
                 actionName === 'goCollege' || actionName === 'seeDoctor' || 
                 actionName === 'relax' || actionName === 'haveBaby') {
            const result = game.executeAction(actionName);
            showNotification(result.message, result.success ? 'success' : 'warning');
            this.showGameScreen();
        }
        else if (actionName === 'nextYear') {
            const result = game.executeAction('nextYear');
            if (game.character.alive) {
                showNotification(`Year ${game.character.year} - ${result.message}`, 'info');
                this.showGameScreen();
            } else {
                this.showGameOverScreen();
            }
        }
    }
    
    // Select a person dialog
    showSelectPersonDialog(title, callback) {
        const people = game.character.relationships.map(r => r.name);
        
        if (people.length === 0) {
            showNotification('You have no relationships!', 'warning');
            return;
        }
        
        this.appContainer.innerHTML += `
            <div class="modal active" id="selectModal">
                <div class="modal-content">
                    <div class="modal-header">${title}</div>
                    <div class="modal-body">
                        <div style="display: grid; gap: 10px;">
                            ${people.map(person => `
                                <button class="btn-secondary" style="text-align: left;"
                                    onclick="ui.closeModal(); (${callback.toString()})(\'${person}\')">
                                    ${person}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    <button class="btn-secondary" style="width: 100%;" onclick="ui.closeModal()">
                        Cancel
                    </button>
                </div>
            </div>
        `;
    }
    
    // Select a job dialog
    showSelectJobDialog(callback) {
        const availableJobs = careerSystem.getAvailableCareers(game.character);
        
        if (availableJobs.length === 0) {
            showNotification('No jobs available for you!', 'warning');
            return;
        }
        
        this.appContainer.innerHTML += `
            <div class="modal active" id="selectModal">
                <div class="modal-content">
                    <div class="modal-header">Choose a Job</div>
                    <div class="modal-body">
                        <div style="display: grid; gap: 10px; max-height: 400px; overflow-y: auto;">
                            ${availableJobs.map(job => {
                                const career = careerSystem.getCareer(job);
                                return `
                                    <button class="btn-secondary" style="text-align: left; padding: 15px;"
                                        onclick="ui.closeModal(); (${callback.toString()})(\'${job}\')">
                                        <strong>${job}</strong><br>
                                        <small style="color: #999;">Salary: ${formatMoney(career.salary)}</small>
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    <button class="btn-secondary" style="width: 100%;" onclick="ui.closeModal()">
                        Cancel
                    </button>
                </div>
            </div>
        `;
    }
    
    // Close modal
    closeModal() {
        const modal = document.getElementById('selectModal');
        if (modal) modal.remove();
    }
    
    // Show game over screen
    showGameOverScreen() {
        const character = game.character;
        
        this.appContainer.innerHTML = `
            <div class="container">
                <div class="header">
                    <h1>💀 ${character.name}'s Life Ended</h1>
                </div>
                
                <div style="text-align: center; padding: 40px 20px;">
                    <h2 style="color: #333; margin-bottom: 20px;">
                        Lived ${character.age} wonderful years
                    </h2>
                    
                    <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
                        <h3 style="color: #333; margin-bottom: 20px;">Life Summary</h3>
                        
                        <div style="text-align: left; display: inline-block;">
                            <p><strong>Years Lived:</strong> ${character.age}</p>
                            <p><strong>Final Money:</strong> ${formatMoney(character.money)}</p>
                            <p><strong>Final Fame:</strong> ${character.fame}/100</p>
                            <p><strong>Total Events:</strong> ${character.lifeEvents.length}</p>
                            <p><strong>Relationships:</strong> ${character.relationships.length}</p>
                            <p><strong>Achievements:</strong> ${character.achievements.length}</p>
                        </div>
                    </div>
                    
                    ${character.lifeEvents.length > 0 ? `
                        <div style="background: #f0f4ff; padding: 20px; border-radius: 10px; margin-bottom: 30px; text-align: left; max-height: 300px; overflow-y: auto;">
                            <h4 style="color: #333; margin-bottom: 15px;">Life Events:</h4>
                            ${character.lifeEvents.map(event => `
                                <p style="color: #666; margin-bottom: 8px; font-size: 0.9em;">
                                    <strong>Age ${event.age}:</strong> ${event.text}
                                </p>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <div class="button-group" style="max-width: 400px; margin: 0 auto;">
                        <button class="btn-primary" onclick="ui.showMenu()">
                            🎮 Main Menu
                        </button>
                        <button class="btn-secondary" onclick="ui.showCharacterCreation()">
                            🆕 New Game
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Create global UI instance
const ui = new UI();
