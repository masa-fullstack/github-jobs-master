import differenceInDays from 'date-fns/differenceInDays'

type GetBeforeDays = (date: string) => { days: number }

export const getBeforeDays: GetBeforeDays = (date) => {
  const dateLeft = new Date()
  const dateRight = new Date(date)
  const days = differenceInDays(dateLeft, dateRight)

  return { days }
}
