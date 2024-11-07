async function loadStandings() {
    try {
        const response = await fetch('standings.json'); 
        const data = await response.json();
        displayStandings(data);
    } catch (error) {
        console.error("Error loading standings data:", error);
    }
}

function displayStandings(data) {
    const eastStandingsTableBody = document.querySelector("#east-standings-table tbody");
    const westStandingsTableBody = document.querySelector("#west-standings-table tbody");
    
    // Filter and sort data by conference and rank
    const easternConference = data.response
        .filter(team => team.conference.name === "east")
        .sort((a, b) => a.conference.rank - b.conference.rank);

    const westernConference = data.response
        .filter(team => team.conference.name === "west")
        .sort((a, b) => a.conference.rank - b.conference.rank);

    // Function to construct the image path based on your custom images
    function getTeamLogoPath(teamId) {
        return `assets/team-logos/${teamId}.png`;
    }

    // Populate Eastern Conference Table
    easternConference.forEach(teamData => {
        const team = teamData.team;
        const win = teamData.win;
        const loss = teamData.loss;
        const logoPath = getTeamLogoPath(team.id);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="display: none;">${teamData.conference.rank}</td>
            <td><img src="${logoPath}" alt="${team.nickname} logo"></td>
            <td>${team.name}</td>
            <td>${win.total}</td>
            <td>${loss.total}</td>
            <td>${win.percentage}</td>
            <td>${teamData.winStreak ? `W${teamData.streak}` : `L${teamData.streak}`}</td>
        `;
        eastStandingsTableBody.appendChild(row);
    });

    // Populate Western Conference Table
    westernConference.forEach(teamData => {
        const team = teamData.team;
        const win = teamData.win;
        const loss = teamData.loss;
        const logoPath = getTeamLogoPath(team.id);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="display: none;">${teamData.conference.rank}</td>
            <td><img src="${logoPath}" alt="${team.nickname} logo"></td>
            <td>${team.name}</td>
            <td>${win.total}</td>
            <td>${loss.total}</td>
            <td>${win.percentage}</td>
            <td>${teamData.winStreak ? `W${teamData.streak}` : `L${teamData.streak}`}</td>
        `;
        westStandingsTableBody.appendChild(row);
    });
}

loadStandings();