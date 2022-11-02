export interface User {
    name?: string
    email?: string
    password?: string
    type?: string
}

export interface Product {
    name?: string
    color?: [] | any,
    seller_id: string,
    date?: number
}

export interface Cart {
    user_id?: string,
    color?: string
    product_id?: string,
    total?: number,
    date?: number
}