import { getBeforeDays } from '../../lib/getBeforeDays'

type Props = {
  stringDate: string
}

const DaysIcon: React.FC<Props> = (props) => {
  const { days } = getBeforeDays(props.stringDate)
  return (
    <div className="flex items-center text-gray-400 text-xs">
      <span className="material-icons">schedule</span>
      {days === 0 ? 'Today' : `${days} days ago`}
    </div>
  )
}

export default DaysIcon
