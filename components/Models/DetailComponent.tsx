import { Detail } from '../Models/Project'

export interface DetailComponent extends Detail{
    id: string,
    updateDetailInfo: (id: string) => void,
    deleteDetailInfo: (id: string) => void,
}