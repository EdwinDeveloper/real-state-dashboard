import { AxiosOptions } from '../../components/Models/Fetch/AxiosOptions'
import { LoginRequest } from './requests'

// const url_base = "http://localhost:8000"
//const url_base = "http://ec2-3-145-15-251.us-east-2.compute.amazonaws.com"
const url_base = "http://143.198.63.104:8000"

export function setup(request: any, token: string) {
    let options: AxiosOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `${url_base}/api/user/create/`,
        data: request
    }
    return options
}

export function logIn(request: LoginRequest, token: string): AxiosOptions{
    let options: AxiosOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `${url_base}/api/user/token/`,
        data: request
    }
    return options
}

export function meInfo(request: any, token: string){
    let options: AxiosOptions = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/user/me/`,
        data: {}
    }
    return options
}

export function createReferral(request: any, token: string){
    let options: AxiosOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/referral/`,
        data: request
    }
    return options
}

export function getProjects(request: any, token: string){
    let options: AxiosOptions = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/projects/`
    }
    return options
}

export function createProject(request: any, token: string){
    let options: AxiosOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/projects/`,
        data: request
    }
    return options
}

export function updateProject(request: any, token: string, id: string){
    let options: AxiosOptions = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/projects/${id}`,
        data: request
    }
    return options
}

export function createInvestment(request: any, token: string, id_user: string){
    let options: AxiosOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/user/set/${id_user}/set-investment/`,
        data: request
    }
    return options
}

export function updateReferral(request: any, token: string, id_referral: string){
    let options: AxiosOptions = {
        method: 'patch',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/referral/${id_referral}/`,
        data: request
    }
    return options
}

export function getCommissions(request: any, token: string) {
    let options: AxiosOptions = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/commission/`,
        data: {}
    }
    return options
}

export function createCommission(request: any, token: string) {
    let options: AxiosOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/commission/`,
        data: request
    }
    return options
}

export function updateCommission(request: any, token: string, id_commission: string) {
    let options: AxiosOptions = {
        method: 'patch',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/commission/${id_commission}/`,
        data: request
    }
    return options
}

export function getCompanies(request: any, token: string) {
    let options: AxiosOptions = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/companies/`,
        data: {}
    }
    return options
}

export function createCompany(request: any, token: string) {
    let options: AxiosOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/companies/`,
        data: request
    }
    return options
}

export function updateCompany(request: any, token: string, id_company: string) {
    let options: AxiosOptions = {
        method: 'patch',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/companies/${id_company}/`,
        data: request
    }
    return options
}