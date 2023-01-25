import { Extra } from "./Project";

export interface ExtraComponent extends Extra {
    id: string,
    updateExtraInfo: (id: string) => void,
    deleteExtraInfo: (id: string) => void,
}