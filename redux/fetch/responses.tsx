export interface MeInfoResponse extends DefaultResponse {
    data: UserInfo
}

export interface LoginResponse extends DefaultResponse {
    data: Login
}

export interface GetProjectsResponse extends DefaultResponse {
    data: Project[]
}

export interface GetCompaniesResponse extends DefaultResponse {
    data: Companie[]
}

export interface CreateCompaniesResponse extends DefaultResponse {
    data: Companie
}

export interface UpdateCompaniesResponse extends DefaultResponse {
    data: Companie
}

export interface GetCommissionsResponse extends DefaultResponse {
    data: Commission[]
}

export interface UpdateCommissionResponse extends DefaultResponse {
    data: Commission
}

export interface CreateCommissionResponse extends DefaultResponse {
    data: Commission
}

export interface CreateInvestmentResponse extends DefaultResponse {
    data: Investment
}

export interface UpdateReferralResponse extends DefaultResponse {
    data: Referral
}

export interface CreateProjectResponse extends DefaultResponse {
    data: Project
}

export interface UpdateProjectResponse extends DefaultResponse {
    data: Project
}

export interface UserInfo {
    id: string,
    country_code: string,
    phone_number: string,
    gender: string,
    birthday: string,
    email: string,
    name: string,
    last_name: string,
    is_active: boolean,
    is_staff: boolean,
    projects: Project[],
    videos: Video,

    commissions: Commission[],
    companies: Companie[],
    users: User[]
}

export interface Project {
    id: string,
    name: string,
    model: string,
    description: string,
    pre_sale_price: number,
    pre_sale_date: string,
    premises_delivery_date: string,
    rent_price_approximate: number,
    resale_price_approximate: number,
    images: Image[],
    details: Detail[],
    extras: Extra[],
    commission: string,
    company_related: string,
}

export interface Image {
    id: string,
    url: string,
    title: string,
}
export interface Detail {
    id: string,
    key: string,
    info: string,
}
export interface Extra {
    id: string,
    key: string,
    info: string,
}

export interface Video {
    kind: string,
    etag: string,
    nextPageToken: string,
    regionCode: string,
    items: Item[],
}

export interface Item {
    etag: string,
    id: Id,
    kind: string,
    snippet: Snippet,
}

interface Id {
    kind: string,
    videoId: string,
}

interface Snippet {
    channelId: string,
    channelTitle: string,
    description: string,
    liveBroadcastContent: string,
    publishTime: string,
    publishedAt: string,
    title: string,
}

export interface Commission {
    id: string,
    description: string,
    percentage: string,
}

export interface Companie {
    id: string,
    name: string,
    icon: string,
}

export interface User {
    id: string,
    name: string,
    last_name: string,
    country_code: string,
    phone_number: string,
    email: string,
    referrals: Referral[],
    investments: Investment[],
}

export interface Referral {
    id: string,
    country_code: string,
    phone_number: string,
    gender: string,
    name: string,
    last_name: string,
    project: string,
    commission: string,
    status: string,
}

export interface Investment {
    id: string,
    commission: string,
    status: string,
    user_id: string,
    paid: boolean,
    project: Project
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