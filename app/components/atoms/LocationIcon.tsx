type Props = {
  location: string
}

const LocationIcon: React.FC<Props> = (props) => {
  return (
    <div className="flex items-center text-gray-400 text-xs">
      <span className="material-icons">public</span>
      <div className="ml-2 mr-8">{props.location}</div>
    </div>
  )
}

export default LocationIcon
