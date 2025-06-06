import axios from 'axios';
import type { LoginResult } from '../interfaces/LoginResult';
import type { Result } from '../interfaces/Result';

const backendUrl = "http://localhost:5052/api/auth";

export const loginApi = async(emailAddress: string, password: string): Promise<LoginResult> => {
    const response = await axios.post(`${backendUrl}/login`, {emailAddress, password});
    return response.data;
}

export const register = async(name: string, emailAddress: string, password: string): Promise<Result> => {
    const response = await axios.post(`${backendUrl}/register`, {name, emailAddress, password});
    return response.data;
}