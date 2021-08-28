import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import { INewBrand, INewCategory, INewProduct, IResponseData } from './types'

const responseData: IResponseData = {
  categories: [
    {
      id: '57b42bfe31b6f0132cb96836',
      name: 'Mobile phones',
      brands: [
        {
          id: '4af05058-a2d3-4dd0-b070-55c039367c70',
          name: 'Samsung',
          products: [
            {
              id: '12345',
              name: 'Galaxy S4',
            },
            {
              id: '23456',
              name: 'Galaxy S5',
            },
            {
              id: '34567',
              name: 'Galaxy S6',
            },
          ],
        },
        {
          id: '157b086b-c1ff-456d-b0f4-8a68ed8af483',
          name: 'Sony',
          products: [
            {
              id: '45678',
              name: 'XPeria Z3',
            },
            {
              id: '56789',
              name: 'XPeria Z5',
            },
            {
              id: '67890',
              name: 'Vegas',
            },
          ],
        },
        {
          id: '7e00bb3e-4969-4c60-b801-1c68d652b95a',
          name: 'Huawei',
          products: [
            {
              id: '44444',
              name: 'Honor 7',
            },
            {
              id: '55555',
              name: 'P8',
            },
            {
              id: '66666',
              name: 'P9',
            },
          ],
        },
        {
          id: 'c0203c08-7876-4675-b75b-9264ff5e6fb9',
          name: 'Apple',
          products: [
            {
              id: '12222',
              name: 'IPhone 5S',
            },
            {
              id: '23333',
              name: 'IPhone 6S',
            },
          ],
        },
        {
          id: '728e30a1-b03b-43ed-a30e-a5453a6b03db',
          name: 'Microsoft',
          products: [
            {
              id: '543534',
              name: 'Lumia 650',
            },
            {
              id: '456457',
              name: 'Lumia 630',
            },
            {
              id: '7564534',
              name: 'Lumia 640 XL',
            },
          ],
        },
      ],
    },
    {
      id: '57b42bfe7e7298611b333652',
      name: 'Computers',
      brands: [
        {
          id: '5dfedf97-7ccf-42af-9bf2-0b3d4796e2a4',
          name: 'Samsung',
          products: [],
        },
        {
          id: 'f6405649-325e-43a9-a8bc-17c26e35811e',
          name: 'Sony',
          products: [
            {
              id: '7564534',
              name: 'Sony Vaio',
            },
          ],
        },
        {
          id: 'f07de320-17da-4170-bce1-364926732d57',
          name: 'Apple',
          products: [
            {
              id: '7560001',
              name: 'MacBook Pro',
            },
            {
              id: '665451',
              name: 'MacBook Air',
            },
          ],
        },
        {
          id: 'e0677337-3b64-40dc-ac8c-17d615fd9bfc',
          name: 'Microsoft',
          products: [],
        },
      ],
    },
    {
      id: '57b42bfe250111078dadcd03',
      name: 'Cameras',
      brands: [
        {
          id: '31c4939d-8b5e-4d56-b036-80b8b0a9dc4a',
          name: 'Canon',
          products: [
            {
              id: '345611',
              name: 'EOS 1000D',
            },
          ],
        },
      ],
    },
  ],
}

const normalizeData = (data: IResponseData) => {
  const newCategories: INewCategory = {}
  const newBrands: INewBrand = {}
  const newProducts: INewProduct = {}

  data.categories.forEach(({ id: categoryId, name, brands }) => {
    newCategories[categoryId] = {
      name,
      brandIds: brands.map(({ id: brandId, name, products }) => {
        newBrands[brandId] = {
          name,
          productIds: products.map(({ id: productId, name }) => {
            newProducts[productId] = { name, brandId }

            return productId
          }),
          categoryId,
        }

        return brandId
      }),
    }
  })

  return { categories: newCategories, brands: newBrands, products: newProducts }
}

const initialState: ReturnType<typeof normalizeData> = normalizeData(responseData)

export const appDataSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    addCategory: (state, { payload: categoryName }: PayloadAction<string>) => {
      const newCategoryId = uuidv4()
      state.categories[newCategoryId] = { name: categoryName, brandIds: [] }
    },
    removeCategory: (state, { payload: categoryId }: PayloadAction<string>) => {
      delete state.categories[categoryId]
    },
    addBrand: (
      state,
      { payload: { categoryId, brandName } }: PayloadAction<{ categoryId: string; brandName: string }>,
    ) => {
      const newBrandId = uuidv4()
      state.categories[categoryId].brandIds.push(newBrandId)
      state.brands[newBrandId] = { name: brandName, productIds: [], categoryId }
    },
    removeBrand: (state, { payload: brandId }: PayloadAction<string>) => {
      const { categoryId } = state.brands[brandId]
      delete state.brands[brandId]

      const { brandIds } = state.categories[categoryId]
      const index = brandIds.findIndex(id => id === brandId)
      brandIds.splice(index, 1)
    },
    addProduct: (
      state,
      { payload: { brandId, productName } }: PayloadAction<{ brandId: string; productName: string }>,
    ) => {
      const newProductId = uuidv4()
      state.brands[brandId].productIds.push(newProductId)
      state.products[newProductId] = { name: productName, brandId }
    },
    removeProduct: (state, { payload: productId }: PayloadAction<string>) => {
      const { brandId } = state.products[productId]
      delete state.products[productId]

      const { productIds } = state.brands[brandId]
      const index = productIds.findIndex(id => id === productId)
      productIds.splice(index, 1)
    },
  },
})

export const { addCategory, removeCategory, addBrand, removeBrand, addProduct, removeProduct } = appDataSlice.actions

export default appDataSlice.reducer
