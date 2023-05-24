import { ErrorPayload } from "../../services/model/error.model";
import { Country, IGoals, ILeague, IPlayer, ITeam } from "../../services/model/responseDashboard.model";

export const storeTag: string = '[Dashboard Store]';

export interface DashboardStore
{
    countrys: Array<Country>;
    league: Array<ILeague>;
    teams: Array<ITeam>;
    season: Array<number>;
    players: Array<IPlayer>;
    mostLineup: any;
    teamStatistics: {
        totalPlayed: number;
        totalWins: number;
        totalDraw: number;
        totalLoses: number;
        goalsFor: IGoals;
        goalsAgaint: IGoals;
    }
    loading: boolean;
    loadingDashboard: boolean;
    error: ErrorPayload;
}