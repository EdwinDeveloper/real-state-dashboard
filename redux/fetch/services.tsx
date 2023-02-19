import { FetchConfig } from '../../components/Models/FetchConfig'
import call from './call2'
import { Settings } from '../../components/Models/Fetch/Settings'

//const url_base = "http://localhost:8000"
//const url_base = "http://ec2-3-145-15-251.us-east-2.compute.amazonaws.com"
const url_base = "http://143.198.63.104:8000"

export function setup(request: any, token: string) {
    let settings: Settings = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `${url_base}/api/user/create/`,
        data: request
    }
    return call(settings)
}

export function logIn(request: any, token: string){
    return call({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `${url_base}/api/user/token/`,
        data: request
    })
}

export function meInfo(request: any, token: string){
    let settings: Settings = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/user/me/`,
        data: {}
    }
    return call(settings)
}

export function createReferral(request: any, token: string){
    return call({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/referral/`,
        data: request
    })
}

export function createProject(request: any, token: string){
    return call({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/projects/`,
        data: request
    })
}

export function updateProject(request: any, token: string, id: string){
    return call({
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/projects/${id}`,
        data: request
    })
}

export function createInvestment(request: any, token: string, id_user: string){
    return call({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/user/set/${id_user}/set-investment/`,
        data: request
    })
}

export function updateReferral(request: any, token: string, id_referral: string){
    return call({
        method: 'patch',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/referral/${id_referral}/`,
        data: request
    })
}

export function getCommissions(request: any, token: string) {
    return call({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/commission/`,
        data: {}
    })
}

export function createCommission(request: any, token: string) {
    return call({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/commission/`,
        data: request
    })
}

export function updateCommission(request: any, token: string, id_commission: string) {
    return call({
        method: 'patch',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/commission/${id_commission}/`,
        data: request
    })
}

export function getCompanies(request: any, token: string) {
    return call({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/companies/`,
        data: {}
    })
}

export function createCompany(request: any, token: string) {
    return call({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/companies/`,
        data: request
    })
}

export function updateCompany(request: any, token: string, id_company: string) {
    return call({
        method: 'patch',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/companies/${id_company}/`,
        data: request
    })
}