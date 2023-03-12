export interface LoginResponse extends DefaultResponse {
    data: Login
}

export interface Login {
    token: string
}

export interface DefaultResponse {
    status: number,
    messages: Message[]
}

export interface AxiosErrorResponse {
    status?: number,
    messages: Message[]
}

export interface Message {
    key: string,
    value: string,
}