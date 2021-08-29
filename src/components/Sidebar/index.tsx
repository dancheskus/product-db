import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'react'

import { RootState } from 'redux/store'
import { addCategory, removeCategory } from 'redux/products'

import { CategoryButton, SidebarCategoryButton, SidebarCategoryButtonWrapper, SidebarWrapper } from './style'

interface IProps {
  currentCategoryId: string
  setCurrentCategoryId: Dispatch<React.SetStateAction<string>>
}

export default function Sidebar({ currentCategoryId, setCurrentCategoryId }: IProps) {
  const dispatch = useDispatch()
  const { categories } = useSelector((state: RootState) => state.appData)
  const categoryIds = Object.keys(categories)

  return (
    <SidebarWrapper>
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
          color='#3b3e45'
          onClick={() => {
            const newCategoryName = prompt('Input category name')
            if (!newCategoryName) return
            dispatch(addCategory(newCategoryName))
          }}
        >
          Add category
        </SidebarCategoryButton>

        <SidebarCategoryButton color='#505359' onClick={() => dispatch(removeCategory(currentCategoryId))}>
          Remove category
        </SidebarCategoryButton>
      </SidebarCategoryButtonWrapper>
    </SidebarWrapper>
  )
}
