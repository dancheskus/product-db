import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

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

const initialState: IProductState = {
  '57b42bfe31b6f0132cb96836': {
    name: 'Mobile phones',
    brands: [
      {
        id: 1,
        name: 'Samsung',
        products: [
          { id: 12345, name: 'Galaxy S4' },
          { id: 23456, name: 'Galaxy S5' },
          { id: 34567, name: 'Galaxy S6' },
        ],
      },
      {
        id: 2,
        name: 'Sony',
        products: [
          { id: 45678, name: 'XPeria Z3' },
          { id: 56789, name: 'XPeria Z5' },
          { id: 67890, name: 'Vegas' },
        ],
      },
      {
        id: 3,
        name: 'Huawei',
        products: [
          { id: 44444, name: 'Honor 7' },
          { id: 55555, name: 'P8' },
          { id: 66666, name: 'P9' },
        ],
      },
      {
        id: 4,
        name: 'Apple',
        products: [
          { id: 12222, name: 'IPhone 5S' },
          { id: 23333, name: 'IPhone 6S' },
        ],
      },
      {
        id: 5,
        name: 'Microsoft',
        products: [
          { id: 543534, name: 'Lumia 650' },
          { id: 456457, name: 'Lumia 630' },
          { id: 7564534, name: 'Lumia 640 XL' },
        ],
      },
    ],
  },
  '57b42bfe7e7298611b333652': {
    name: 'Computers',
    brands: [
      { id: 1, name: 'Samsung', products: [] },
      { id: 2, name: 'Sony', products: [{ id: 7564534, name: 'Sony Vaio' }] },
      {
        id: 3,
        name: 'Apple',
        products: [
          { id: 7560001, name: 'MacBook Pro' },
          { id: 665451, name: 'MacBook Air' },
        ],
      },
      { id: 4, name: 'Microsoft', products: [] },
    ],
  },
  '57b42bfe250111078dadcd03': {
    name: 'Cameras',
    brands: [{ id: 1, name: 'Canon', products: [{ id: 345611, name: 'EOS 1000D' }] }],
  },
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addCategory: (state, { payload }: PayloadAction<string>) => {
      const newCategoryId = uuidv4()
      state[newCategoryId] = { name: payload, brands: [] }
    },
    removeCategory: () => {},
    addBrand: (
      state,
      { payload: { categoryId, brandName } }: PayloadAction<{ categoryId: string; brandName: string }>,
    ) => {
      const newBrandId = uuidv4()
      state[categoryId].brands.push({ id: newBrandId, name: brandName, products: [] })
    },
    removeBrand: () => {},
    addProduct: (
      state,
      {
        payload: { categoryId, brandId, productName },
      }: PayloadAction<{ categoryId: string; brandId: string | number; productName: string }>,
    ) => {
      const newProductId = uuidv4()
      const brands = state[categoryId].brands
      const index = brands.findIndex(({ id }) => id === brandId)
      brands[index].products.push({ id: newProductId, name: productName })
    },
    removeProduct: () => {},
  },
})

export const { addCategory, removeCategory, addBrand, removeBrand, addProduct, removeProduct } = productsSlice.actions

export default productsSlice.reducer
