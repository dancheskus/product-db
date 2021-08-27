interface IProduct {
  id: string | number
  name: string
}

interface IBrand {
  id: string | number
  name: string
  products: IProduct[]
}

interface ICategory {
  name: string
  brands: IBrand[]
}

export interface IProductState {
  [key: string]: ICategory
}