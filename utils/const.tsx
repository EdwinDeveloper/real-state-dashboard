export const REFERRAL_STATUS = {
    WAITING: 'waiting',
    APPROVED: 'approved',
    REJECTED: 'rejected',
}
export type REFERRAL_STATUS = typeof REFERRAL_STATUS[keyof typeof REFERRAL_STATUS]

export const COLORS = {
    REFERRAL_ICON_WAITING: '#f4d859',
    REFERRAL_BACKGROUND_WAITING: '#fcf4ce',
    REFERRAL_ICON_APPROVED: '#114039',
    REFERRAL_BACKGROUND_APPROVED: '#a6b6b4',
    REFERRAL_ICON_REJECTED: '#D82A43',
    REFERRAL_BACKGROUND_REJECTED: '#FFA9B5',
}
export type COLORS = typeof COLORS[keyof typeof COLORS]