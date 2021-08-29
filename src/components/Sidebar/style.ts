import styled, { css } from 'styled-components'

export const SidebarWrapper = styled.div`
  grid-area: side;
  border-right: 1px solid;
  display: grid;
  grid-template-rows: 1fr min-content;
  background: #a9afbc;
`

export const SidebarCategoryButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
export const SidebarCategoryButton = styled.button<{ color: string }>`
  ${({ color }) => css`
    background: ${color};
    padding: 2rem;
    display: grid;
    place-items: center;
    transition: 0.2s;
    color: white;

    :hover {
      filter: brightness(0.9);
    }
  `}
`

export const CategoryButton = styled.button<{ isActive: boolean }>`
  ${({ isActive }) => css`
    background: ${isActive ? '#636a79' : '#505359'};
    padding: 2rem;
    transition: 0.2s;
    width: 100%;
    text-align: left;
    word-break: break-word;
    color: white;

    :not(:last-child) {
      border-bottom: 1px solid #5f646d;
    }

    ${!isActive &&
    css`
      :hover {
        background: #595f6e;
      }
    `}
  `}
`
