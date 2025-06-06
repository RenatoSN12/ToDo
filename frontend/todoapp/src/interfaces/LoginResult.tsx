import type { JwtData } from "./JwtData";

export interface LoginResult {
    statusCode: number;
    message: string;
    success: boolean;
    jwtData: JwtData;
}