export default interface Product {
    id: number,
    title: {
        uz: string,
        ru: string
    },
    category: {
        id: number,
        title: {
            uz: string,
            ru: string
        }
    },
    brands: {
        id: number,
        title: string,

    },
    price: string,
    price_old: string,
    rating: string,
    main_image: string | null,
    product_description?: {
        uz: string,
        ru: string, 
        oz: string
    }
}