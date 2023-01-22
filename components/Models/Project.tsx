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
interface Image {
    url: string,
}
interface Detail {
    key: string,
    info: string,
}
interface Extras {
    key: string,
    info: string,
}