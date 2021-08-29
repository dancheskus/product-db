import styled, { css } from 'styled-components'

export const ContentWrapper = styled.div`
  grid-area: content;
  display: grid;
  grid-template-areas:
    'brand json'
    'products json'
    'footer footer';
  grid-template-rows: min-content 1fr min-content;
  grid-template-columns: 1.5fr 1fr;
  overflow: auto;
`

export const BrandSelector = styled.div`
  grid-area: brand;
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  gap: 1rem;
  padding: 1rem;
`

export const BrandTab = styled.div<{ isActive?: boolean }>`
  ${({ isActive }) => css`
    padding: 1rem 1.5rem;
    border: 1px solid;
    border-radius: 5px;
    background: ${isActive ? '#636a79' : 'none'};
    color: ${isActive ? 'white' : 'black'};
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

export const ProductList = styled.div`
  grid-area: products;
  display: grid;
  gap: 1rem;
  align-content: start;
  padding: 1rem;
`
export const ProductItem = styled.div`
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

export const ProductItemButton = styled.button`
  background: #636a79;
  color: white;
  transition: 0.2s;

  :hover {
    filter: brightness(0.9);
  }
`

export const ContentFooter = styled.div`
  grid-area: footer;
  background: #434851;
  padding: 1.5rem 2rem;
`

export const FooterButton = styled.button`
  ${({ disabled }) => css`
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: 0.2s;
    background: ${disabled ? '#778092' : '#636a79'};
    color: ${disabled ? '#969696' : 'white'};

    :not(:last-child) {
      margin-right: 2rem;
    }

    ${!disabled &&
    css`
      :hover {
        filter: brightness(0.9);
      }
    `}
  `}
`
