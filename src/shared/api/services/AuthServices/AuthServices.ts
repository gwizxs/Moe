
import { AxiosResponse } from "axios";
import api from "../../http/http";
import { AuthResponse } from "../../model/response/AuthResponse";



export default class AuthServices {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post('api/auth/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post('api/auth/register', {email, password})
    }

    static async logout(): Promise<void> {
        return api.post('api/auth/logout')
    }
}