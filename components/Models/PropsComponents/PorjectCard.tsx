import { Image } from '../../Models/Project'

export interface ProjectCard {
    id: string,
    name: string,
    images: Image[],
    description: string,
    stateForm: (screen: string) => void,
}