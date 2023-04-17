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