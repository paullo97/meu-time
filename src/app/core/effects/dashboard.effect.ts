import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadCountry, loadCountrySuccess, loadLeague, loadLeagueSuccess, loadTeamStatistics, loadTeamStatisticsSuccess, loadPlayers, loadPlayersSuccess, loadSeason, loadSeasonSuccess, loadTeam, loadTeamSuccess } from "../store/dashboard/dashboard.actions";
import { EMPTY, catchError, map, switchMap, withLatestFrom } from "rxjs";
import { DashboardService } from "../services/dashboard.service";
import { LoginStore } from "../store/login/login.store";
import { Store } from "@ngrx/store";
import { getKey } from "../store/login/login.selectors";

@Injectable()
export class DashboardEffect {
    loadCountry$ = createEffect(() => this.actions$.pipe(
        ofType(loadCountry),
        switchMap(() => this.dashboardService.getCountrys()),
        map((response) => loadCountrySuccess({ countrys: response.response }))
    ));

    loadSeason$ = createEffect(() => this.actions$.pipe(
        ofType(loadSeason),
        switchMap(() => this.dashboardService.getSeason()),
        map(({ response }) => loadSeasonSuccess({ seasons: response }))
    ));

    loadLeague$ = createEffect(() => this.actions$.pipe(
        ofType(loadLeague),
        switchMap(({ countrySelected, season }) => this.dashboardService.getLeague(countrySelected, season)),
        map((response) => loadLeagueSuccess({
            league: response.response.sort((league1: any, league2: any) => {
                let fa = league1.league.name.toLowerCase(),
                    fb = league2.league.name.toLowerCase();

                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            })
        }))
    ));

    loadTeam$ = createEffect(() => this.actions$.pipe(
        ofType(loadTeam),
        switchMap(({ countrySelected, leagueSelected, season }) => this.dashboardService.getTeam(leagueSelected, countrySelected, season)),
        map((response) => loadTeamSuccess({ teams: response.response }))
    ));

    loadPlayers$ = createEffect(() => this.actions$.pipe(
        ofType(loadPlayers),
        switchMap(({ league, season, team }) => this.dashboardService.getListPlayers(team, league, season)),
        map(({ response }) => loadPlayersSuccess({ players: response }))
    ));



    loadStatistics$ = createEffect(() => this.actions$.pipe(
        ofType(loadTeamStatistics),
        switchMap(({ league, season, team }) => this.dashboardService.getTeamsStatistics(team, league, season)),
        map(({ response }) => loadTeamStatisticsSuccess({
            lineup: response.lineups.reduce((prev: any, current: any) => {
                return (prev.played > current.played) ? prev : current
            }),
            totalDraw: response.fixtures.draws.total,
            totalLoses: response.fixtures.loses.total,
            totalPlayed: response.fixtures.played.total,
            totalWins: response.fixtures.wins.total,
            goalsFor: response.goals.for.minute,
            goalsAgaint: response.goals.against.minute
        }))
    ));

    constructor(
        private readonly loginStore: Store<LoginStore>,
        private readonly actions$: Actions,
        private readonly _snackBar: MatSnackBar,
        private readonly dashboardService: DashboardService,
    ) { }
}