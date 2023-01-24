export interface ProjectCard {
    id: string,
    name: string,
    description: string,
    stateForm: (screen: string) => void,
}