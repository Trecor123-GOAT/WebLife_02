// Main entry point - initializes the game

document.addEventListener('DOMContentLoaded', function() {
    console.log('WebLife is loading...');
    
    // Show the main menu when the page loads
    ui.showMenu();
    
    console.log('WebLife loaded successfully!');
});

// Handle keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Save game with Ctrl+S or Cmd+S
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        game.saveGame();
    }
});
