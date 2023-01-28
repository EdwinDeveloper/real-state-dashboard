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
    extras: Extra[],
    commission: string,
    company_related: string,
}
export interface Image {
    id: string,
    url: string,
    title: string,
}
export interface Detail {
    id: string,
    key: string,
    info: string,
}
export interface Extra {
    id: string,
    key: string,
    info: string,
}