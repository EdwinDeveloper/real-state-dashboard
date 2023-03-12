import { Extra } from "../../redux/fetch/responses";

export interface ExtraComponent extends Extra {
    id: string,
    updateExtraInfo: (id: string) => void,
    deleteExtraInfo: (id: string) => void,
}