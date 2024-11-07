async function loadGameData() {
    try {
        const response = await fetch('pistonsgames.json');
        const data = await response.json();
        displayFixtures(data);
    } catch (error) {
        console.error("Error loading game data:", error);
    }
}

function getTeamLogoPath(teamId) {
    return `assets/team-logos/${teamId}.png`;
}

function displayFixtures(data) {
    const lastResultsContainer = document.getElementById("last-results");
    const upcomingGamesContainer = document.getElementById("upcoming-games");

    // Define the date threshold as October 20, 2024
    const dateThreshold = new Date("2024-10-20T00:00:00.000Z");

    // Filter and sort data
    const completedGames = data.response
        .filter(game => {
            const gameDate = new Date(game.date.start);
            return game.status.short === 3 && gameDate > dateThreshold;
        })
        .sort((a, b) => new Date(a.date.start) - new Date(b.date.start));

    const upcomingGames = data.response
        .filter(game => game.status.short === 1)  // Scheduled games
        .sort((a, b) => new Date(a.date.start) - new Date(b.date.start));

    // Display all completed games in the left container
    lastResultsContainer.innerHTML = '';
    completedGames.forEach(game => {
        const homeTeam = game.teams.home;
        const visitorTeam = game.teams.visitors;
        const homeScore = game.scores.home.points;
        const visitorScore = game.scores.visitors.points;

        const homeLogoPath = getTeamLogoPath(homeTeam.id);
        const visitorLogoPath = getTeamLogoPath(visitorTeam.id);

        const fixtureBox = document.createElement("div");
        fixtureBox.classList.add("fixture-box");
        fixtureBox.innerHTML = `
            <div class="fixture-team">
                <img src="${homeLogoPath}" alt="${homeTeam.nickname} logo">
                <span>${homeTeam.nickname}</span>
            </div>
            <div class="fixture-score">
                <span>${homeScore}</span>
                <span> - </span>
                <span>${visitorScore}</span>
                <div class="fixture-status">FINAL</div>
            </div>
            <div class="fixture-team">
                <img src="${visitorLogoPath}" alt="${visitorTeam.nickname} logo">
                <span>${visitorTeam.nickname}</span>
            </div>
        `;
        lastResultsContainer.appendChild(fixtureBox);
    });

    // Display all upcoming games in the right container
    upcomingGamesContainer.innerHTML = '';
    upcomingGames.forEach(game => {
        const homeTeam = game.teams.home;
        const visitorTeam = game.teams.visitors;
        const gameDate = new Date(game.date.start).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });

        const homeLogoPath = getTeamLogoPath(homeTeam.id);
        const visitorLogoPath = getTeamLogoPath(visitorTeam.id);
        const fixtureBox = document.createElement("div");
        fixtureBox.classList.add("fixture-box");
        fixtureBox.innerHTML = `
            <div class="fixture-team">
                <img src="${homeLogoPath}" alt="${homeTeam.nickname} logo">
                <span>${homeTeam.nickname}</span>
            </div>
            <div class="fixture-score">
                <span>${gameDate}</span>
                <div class="fixture-status">UPCOMING</div>
            </div>
            <div class="fixture-team">
                <img src="${visitorLogoPath}" alt="${visitorTeam.nickname} logo">
                <span>${visitorTeam.nickname}</span>
            </div>
        `;
        upcomingGamesContainer.appendChild(fixtureBox);
    });
}

loadGameData();