export interface LoginRequest {
    email: string,
    password: string
}

export interface CreateInvestment {
    commission: string,
    user_id: string,
    project: string,
}