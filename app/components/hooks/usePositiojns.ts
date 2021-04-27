import positionsData from '../../data/positions.json'
import useSWR from 'swr'
import { SearchState } from './searchContext'

export type PositionsData = typeof positionsData

type UsePositions = (
  searchState: SearchState
) => {
  positions: null | PositionsData
  error: any
}

const usePositions: UsePositions = (searchState) => {
  let param = '?'
  param += searchState.description
    ? `&description=${searchState.description}`
    : ''
  param += searchState.isFullTime ? `&full_time=true` : ''
  param +=
    searchState.locationText || searchState.locationRadio
      ? `&location=${searchState.locationText}+${searchState.locationRadio}`
      : ''

  const { data: positions, error } = useSWR<PositionsData, any>(
    `/api/positions${param}`,
    {
      // windowのフォーカス時にRevalidateしないように設定
      revalidateOnFocus: false,
    }
  )

  return {
    positions,
    error,
  }
}

export default usePositions
