export interface LoginRequest {
    email: string,
    password: string
}

export interface CreateInvestment {
    bonus: string,
    user_id: string,
    project: string
}