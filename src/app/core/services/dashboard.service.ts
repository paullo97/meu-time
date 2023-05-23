import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IResponseCountry, IResponseLeague, IResponsePlayer, IResponseSeason, IResponseTeam } from "./model/responseDashboard.model";
import { urlBase } from "src/environments/constants";

@Injectable()
export class DashboardService
{
    constructor(
        private readonly http: HttpClient
    )
    { }

    public getCountrys(): Observable<IResponseCountry>
    {
        return this.http.get<IResponseCountry>(`${urlBase}/countries`);
    }

    public getSeason(): Observable<IResponseSeason>
    {
        return this.http.get<IResponseSeason>(`${urlBase}/leagues/seasons`);
    }

    public getLeague(country: string, season: string): Observable<IResponseLeague>
    {
        return this.http.get<IResponseLeague>(`${urlBase}/leagues?country=${country}&season=${season}`);
    }

    public getTeam(league: string, country: string, season: string, key: string = 'ca4ea7ee8bc6df7f82c6cddfb827e20b'): Observable<IResponseTeam>
    {
        return this.http.get<IResponseTeam>(`${urlBase}/teams?league=${league}&country=${country}&season=${season}`);
    }

    public getListPlayers(teamId: string, leagueId: string, seasonId: string, key: string = 'ca4ea7ee8bc6df7f82c6cddfb827e20b'): Observable<IResponsePlayer>
    {

        return this.http.get<IResponsePlayer>(`${urlBase}/players?team=${teamId}&league=${leagueId}&season=${seasonId}`);
    }

    public getTeamsStatistics(teamId: string, leagueId: string, seasonId: string, key: string = 'ca4ea7ee8bc6df7f82c6cddfb827e20b'): Observable<any>
    {
        return this.http.get(`${urlBase}/teams/statistics?season=${seasonId}&team=${teamId}&league=${leagueId}`);
    }
}