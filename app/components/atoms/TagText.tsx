import DOMPurify from 'isomorphic-dompurify'

type Props = {
  text: string
}

const TagText: React.FC<Props> = (props) => {
  const cleanText: string = DOMPurify.sanitize(props.text)

  return (
    <div
      className="overflow-x-hidden"
      dangerouslySetInnerHTML={{
        __html: cleanText,
      }}
    />
  )
}

export default TagText
