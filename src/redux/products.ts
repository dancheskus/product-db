import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import responseData from 'responseData.json'

import normalizeData from './normalizeData'

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
      // removing nested brands and products
      state.categories[categoryId].brandIds.forEach(brandId => {
        state.brands[brandId].productIds.forEach(productId => {
          delete state.products[productId]
        })

        delete state.brands[brandId]
      })

      // removing category
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
      const { categoryId, productIds } = state.brands[brandId]
      delete state.brands[brandId]

      const { brandIds } = state.categories[categoryId]
      const brandIndex = brandIds.findIndex(id => id === brandId)
      brandIds.splice(brandIndex, 1)

      // removing nested products
      productIds.forEach(productId => {
        delete state.products[productId]
      })
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
