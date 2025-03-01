import axios from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "shared/api/http/http";
import { AuthResponse } from "shared/api/model/response/AuthResponse";
import { IUser } from "shared/api/model/response/IUser";
import AuthServices from "shared/api/services/AuthServices/AuthServices";

export class LoginStore {
    user = {} as IUser
    isAuth = false
    password = ''
    constructor() {
        makeAutoObservable(this);
    }

    setAuth(isAuth: boolean) {
        this.isAuth = isAuth
    }

    setUser(user: IUser) {
        this.user = user
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthServices.login(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.error('Login error:', e);
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthServices.registration(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.error('Login error:', e);
        }
    }

    async logout() {
        try {
            const response = await AuthServices.logout();
            console.log(response);
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            console.error('Login error:', e);
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/api/auth/refresh`, {withCredentials: true});
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.error('Login error:', e);
        }
    }
}