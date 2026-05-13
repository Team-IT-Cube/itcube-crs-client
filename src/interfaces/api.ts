export interface ApiResponse<T> {
    data: T | null,
    statusCode: number
    error: {
        message: string,
        errors?: Record<string, string[]>
    } | null,
}