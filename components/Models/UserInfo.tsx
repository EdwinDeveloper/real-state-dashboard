import { Commission } from "./Commission";
import { Companie } from "./Companie";
import { Project } from "./Project";
import { User } from './User'
import { Video } from './video'

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
    users: User[],

    status?: number,
    body?: Object,
}