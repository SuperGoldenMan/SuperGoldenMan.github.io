// Load the JSON data
let playerData = {};

fetch('last-year-stats.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(player => {
            playerData[player.playerId] = player;
        });
    })
    .catch(error => console.error("Error loading player data:", error));

// Function to open overlay with player stats
function openOverlay(playerId) {
    const player = playerData[playerId];

    if (player) {
        // Update player stats
        document.getElementById('overlay-player-name').textContent = player.playerName;
        document.getElementById('overlay-ppg').textContent = (player.points / player.games).toFixed(1);
        document.getElementById('overlay-rpg').textContent = (player.totalRb / player.games).toFixed(1);
        document.getElementById('overlay-apg').textContent = (player.assists / player.games).toFixed(1);
        document.getElementById('overlay-spg').textContent = (player.steals / player.games).toFixed(1);
        document.getElementById('overlay-bpg').textContent = (player.blocks / player.games).toFixed(1);
        document.getElementById('overlay-fgp').textContent = (player.fieldPercent * 100).toFixed(1) + '%';
        document.getElementById('overlay-3ptp').textContent = (player.threePercent * 100).toFixed(1) + '%';
        document.getElementById('overlay-ftp').textContent = (player.ftPercent * 100).toFixed(1) + '%';

        // Set the image source based on playerId
        const overlayImage = document.querySelector('.overlay-right img');
        overlayImage.src = `assets/player-court/${playerId}.png`;

        // Display the overlay
        document.getElementById('player-overlay').style.display = 'flex';
    }
}

// Close overlay function
function closeOverlay() {
    document.getElementById('player-overlay').style.display = 'none';
}

// Event listener for player clicks
document.querySelectorAll('.player-item').forEach(item => {
    item.addEventListener('click', () => {
        const playerId = item.getAttribute('data-player-id');
        openOverlay(playerId);
    });
});

// Close overlay if clicking outside of the content area
document.getElementById('player-overlay').addEventListener('click', (event) => {
    const overlayContent = document.querySelector('.overlay-content');
    if (!overlayContent.contains(event.target)) {
        closeOverlay();
    }
});
