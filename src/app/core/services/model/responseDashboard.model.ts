import { IResponse } from "./response.model";

export interface IResponseCountry extends IResponse
{
    response: Array<Country>;
}


export interface Country
{
    name: string
    code: string
    flag: string
}

export interface IResponseSeason extends IResponse
{
    response: Array<number>;
}

export interface IResponseLeague extends IResponse
{
    response: Array<ILeague>;
}

export interface ILeague {
    league: League;
    country: Country;
  }
  
  export interface League {
    id: number
    name: string
    type: string
    logo: string
  }

export interface IResponseTeam extends IResponse
{
    response: Array<ITeam>;
}

export interface ITeam {
    team: Team
    venue: Venue
  }
  
  export interface Team {
    id: number
    name: string
    code: string
    country: string
    founded: number
    national: boolean
    logo: string
  }
  
  export interface Venue {
    id: number
    name: string
    address: string
    city: string
    capacity: number
    surface: string
    image: string
  }

export interface IResponsePlayer extends IResponse
{
    response: Array<IPlayer>;
}

export interface IPlayer {
    player: Player
  }
  
  export interface Player {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
  }

  export interface IGoals {
    minute: Minute
  }
  
  export interface Minute {
    "0-15": IInfoPercentage;
    "16-30": IInfoPercentage;
    "31-45": IInfoPercentage;
    "46-60": IInfoPercentage;
    "61-75": IInfoPercentage;
    "76-90": IInfoPercentage;
    "91-105": IInfoPercentage;
    "106-120": IInfoPercentage;
  }

  export interface IInfoPercentage {
    total: number
    percentage: string
  }