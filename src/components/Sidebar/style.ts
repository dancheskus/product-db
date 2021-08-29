import styled, { css } from 'styled-components'

export const SidebarWrapper = styled.div`
  grid-area: side;
  border-right: 1px solid;
  display: grid;
  grid-template-rows: 1fr min-content;
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

    :hover {
      filter: brightness(0.9);
    }
  `}
`

export const CategoryButton = styled.button<{ isActive: boolean }>`
  ${({ isActive }) => css`
    background: ${isActive ? 'green' : 'orangered'};
    padding: 2rem;
    transition: 0.2s;
    width: 100%;
    text-align: left;
    word-break: break-word;

    :not(:last-child) {
      border-bottom: 1px solid;
    }

    ${!isActive &&
    css`
      :hover {
        background: red;
      }
    `}
  `}
`
