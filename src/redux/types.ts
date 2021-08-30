interface IProduct {
  id: number
  name: string
}
interface IBrand {
  id: number
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
    originalCategoryId?: string
    name: string
    brandIds: string[]
  }
}
export interface INewBrand {
  [key: string]: {
    originalBrandId?: number
    name: string
    productIds: string[]
    categoryId: string
  }
}
export interface INewProduct {
  [key: string]: {
    originalProductId?: number
    name: string
    brandId: string
  }
}
