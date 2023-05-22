import { ErrorPayload } from "../../services/model/error.model";
import { Country, ILeague, IPlayer, ITeam } from "../../services/model/responseDashboard.model";

export const storeTag: string = '[Dashboard Store]';

export interface DashboardStore
{
    countrys: Array<Country>;
    league: Array<ILeague>;
    teams: Array<ITeam>;
    season: Array<number>;
    players: Array<IPlayer>;
    mostLineup: any;
    loading: boolean;
    loadingDashboard: boolean;
    error: ErrorPayload;
}