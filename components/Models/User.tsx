import { Referral } from "./Referral";
import { Investment } from "./Investment";

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