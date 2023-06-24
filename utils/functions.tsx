import { REFERRAL_STATUS } from "./const";

export const nextStatusReferral = (status: string) => {
    switch (status) {
        case REFERRAL_STATUS.IN_PROCESS:
            return REFERRAL_STATUS.CONTACTED
        case REFERRAL_STATUS.CONTACTED:
            return REFERRAL_STATUS.RESERVED
        case REFERRAL_STATUS.RESERVED:
            return REFERRAL_STATUS.SIGNED_DEED
        case REFERRAL_STATUS.SIGNED_DEED:
            return REFERRAL_STATUS.ACCEPTED
        case REFERRAL_STATUS.ACCEPTED:
            return REFERRAL_STATUS.PAID
        case REFERRAL_STATUS.CANCELED:
            REFERRAL_STATUS.CANCELED
        default:
            break;
    }
}

export const messageNextStatusReferral = (status: string) => {
    switch (status) {
        case REFERRAL_STATUS.IN_PROCESS:
            return "Pasar estatus a contactado ?"
        case REFERRAL_STATUS.CONTACTED:
            return "Pasar estatus a reservado ?"
        case REFERRAL_STATUS.RESERVED:
            return "Pasar estatus a escritura firmada ?"
        case REFERRAL_STATUS.SIGNED_DEED:
            return "Pasar estatus a aceptado ?"
        case REFERRAL_STATUS.ACCEPTED:
            return "Pasar estatus a pagado ?"
        case REFERRAL_STATUS.CANCELED:
            return "Pasar estatus a cancelado ?"
        default:
            break;
    }
}

export const passvalidator = (password: string) => {
    let strong = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    console.log("strong : ", strong.test(password));
    
    return strong.test(password)
}

export const emailValidator = (email: string) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return email.match(reg)
}

export const dueDateElement = (date: string, days: number) => {
    const day = (1000 * 60 * 60 * 24)
    var externalDate = new Date(date)
    var currentDate = new Date()
    var timeDifference: number = currentDate.getTime() - externalDate.getTime()
    const daysDifference: number = timeDifference / day
    return daysDifference >= days ? true : false
}

export const getOrdinal = (value: number) => {
    let ordinal = ''
    switch (true) {
        case value === 1 || value === 3:
                ordinal = 'er'
            break
        case value === 2:
                ordinal = 'nda'
            break
        case value === 4 || value ===  5 || value === 6:
                ordinal = 'ta'
            break
        case value === 8 || value === 11 || value === 12 || value === 13 || value === 14 || value === 15 || value === 16 || value === 17 || value === 18 || value === 19 || value === 20:
                ordinal = 'va'
            break
        case value === 9:
                ordinal = 'na'
            break
        case value === 7 || value === 10:
                ordinal = 'ma'
            break
        case value > 20:
                ordinal = 'º'
            break
        default:
            break
    }
    return value + ordinal
}