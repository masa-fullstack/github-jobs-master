import locationSearch from '../../data/locationSearch.json'
import locationWeekly from '../../data/locationWeekly.json'
import consolidatedWeather from '../../data/consolidatedWeather.json'
import locationDay from '../../data/locationDay.json'
import { getCurrentPosition } from '../../lib/getCurrentPosition'
import compassData from '../../data/WindDirectionCompass.json'
import useSWR from 'swr'

export type LocationSearchData = typeof locationSearch
export type LocationWeeklyData = typeof locationWeekly
export type LocationDayData = typeof locationDay
export type Woeid = number
export type Compass = keyof typeof compassData
export type ConsolidatedWeather = typeof consolidatedWeather
export type CurrentLocation = {
  coords: {
    latitude: number
    longitude: number
  }
}

type UseWeather = (
  woeid?: Woeid
) => {
  locations: null | LocationSearchData
  locationWeekly: null | LocationWeeklyData
  error: any
}

const useWeather: UseWeather = (woeid) => {
  //現在地取得
  const { data: currentPosition, error: currentPositionError } = useSWR<
    CurrentLocation,
    any
  >('test', getCurrentPosition, {
    // windowのフォーカス時にRevalidateしないように設定
    revalidateOnFocus: false,
  })

  //現在地周辺のlocation取得
  const { data: locationSearchData, error: locationSearchError } = useSWR<
    LocationSearchData,
    any
  >(
    currentPosition
      ? `/api/search?lat=${currentPosition.coords.latitude}&long=${currentPosition.coords.longitude}`
      : null,
    {
      // windowのフォーカス時にRevalidateしないように設定
      revalidateOnFocus: false,
    }
  )

  //woeid指定がない場合は、現在地に一番近いlocationを設定
  let targetWoeid: Woeid
  if (woeid) {
    targetWoeid = woeid
  } else {
    targetWoeid = locationSearchData ? locationSearchData[0].woeid : null
  }

  //対象のwoeidの天気情報取得
  const { data: locationWeeklyData, error: locationWeeklyError } = useSWR<
    LocationWeeklyData,
    any
  >(targetWoeid ? `/api/location?targetWoeid=${targetWoeid}` : null, {
    // windowのフォーカス時にRevalidateしないように設定
    revalidateOnFocus: false,
  })

  return {
    locations: locationSearchData,
    locationWeekly: locationWeeklyData,
    error: currentPositionError ?? locationSearchError ?? locationWeeklyError,
  }
}

export default useWeather
