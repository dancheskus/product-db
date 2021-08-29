import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'

import { RootState } from 'redux/store'
import Sidebar from 'components/Sidebar'
import Content from 'components/Content'

import { AppWrapper, Header } from './style'

export default function App() {
  const appData = useSelector((state: RootState) => state.appData)
  const { categories } = appData
  const categoryIds = Object.keys(categories)
  const [currentCategoryId, setCurrentCategoryId] = useState<string>(categoryIds[0])

  useEffect(() => {
    !categoryIds.includes(currentCategoryId) && setCurrentCategoryId(categoryIds[0])
  }, [categoryIds, currentCategoryId])

  return (
    <AppWrapper>
      <Header>
        <h1>Product DB</h1>
      </Header>

      <Sidebar currentCategoryId={currentCategoryId} setCurrentCategoryId={setCurrentCategoryId} />

      <Content currentCategoryId={currentCategoryId} />
    </AppWrapper>
  )
}
