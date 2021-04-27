type Props = {
  type: string
}

const FullTimeIcon: React.FC<Props> = (props) => {
  if (props.type !== 'Full Time') return null
  return (
    <span className="rounded-lg border border-blue-800 py-1.5 px-2 font-bold text-xs">
      Full time
    </span>
  )
}

export default FullTimeIcon
