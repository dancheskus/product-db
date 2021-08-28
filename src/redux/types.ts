interface IProduct {
  id: string
  name: string
}
interface IBrand {
  id: string
  name: string
  products: IProduct[]
}

interface ICategory {
  id: string
  name: string
  brands: IBrand[]
}
export interface IResponseData {
  categories: ICategory[]
}

export interface INewCategory {
  [key: string]: {
    name: string
    brandIds: string[]
  }
}
export interface INewBrand {
  [key: string]: {
    name: string
    productIds: string[]
    categoryId: string
  }
}
export interface INewProduct {
  [key: string]: {
    name: string
    brandId: string
  }
}
