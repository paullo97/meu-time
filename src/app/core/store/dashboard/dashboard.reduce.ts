import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { DashboardStore } from './dashboard.store';
import { loadLeague, loadCountry, loadCountrySuccess, loadLeagueSuccess, loadTeam, loadTeamSuccess, loadSeason, loadSeasonSuccess, loadPlayers, loadPlayersSuccess, loadTeamStatistics, loadTeamStatisticsSuccess } from './dashboard.actions';

export const initialState: Partial<DashboardStore> = {
    loading: true,
    error: undefined,
    countrys: [],
    league: [],
    teams: [],
    season: [],
    players: [],
    loadingDashboard: false,
    mostLineup: {
        formation: '',
        played: 0
    }
};

const reducer: ActionReducer<Partial<DashboardStore>, Action> = createReducer(
    initialState,
    on(loadCountry, (state) => ({
        ...state,
        loading: true
    })),
    on(loadCountrySuccess, (state, action) => ({
        ...state,
        loading: false,
        countrys: action.countrys
    })),
    on(loadLeague, (state) => ({
        ...state,
        loading: true
    })),
    on(loadLeagueSuccess, (state, action) => ({
        ...state,
        loading: false,
        league: action.league
    })),
    on(loadTeam, (state) => ({
        ...state,
        loading: true
    })),
    on(loadTeamSuccess, (state, action) => ({
        ...state,
        loading: false,
        teams: action.teams
    })),
    on(loadSeason, (state) => ({
        ...state,
        loading: true
    })),
    on(loadSeasonSuccess, (state, action) => ({
        ...state,
        loading: false,
        season: action.seasons
    })),
    on(loadPlayers, (state) => ({
        ...state,
        loadingDashboard: true
    })),
    on(loadPlayersSuccess, (state, action) => ({
        ...state,
        loadingDashboard: false,
        players: action.players
    })),
    on(loadTeamStatistics, (state) => ({
        ...state,
        loadingDashboard: true
    })),
    on(loadTeamStatisticsSuccess, (state, action) => ({
        ...state,
        loadingDashboard: false,
        mostLineup: action.lineup,
        teamStatistics: {
            totalDraw: action.totalDraw,
            totalLoses: action.totalLoses,
            totalPlayed: action.totalPlayed,
            totalWins: action.totalWins,
            goalsFor: action.goalsFor,
            goalsAgaint: action.goalsAgaint
        },
    }))
);

export function dashboardReducer(
    state: Partial<DashboardStore> = initialState,
    action: Action
): Partial<DashboardStore>
{
    return reducer(state, action);
}