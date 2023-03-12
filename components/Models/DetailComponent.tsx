import { Detail } from '../../redux/fetch/responses'

export interface DetailComponent extends Detail{
    id: string,
    updateDetailInfo: (id: string) => void,
    deleteDetailInfo: (id: string) => void,
}