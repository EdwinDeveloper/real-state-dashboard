import { Project } from "../Project"
import { Commission } from '../Commission'
import { Companie } from "../Companie"

export interface InputProps {
    project: Project,
    commission: Commission[],
    companies: Companie[],
}