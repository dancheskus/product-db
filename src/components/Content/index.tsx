import ReactJson from 'react-json-view'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import responseData from 'responseData.json'
import { addBrand, addProduct, removeBrand, removeProduct, setNewState } from 'redux/products'
import { RootState } from 'redux/store'
import normalizeData from 'redux/normalizeData'

import {
  ContentWrapper,
  BrandSelector,
  BrandTab,
  ProductList,
  ProductItem,
  ProductItemButton,
  ContentFooter,
  FooterButton,
} from './style'

interface IProps {
  currentCategoryId: string
}

export default function Content({ currentCategoryId }: IProps) {
  const dispatch = useDispatch()
  const appData = useSelector((state: RootState) => state.appData)
  const { brands, products, categories } = appData
  const currentCategory = categories[currentCategoryId]
  const currentBrandIds = currentCategory?.brandIds
  const [currentBrandId, setCurrentBrandId] = useState<string | null>(currentBrandIds?.[0])
  const currentProductIds = currentBrandId && brands[currentBrandId]?.productIds

  useEffect(() => {
    currentBrandIds && setCurrentBrandId(currentBrandIds[0])
  }, [currentBrandIds])

  return Object.keys(categories).length ? (
    <ContentWrapper>
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
              <div>{products[id].name}</div>
              <ProductItemButton onClick={() => dispatch(removeProduct(id))}>Remove</ProductItemButton>
            </ProductItem>
          ))}
      </ProductList>

      <ReactJson
        theme='monokai'
        enableClipboard={false}
        displayObjectSize={false}
        displayDataTypes={false}
        style={{ fontSize: '1.4rem', gridArea: 'json', overflow: 'auto' }}
        name='Current Redux State'
        src={appData}
      />

      <ContentFooter>
        <FooterButton
          disabled={!currentBrandIds?.length}
          onClick={() => {
            const newProductName = prompt('Input product name')
            if (!newProductName) return
            currentBrandId && dispatch(addProduct({ brandId: currentBrandId, productName: newProductName }))
          }}
        >
          Add Product
        </FooterButton>

        <FooterButton onClick={() => dispatch(setNewState(normalizeData(responseData)))}>
          Load Original State
        </FooterButton>
      </ContentFooter>
    </ContentWrapper>
  ) : (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <div>Add first category</div>
      <div style={{ padding: '2rem 0' }}>OR</div>
      <div
        style={{ border: '1px solid', borderRadius: '5px', padding: '1rem 1.5rem', cursor: 'pointer' }}
        onClick={() => dispatch(setNewState(normalizeData(responseData)))}
      >
        Load Original State
      </div>
    </div>
  )
}
