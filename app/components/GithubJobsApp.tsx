import { Dispatch, SetStateAction } from 'react'
import List from './List'
import SearchOption from './SearchOption'
import SearchTop from './SearchTop'

//ページ表示件数の設定
export const PAGE_SIZE = 5
export const MAX_PAGE = 10

export type SearchList = [
  {
    description: string
    isFullTime: boolean
    locationRadio: string
    locationText: string
  }
]
export type SetSearchList = Dispatch<SetStateAction<SearchList>>

const GithubJobsApp: React.FC = () => {
  // const [searchList, setSearchList] = useState<SearchList>()

  return (
    <div className="h-full grid md:grid-cols-10 grid-cols-1 gap-2">
      <div className="md:col-span-10 col-span-1">
        <SearchTop />
      </div>
      <div className="md:col-span-3 col-span-1">
        <SearchOption />
      </div>
      <div className="md:col-span-7 col-span-1">
        <List />
      </div>
    </div>
  )
}

export default GithubJobsApp
