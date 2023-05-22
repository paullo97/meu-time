import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadCountry, loadCountrySuccess, loadLeague, loadLeagueSuccess, loadMostLineup, loadMostLineupSuccess, loadPlayers, loadPlayersSuccess, loadSeason, loadSeasonSuccess, loadTeam, loadTeamSuccess } from "../store/dashboard/dashboard.actions";
import { EMPTY, catchError, map, switchMap, withLatestFrom } from "rxjs";
import { DashboardService } from "../services/dashboard.service";
import { LoginStore } from "../store/login/login.store";
import { Store } from "@ngrx/store";
import { getKey } from "../store/login/login.selectors";

@Injectable()
export class DashboardEffect {
    loadCountry$ = createEffect(() => this.actions$.pipe(
        ofType(loadCountry),
        withLatestFrom(this.loginStore.select(getKey)),
        switchMap(([_, key]) => this.dashboardService.getCountrys(key)),
        map((response) => loadCountrySuccess({ countrys: response.response }))
    ));

    loadSeason$ = createEffect(() => this.actions$.pipe(
        ofType(loadSeason),
        withLatestFrom(this.loginStore.select(getKey)),
        switchMap(([_, key]) => this.dashboardService.getSeason(key)),
        map(({ response }) => loadSeasonSuccess({ seasons: response }))
    ));

    loadLeague$ = createEffect(() => this.actions$.pipe(
        ofType(loadLeague),
        withLatestFrom(this.loginStore.select(getKey)),
        switchMap(([{ countrySelected, season }, key]) => this.dashboardService.getLeague(countrySelected, season, key)),
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
        withLatestFrom(this.loginStore.select(getKey)),
        switchMap(([{ countrySelected, leagueSelected, season }, key]) => this.dashboardService.getTeam(leagueSelected, countrySelected, season, key)),
        map((response) => loadTeamSuccess({ teams: response.response }))
    ));

    loadPlayers$ = createEffect(() => this.actions$.pipe(
        ofType(loadPlayers),
        switchMap(({ league, season, team }) => this.dashboardService.getListPlayers(team, league, season)),
        map(({ response }) => loadPlayersSuccess({ players: response }))
    ));



    loadStatistics$ = createEffect(() => this.actions$.pipe(
        ofType(loadMostLineup),
        switchMap(({ league, season, team }) => this.dashboardService.getTeamsStatistics(team, league, season)),
        map(({ response }) => loadMostLineupSuccess({
            lineup: response.lineups.reduce((prev: any, current: any) => {
                return (prev.played > current.played) ? prev : current
            })
        }))
    ));

    constructor(
        private readonly loginStore: Store<LoginStore>,
        private readonly actions$: Actions,
        private readonly _snackBar: MatSnackBar,
        private readonly dashboardService: DashboardService,
    ) { }
}