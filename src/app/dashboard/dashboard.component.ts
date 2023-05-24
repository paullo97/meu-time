import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LoginStore } from '../core/store/login/login.store';
import { Store } from '@ngrx/store';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogLogoutComponent } from './dialog-logout/dialog-logout.component';
import { logout } from '../core/store/login/login.actions';
import { Observable, Subscription } from 'rxjs';
import { DashboardStore } from '../core/store/dashboard/dashboard.store';
import { loadCountry, loadPlayers, loadSeason, loadTeam, loadTeamStatistics } from '../core/store/dashboard/dashboard.actions';
import { getCountrys, getLeague, getLoadingDashboardDown, getMostLineup, getPlayers, getSeasons, getTeam, getTeamsStatistics } from '../core/store/dashboard/dashboard.selectors';
import { getLoadingDashboard } from '../core/store/dashboard/dashboard.selectors';
import { getKey } from '../core/store/login/login.selectors';
import { loadLeague } from '../core/store/dashboard/dashboard.actions';
import { Country, IGoals, ILeague, IPlayer, ITeam } from '../core/services/model/responseDashboard.model';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { notNullPipe } from 'src/environments/constants';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

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
  public teamStatistic$: Observable<any> = this.dashboardStore.select(getTeamsStatistics);

  // Graph
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: false,
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };

  public radarChartType: ChartType = 'bar';
  public radarChartLabels: string[] = ['0-15', '16-30', '31-45', '46-60', '61-75', '76-90', '91-105', '106-120'];
  public radarChartData: ChartData<'bar'> = {
    labels: this.radarChartLabels,
    datasets: []
  };
  public barChartPlugins = [
    DataLabelsPlugin
  ];
  
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
    this.dashboardStore.dispatch(loadTeamStatistics({ team: this.selectTeam, league: this.selectLeague, season: this.selectSeason }));
  }

  public get selectTeam(): string
  {
    return this.Team;
  }
  
  public ngOnInit(): void
  {
    this.dashboardStore.dispatch(loadCountry());

    this.sub.add(
      this.teamStatistic$.pipe(notNullPipe).subscribe(({ goalsFor, goalsAgaint}) =>
      {
        this.radarChartData.datasets.push({
          data: Object.values((goalsFor as IGoals)).map((obj) => obj.total === null ? 0 : obj.total),
          label: 'For'
        })

        this.radarChartData.datasets.push({
          data: Object.values((goalsAgaint as IGoals)).map((obj) => obj.total === null ? 0 : obj.total),
          label: 'Againt'
        })
      })
    );
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

  public formatListPlayers(player: IPlayer): string
  {
    return `Nome: ${player.player.firstname} - Idade:${player.player.age} - Nac. ${player.player.nationality}`;
  }
}
