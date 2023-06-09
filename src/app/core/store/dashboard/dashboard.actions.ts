import { createAction, props } from "@ngrx/store";
import { storeTag } from "./dashboard.store";
import { Country, IGoals, ILeague, IPlayer, ITeam } from "../../services/model/responseDashboard.model";

export const loadCountry = createAction(
    `${storeTag} Load Country`
);

export const loadCountrySuccess = createAction(
    `${storeTag} Load Country Success`,
    props<{
        countrys: Array<Country>;
    }>()
);

export const loadLeague = createAction(
    `${storeTag} Load League`,
    props<{
        countrySelected: string;
        season: string;
    }>()
);
export const loadLeagueSuccess = createAction(
    `${storeTag} Load League Success`,
    props<{
        league: Array<ILeague>;
    }>()
);

export const loadSeason = createAction(
    `${storeTag} Load Season`
);
export const loadSeasonSuccess = createAction(
    `${storeTag} Load Season Success`,
    props<{
        seasons: Array<number>;
    }>()
);

export const loadTeam = createAction(
    `${storeTag} Load Team`,
    props<{
        countrySelected: string;
        leagueSelected: string;
        season: string;
    }>()
);
export const loadTeamSuccess = createAction(
    `${storeTag} Load Team Success`,
    props<{
        teams: Array<ITeam>;
    }>()
);

export const loadPlayers = createAction(
    `${storeTag} Load Players`,
    props<{
        team: string;
        league: string;
        season: string;
    }>()
);
export const loadPlayersSuccess = createAction(
    `${storeTag} Load Players Success`,
    props<{
        players: Array<IPlayer>;
    }>()
);

export const loadTeamStatistics = createAction(
    `${storeTag} Load Team Statistics`,
    props<{
        team: string;
        league: string;
        season: string;
    }>()
);
export const loadTeamStatisticsSuccess = createAction(
    `${storeTag} Load Team Statistics Success`,
    props<{
        lineup: any; // FIX MODEL
        totalPlayed: number;
        totalWins: number;
        totalLoses: number;
        totalDraw: number;
        goalsFor: IGoals;
        goalsAgaint: IGoals;
    }>()
);