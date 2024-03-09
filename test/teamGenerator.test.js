import { expect } from 'chai';
import TeamGenerator from '../src/teamGenerator.js';
import TournamentGenerator from '../src/tournamentGenerator.js';

describe('TeamGenerator unity', () => {
  it('should generate the correct number of teams with the correct number of players', () => {
    const players = ['Player1', 'Player2', 'Player3', 'Player4', 'Player5', 'Player6'];
    const teamGenerator = new TeamGenerator(players, 2);
    teamGenerator.generateTeams();
    expect(teamGenerator.getTeams()).to.have.lengthOf(3);
    teamGenerator.getTeams().forEach(team => {
      expect(team.players).to.have.lengthOf(2);
    });
  });
});

describe('TournamentGenerator integration', () => {
    it('qualified teams from poules should move to final stages', () => {
      const teams = [
        { name: "Team 1", players: ['Player1', 'Player2', 'Player3'] },
        { name: "Team 2", players: ['Player4', 'Player5', 'Player6'] },
        { name: "Team 3", players: ['Player7', 'Player8', 'Player9'] },
        { name: "Team 4", players: ['Player10', 'Player11', 'Player12'] },
        { name: "Team 5", players: ['Player13', 'Player14', 'Player15'] },
        { name: "Team 6", players: ['Player16', 'Player17', 'Player18'] },
      ];
      const tournamentGenerator = new TournamentGenerator(teams);
      tournamentGenerator.generatePoules();
      tournamentGenerator.simulatePoulesMatches();
      expect(tournamentGenerator.finalStages[0]).to.have.lengthOf(2);
    });
  });
  
describe('TournamentGenerator functionality', () => {
  it('should complete a tournament from poules to a single winner without errors', () => {
    const teams = [
      { name: "Team 1", players: ["Player1", "Player2"] },
      { name: "Team 2", players: ["Player3", "Player4"] },
      { name: "Team 3", players: ["Player5", "Player6"] },
      { name: "Team 4", players: ["Player7", "Player8"] }
    ];
    const tournamentGenerator = new TournamentGenerator(teams);
    const finalStages = tournamentGenerator.generateTournament();
    expect(finalStages[finalStages.length - 1]).to.have.lengthOf(1); 
  });
});

describe('TeamGenerator TDD unity', () => {
    it('should create balanced teams based on player skill levels', () => {
      const players = [
        { name: 'Player1', skill: 5 },
        { name: 'Player2', skill: 4 },
        { name: 'Player3', skill: 5 },
        { name: 'Player4', skill: 4 },
        { name: 'Player5', skill: 3 },
        { name: 'Player6', skill: 3 }
      ];
      const teamGenerator = new TeamGenerator(players, 3, true); 
      teamGenerator.generateTeams();
      const teams = teamGenerator.getTeams();
  
      const teamsSkillSum = teams.map(team => team.players.reduce((sum, player) => sum + player.skill, 0));
      expect(teamsSkillSum[0]).to.be.closeTo(teamsSkillSum[1], 1); 
    });
  });
  