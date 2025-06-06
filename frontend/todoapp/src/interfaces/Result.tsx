export interface Result<T = any> {
    statusCode: number;
    message: string;
    success: boolean;
    data: T | null;
}