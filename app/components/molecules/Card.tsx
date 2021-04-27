import FullTimeIcon from '../atoms/FullTimeIcon'
import Icon from '../atoms/Icon'
import { PositionsData } from '../hooks/usePositiojns'
import DaysIcon from '../atoms/DaysIcon'
import LocationIcon from '../atoms/LocationIcon'

type Props = {
  position: PositionsData[number]
}

const Card: React.FC<Props> = (props) => {
  return (
    <>
      <div className="flex bg-white rounded-lg shadow p-3">
        <div>
          <Icon src={props.position.company_logo} />
        </div>

        <div className="ml-4 w-full text-blue-800">
          <div className="text-xs font-bold mb-1">{props.position.company}</div>
          <div className="text-lg mb-1">{props.position.title}</div>

          <div className="mt-4 flex md:flex-row flex-col justify-between">
            <div className="md:mb-0 mb-4">
              <FullTimeIcon type={props.position.type} />
            </div>
            <div className="flex items-center">
              <LocationIcon location={props.position.location} />
              <DaysIcon stringDate={props.position.created_at} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex md:flex-row flex-col justify-between bg-white rounded-lg shadow p-3">
        <div className="flex">
          <Icon src={props.position.company_logo} />
          <div className="ml-4 text-blue-800">
            <div className="text-xs font-bold mb-2">
              {props.position.company}
            </div>
            <div className="text-lg mb-2">{props.position.title}</div>
            {props.position.type === 'Full Time' ? <FullTimeIcon /> : null}
          </div>
        </div>
        <div className="mt-4 flex items-end text-gray-400 text-xs">
          <div className="md:w-0 w-24"></div>
          <div className="flex items-center">
            <span className="material-icons">public</span>
            <div className="ml-2 mr-8">{props.position.location}</div>
            <span className="material-icons">schedule</span>
            <div className="ml-2">
              {days === 0 ? 'Today' : `${days} days ago`}
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Card
