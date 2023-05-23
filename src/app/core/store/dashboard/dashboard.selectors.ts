import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardStore } from './dashboard.store';

const getDashboardState = createFeatureSelector<DashboardStore>('dashboard');

export const getLoadingDashboard = createSelector(
    getDashboardState,
    (store: DashboardStore) => store.loading
);

export const getCountrys = createSelector(
    getDashboardState,
    (store: DashboardStore) => store.countrys
);

export const getLeague = createSelector(
    getDashboardState,
    (store: DashboardStore) => store.league
);

export const getTeam = createSelector(
    getDashboardState,
    (store: DashboardStore) => store.teams
);

export const getSeasons = createSelector(
    getDashboardState,
    (store: DashboardStore) => store.season
);

export const getLoadingDashboardDown = createSelector(
    getDashboardState,
    (store: DashboardStore) => store.loadingDashboard
);

export const getPlayers = createSelector(
    getDashboardState,
    (store: DashboardStore) => store.players
);

export const getMostLineup = createSelector(
    getDashboardState,
    (store: DashboardStore) => store.mostLineup
);

export const getTeamsStatistics = createSelector(
    getDashboardState,
    (store: DashboardStore) => store.teamStatistics
);