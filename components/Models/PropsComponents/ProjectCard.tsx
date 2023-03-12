import { Image } from '../../../redux/fetch/responses'

export interface ProjectCard {
    id: string,
    name: string,
    model: string,
    images: Image[],
    description: string,
    stateForm: (screen: string) => void,
}