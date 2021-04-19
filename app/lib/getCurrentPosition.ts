import { CurrentLocation } from '../components/hooks/useWeather'

export const getCurrentPosition = () => {
  return new Promise(
    (
      resolve: (value?: CurrentLocation) => void,
      reject: (reason?: any) => void
    ) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    }
  )
}
