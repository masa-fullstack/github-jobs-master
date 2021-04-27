import Image from 'next/image'

type Props = {
  src: string
}

const Icon: React.FC<Props> = (props) => {
  if (props.src) {
    return (
      <div>
        <div className="relative">
          <Image
            src={props.src}
            height={90}
            width={90}
            className="rounded-lg object-contain absolute"
          />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <Image
          src="/img/notfound.png"
          height={90}
          width={90}
          className="rounded-lg"
        />
      </div>
    )
  }
}

export default Icon
