export interface Project {
    id: string,
    name: string,
    model: string,
    description: string,
    pre_sale_price: number,
    pre_sale_date: string,
    premises_delivery_date: string,
    rent_price_approximate: number,
    resale_price_approximate: number,
    images: Image[],
    details: Detail[],
    extras: Extras[],
    commission: string,
    company_related: string,
}
export interface Image {
    url: string,
}
export interface Detail {
    key?: string,
    info: string,
}
export interface Extras {
    key: string,
    info: string,
}