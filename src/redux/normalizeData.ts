import { INewBrand, INewCategory, INewProduct, IResponseData } from './types'

export default (data: IResponseData) => {
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
