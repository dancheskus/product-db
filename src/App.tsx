import { useDispatch, useSelector } from 'react-redux'

import { addBrand, addCategory, addProduct } from 'redux/products'
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
  const products = useSelector((state: RootState) => state.products)
  const keys = Object.keys(products)

  return (
    <div>
      {keys.map(categoryId => (
        <div key={categoryId}>
          <h1>{products[categoryId].name}</h1>

          <button
            type='button'
            style={{ background: 'orangered', color: 'white' }}
            onClick={() => {
              const newBrandName = prompt('Input brand name')
              if (!newBrandName) return
              dispatch(addBrand({ categoryId, brandName: newBrandName }))
            }}
          >
            Add brand
          </button>

          {products[categoryId].brands.map(({ name, products, id }) => (
            <div key={id}>
              <h3>{name}</h3>

              <button
                type='button'
                style={{ background: 'orangered', color: 'white' }}
                onClick={() => {
                  const newProductName = prompt('Input product name')
                  if (!newProductName) return
                  dispatch(addProduct({ categoryId, brandId: id, productName: newProductName }))
                }}
              >
                Add product
              </button>

              {products.map(({ name, id }) => (
                <h5 key={id}>{name}</h5>
              ))}
            </div>
          ))}
        </div>
      ))}

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
