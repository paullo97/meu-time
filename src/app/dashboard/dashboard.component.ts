import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LoginStore } from '../core/store/login/login.store';
import { Store } from '@ngrx/store';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogLogoutComponent } from './dialog-logout/dialog-logout.component';
import { logout } from '../core/store/login/login.actions';
import { Observable, Subscription } from 'rxjs';
import { DashboardStore } from '../core/store/dashboard/dashboard.store';
import { loadCountry, loadPlayers, loadSeason, loadTeam } from '../core/store/dashboard/dashboard.actions';
import { getCountrys, getLeague, getLoadingDashboardDown, getMostLineup, getPlayers, getSeasons, getTeam } from '../core/store/dashboard/dashboard.selectors';
import { getLoadingDashboard } from '../core/store/dashboard/dashboard.selectors';
import { getKey } from '../core/store/login/login.selectors';
import { loadLeague } from '../core/store/dashboard/dashboard.actions';
import { Country, ILeague, IPlayer, ITeam } from '../core/services/model/responseDashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy
{
  public Country: string = '';
  public League: string = '';
  public Team: string = '';
  public season: string = '';

  public sub: Subscription = new Subscription();

  public loading$: Observable<boolean> = this.dashboardStore.select(getLoadingDashboard);
  public listCountrys$: Observable<Array<Country>> = this.dashboardStore.select(getCountrys);
  public listLeague$: Observable<Array<ILeague>> = this.dashboardStore.select(getLeague);
  public listTeams$: Observable<Array<ITeam>> = this.dashboardStore.select(getTeam);
  public listSeasons$: Observable<Array<number>> = this.dashboardStore.select(getSeasons);

  public loadingDashboard$: Observable<boolean> = this.dashboardStore.select(getLoadingDashboardDown);
  public listPlayers$: Observable<Array<IPlayer>> = this.dashboardStore.select(getPlayers);
  public mostLineup$: Observable<any> = this.dashboardStore.select(getMostLineup);
  
  constructor(
    private readonly loginStore: Store<LoginStore>,
    private readonly dashboardStore: Store<DashboardStore>,
    public dialog: MatDialog
  )
  { }

  public set selectCountry(args: string)
  {
    this.Country = args;
    this.dashboardStore.dispatch(loadSeason());
  }

  public get selectCountry(): string
  {
    return this.Country;
  }

  public set selectSeason(args: string)
  {
    this.season = args;
    this.dashboardStore.dispatch(loadLeague({ countrySelected: this.Country, season: this.selectSeason }));
  }

  public get selectSeason(): string
  {
    return this.season;
  }

  public set selectLeague(args: string)
  {
    this.League = args;
    this.dashboardStore.dispatch(loadTeam({ countrySelected: this.Country, leagueSelected: this.selectLeague, season: this.selectSeason }));
  }

  public get selectLeague(): string
  {
    return this.League;
  }

  public set selectTeam(args: string)
  {
    this.Team = args;
    this.dashboardStore.dispatch(loadPlayers({ team: this.selectTeam, league: this.selectLeague, season: this.selectSeason }));
  }

  public get selectTeam(): string
  {
    return this.Team;
  }
  
  public ngOnInit(): void
  {
    this.dashboardStore.dispatch(loadCountry());
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public logout(): void
  {
    const dialogRef = this.dialog.open(DialogLogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.loginStore.dispatch(logout());
      }
    });
  }

  public clearFields(): void
  {
    this.selectCountry = '';
    this.selectLeague = '';
    this.selectTeam = '';
    this.selectSeason = '';
  }
}
