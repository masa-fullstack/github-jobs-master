import { memo, Dispatch, SetStateAction } from 'react'
import usePositions from './hooks/usePositiojns'
import Card from './molecules/Card'
import PaginationRounded from './molecules/PaginationRounded'
import { PAGE_SIZE } from './GithubJobsApp'
import { useSearchStore } from './hooks/searchContext'
import Link from 'next/link'
import { usePageStore } from './hooks/pageContext'

export type SetPage = Dispatch<SetStateAction<number>>

const List: React.FC = () => {
  const searchState = useSearchStore()
  const { positions, error } = usePositions(searchState)
  const pageState = usePageStore()

  if (error)
    return (
      <div className="text-red-500 text-3xl font-light text-center pt-20 h-screen">
        failed to load
      </div>
    )

  if (!positions)
    return (
      <div className="text-black text-3xl font-light text-center pt-20 h-screen">
        loading...
      </div>
    )

  if (positions.length === 0)
    return (
      <div className="text-black text-3xl font-light text-center pt-20 h-screen">
        NO DATA FOUND
      </div>
    )

  const maxPage = Math.floor((positions.length - 1) / PAGE_SIZE) + 1

  const startItemIndex = PAGE_SIZE * (pageState.page - 1)
  const endItemIndex = PAGE_SIZE * pageState.page

  return (
    <>
      <div className="p-4">
        {positions.slice(startItemIndex, endItemIndex).map((position) => {
          return (
            <Link key={position.id} href={`/positions/${position.id}`}>
              <div className="mb-5 cursor-pointer">
                <Card position={position} />
              </div>
            </Link>
          )
        })}
      </div>
      <div className="flex justify-end mb-2">
        <PaginationRounded maxPage={maxPage} />
      </div>
    </>
  )
}

export default memo(List)
