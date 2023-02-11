import { FetchConfig } from '../../components/Models/FetchConfig'
import call from './call'

const url_base = "http://127.0.0.1:8000"
//const url_base = "http://ec2-3-145-15-251.us-east-2.compute.amazonaws.com"

export function setup(request, token){
    return call({
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'access-control-allow-origin':  '*'
        },
        url: `${url_base}/api/user/create/`,
        data: request
    })
}

export function logIn(request, token){
    return call({
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `${url_base}/api/user/token/`,
        data: request
    })
}

export function meInfo(request, token){
    return call({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/user/me/`
    })
}

export function createReferral(request, token){
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

export function createProject(request, token){
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

export function updateProject(request, token, id){
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

export function createInvestment(request, token, id_user){
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

export function updateReferral(request, token, id_referral){
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

export function getCommissions(request, token) {
    return call({
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        url: `${url_base}/api/company/commission/`
    })
}

export function createCommission(request, token) {
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

export function updateCommission(request, token, id_commission){
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