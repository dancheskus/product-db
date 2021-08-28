import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { useState } from 'react'
import { useEffect } from 'react'

import { addBrand, addCategory, addProduct, removeBrand, removeCategory, removeProduct } from 'redux/products'
import { RootState } from 'redux/store'

const AppWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 8rem 1fr;
  grid-template-columns: 20rem 1fr;
  grid-template-areas:
    'header header'
    'side content';
`

const Header = styled.header`
  grid-area: header;
  background: lightcoral;
  padding: 1rem;
  display: flex;
  align-items: center;
`

const Sidebar = styled.div`
  grid-area: side;
  border-right: 1px solid;
  display: grid;
  grid-template-rows: 1fr min-content;
`

const Content = styled.div`
  grid-area: content;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
`

const CategoryButton = styled.button<{ isActive: boolean }>`
  ${({ isActive }) => css`
    background: ${isActive ? 'green' : 'orangered'};
    padding: 2rem;
    transition: 0.2s;
    width: 100%;
    text-align: left;

    ${!isActive &&
    css`
      :hover {
        background: red;
      }
    `}
  `}
`

const BrandSelector = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  gap: 1rem;
  padding: 1rem;
`

const BrandTab = styled.div<{ isActive?: boolean }>`
  ${({ isActive }) => css`
    padding: 0.5rem 1rem;
    border: 1px solid;
    border-radius: 5px;
    background: ${isActive ? 'lightgray' : 'none'};
    transition: 0.2s;
    cursor: pointer;

    ${!isActive &&
    css`
      :hover {
        background: #dddddd;
      }
    `}
  `}
`

const ProductList = styled.div`
  display: grid;
  gap: 1rem;
  align-content: start;
  padding: 0 1rem 1rem 1rem;
`
const ProductItem = styled.div`
  height: 5rem;
  width: 40rem;
  display: flex;
  justify-content: space-between;
  border: 1px solid;
  border-radius: 5px;

  > * {
    padding: 1rem;
    display: flex;
    align-items: center;
  }
`
const ProductItemTitle = styled.div``
const ProductItemButton = styled.button`
  background: red;
  color: white;
  transition: 0.2s;

  :hover {
    filter: brightness(0.9);
  }
`

const ContentFooter = styled.div`
  background: gray;
  padding: 1.5rem 1rem;
`

const AddProduct = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: 0.2s;

  :hover {
    filter: brightness(0.9);
  }
`

const SidebarCategoryButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
const SidebarCategoryButton = styled.button<{ color: string }>`
  ${({ color }) => css`
    background: ${color};
    padding: 2rem 0;
    font-size: 5rem;
    display: grid;
    place-items: center;
    transition: 0.2s;

    :hover {
      filter: brightness(0.9);
    }
  `}
`

export default function App() {
  const dispatch = useDispatch()
  const { brands, categories, products } = useSelector((state: RootState) => state.appData)
  const categoryIds = Object.keys(categories)
  const [currentCategoryId, setCurrentCategoryId] = useState<string>(categoryIds[0])
  const currentCategory = categories[currentCategoryId]
  const currentBrandIds = currentCategory?.brandIds
  const [currentBrandId, setCurrentBrandId] = useState<string | null>(currentBrandIds?.[0])
  const currentProductIds = currentBrandId && brands[currentBrandId]?.productIds

  useEffect(() => {
    currentBrandIds && setCurrentBrandId(currentBrandIds[0])
  }, [currentBrandIds])

  useEffect(() => {
    !categoryIds.includes(currentCategoryId) && setCurrentCategoryId(categoryIds[0])
  }, [categoryIds, currentCategoryId])

  return (
    <AppWrapper>
      <Header>
        <h1>Product DB</h1>
      </Header>

      <Sidebar>
        <div>
          {categoryIds.map(categoryId => {
            const { name: categoryName } = categories[categoryId]

            return (
              <CategoryButton
                key={categoryId}
                isActive={categoryId === currentCategoryId}
                onClick={() => setCurrentCategoryId(categoryId)}
              >
                {categoryName}
              </CategoryButton>
            )
          })}
        </div>

        <SidebarCategoryButtonWrapper>
          <SidebarCategoryButton
            color='green'
            onClick={() => {
              const newCategoryName = prompt('Input category name')
              if (!newCategoryName) return
              dispatch(addCategory(newCategoryName))
            }}
          >
            +
          </SidebarCategoryButton>

          <SidebarCategoryButton color='red' onClick={() => dispatch(removeCategory(currentCategoryId))}>
            -
          </SidebarCategoryButton>
        </SidebarCategoryButtonWrapper>
      </Sidebar>

      <Content>
        <BrandSelector>
          {currentBrandIds &&
            currentBrandIds.map(id => (
              <BrandTab key={id} isActive={id === currentBrandId} onClick={() => setCurrentBrandId(id)}>
                {brands[id].name}
              </BrandTab>
            ))}

          <BrandTab
            onClick={() => {
              const newBrandName = prompt('Input brand name')
              if (!newBrandName) return
              dispatch(addBrand({ categoryId: currentCategoryId, brandName: newBrandName }))
            }}
          >
            +
          </BrandTab>

          <BrandTab onClick={() => currentBrandId && dispatch(removeBrand(currentBrandId))}>-</BrandTab>
        </BrandSelector>

        <ProductList>
          {currentProductIds &&
            currentProductIds.map(id => (
              <ProductItem key={id}>
                <ProductItemTitle>{products[id].name}</ProductItemTitle>
                <ProductItemButton onClick={() => dispatch(removeProduct(id))}>Remove</ProductItemButton>
              </ProductItem>
            ))}
        </ProductList>

        <ContentFooter>
          <AddProduct
            onClick={() => {
              const newProductName = prompt('Input product name')
              if (!newProductName) return
              currentBrandId && dispatch(addProduct({ brandId: currentBrandId, productName: newProductName }))
            }}
          >
            Add Product
          </AddProduct>
        </ContentFooter>
      </Content>

      {/* <Content>
        {categoryIds.map(categoryId => {
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
      </Content> */}
    </AppWrapper>
  )
}
