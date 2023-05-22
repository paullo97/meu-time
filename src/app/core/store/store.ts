import { dashboardReducer } from "./dashboard/dashboard.reduce";
import { DashboardStore } from "./dashboard/dashboard.store";
import { loginReducer } from "./login/login.reduce";
import { LoginStore } from "./login/login.store";
import { Action, ActionReducerMap } from '@ngrx/store';

export interface AppState
{
    login: LoginStore,
    dashboard: DashboardStore
}

/**
 * App root store containing all reducers.
 */
export const reducers: ActionReducerMap<object, Action> = {
    login: loginReducer,
    dashboard: dashboardReducer
};