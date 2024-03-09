class TeamGenerator {
  constructor(players, playersPerTeam = 3) {
    this.players = players;
    this.playersPerTeam = playersPerTeam;
    this.teams = [];
  }

  generateTeams() {
    const shouldBalanceTeams = this.players.every(player => player.hasOwnProperty('skill'));    
    let teamIndex = 0;
    if (shouldBalanceTeams) {
      let sortedPlayers = [...this.players].sort((a, b) => b.skill - a.skill);
      let teamSkills = new Array(Math.ceil(this.players.length / this.playersPerTeam)).fill(0);
      sortedPlayers.forEach(player => {
        let index = teamSkills.indexOf(Math.min(...teamSkills));
        if (!this.teams[index]) {
          this.teams[index] = { name: `Équipe ${index + 1}`, players: [] };
        }
        this.teams[index].players.push(player);
        teamSkills[index] += player.skill;
      });
    } else {
      let shuffledPlayers = [...this.players].sort(() => 0.5 - Math.random()); 
      while (shuffledPlayers.length > 0) {
        let teamPlayers = shuffledPlayers.splice(0, this.playersPerTeam);
        let teamName = `Équipe ${teamIndex + 1}`;
        let team = {
          name: teamName,
          players: teamPlayers,
        };
        this.teams.push(team);
        teamIndex++;
      }
    }
  }

  getTeams() {
    return this.teams;
  }
}

export default  TeamGenerator
// Exemple d'utilisation

