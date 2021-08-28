import { useDispatch, useSelector } from 'react-redux'

import { addBrand, addCategory, addProduct, removeBrand, removeCategory, removeProduct } from 'redux/products'
import { RootState } from 'redux/store'
import GlobalStyle from 'style/GlobalStyle'

export default function App() {
  return (
    <>
      <GlobalStyle />

      <Test />
    </>
  )
}

function Test() {
  const dispatch = useDispatch()
  const { brands, categories, products } = useSelector((state: RootState) => state.appData)

  return (
    <div>
      {Object.keys(categories).map(categoryId => {
        const { name: categoryName, brandIds } = categories[categoryId]

        return (
          <div key={categoryId}>
            <h1 onClick={() => dispatch(removeCategory(categoryId))}>{categoryName}</h1>

            <button
              type='button'
              style={{ background: 'lightgray' }}
              onClick={() => {
                const newBrandName = prompt('Input brand name')
                if (!newBrandName) return
                dispatch(addBrand({ categoryId, brandName: newBrandName }))
              }}
            >
              Add brand
            </button>

            {brandIds.map(brandId => {
              const { name: brandName, productIds } = brands[brandId]

              return (
                <div key={brandId}>
                  <h3 onClick={() => dispatch(removeBrand(brandId))}>{brandName}</h3>

                  <button
                    type='button'
                    style={{ background: 'orangered', color: 'white' }}
                    onClick={() => {
                      const newProductName = prompt('Input product name')
                      if (!newProductName) return
                      dispatch(addProduct({ brandId, productName: newProductName }))
                    }}
                  >
                    Add product
                  </button>

                  {productIds.map(productId => {
                    const { name: productName } = products[productId]

                    return (
                      <h5 key={productId} onClick={() => dispatch(removeProduct(productId))}>
                        {productName}
                      </h5>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      })}

      <div style={{ marginTop: '4rem' }} />

      <button
        type='button'
        style={{ background: 'lightgreen' }}
        onClick={() => {
          const newCategoryName = prompt('Input category name')
          if (!newCategoryName) return
          dispatch(addCategory(newCategoryName))
        }}
      >
        Add category
      </button>
    </div>
  )
}
