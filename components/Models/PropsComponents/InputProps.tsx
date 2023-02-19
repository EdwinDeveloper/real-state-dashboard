import { Project } from "../Project"
import { Commission } from '../Commission'
import { Companie } from "../Companie"
import dayjs, { Dayjs } from 'dayjs'

export interface InputProps {
    ref: any,
    name: string,
    setName: (name: string) => void,
    model: string,
    setModel: (model: string) => void,
    preSalePrice: string,
    setPreSalePrice: (preSalePrice: string) => void,
    rentPriceApproximate: string,
    setRentPriceApproximate: (rentPriceApproximate: string) => void,
    resalePriceApproximate: string,
    setResalePriceApproximate: (resalePriceApproximate: string) => void,
    preSaleDate: string,
    setPreSaleDate: (preSaleDate: string) => void,
    premisesDeliveryDate: string,
    setPremisesDeliveryDate: (premisesDeliveryDate: string) => void,
    description: string,
    setDescription: (description: string) => void,
    idCommission: string,
    setIdCommission: (idCommission: string) => void,
    idCompany: string,
    setIdCompany: (idCompany: string) => void,
    commissions: Commission[],
    companies: Companie[],
}