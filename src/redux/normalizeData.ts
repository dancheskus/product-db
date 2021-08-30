import { v4 as uuidv4 } from 'uuid'

import { INewBrand, INewCategory, INewProduct, IResponseData } from './types'

export default (data: IResponseData) => {
  const newCategories: INewCategory = {}
  const newBrands: INewBrand = {}
  const newProducts: INewProduct = {}

  data.categories.forEach(({ id: originalCategoryId, name, brands }) => {
    const categoryId = uuidv4()
    newCategories[categoryId] = {
      originalCategoryId,
      name,
      brandIds: brands.map(({ id: originalBrandId, name, products }) => {
        const brandId = uuidv4()
        newBrands[brandId] = {
          originalBrandId,
          name,
          productIds: products.map(({ id: originalProductId, name }) => {
            const productId = uuidv4()
            newProducts[productId] = { originalProductId, name, brandId }

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
