import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import DaysIcon from '../../components/atoms/DaysIcon'
import FullTimeIcon from '../../components/atoms/FullTimeIcon'
import Icon from '../../components/atoms/Icon'
import positionsData from '../../data/positions.json'
import Layout from '../../components/Layout'
import LocationIcon from '../../components/atoms/LocationIcon'
import TagText from '../../components/atoms/TagText'

type PositionsData = typeof positionsData

// post：getStaticPropsから取得したデータ
const Position = ({
  position,
}: {
  position: PositionsData[number]
}): JSX.Element => {
  return (
    <Layout title="Github Jobs">
      <div className="h-full grid md:grid-cols-10 grid-cols-1 gap-10 p-5">
        {/* LEFT */}
        <div className="md:col-span-3 col-span-1">
          <div>
            <Link href="/">
              <div className="cursor-pointer text-blue-600">
                ← Back to search
              </div>
            </Link>
          </div>
          <div className="mt-5">
            <span className="text-gray-500 font-bold text-lg">
              HOW TO APPLY
            </span>
          </div>
          <div className="mt-3">
            <TagText text={position?.how_to_apply} />
          </div>
        </div>
        {/* RIGHT */}
        <div className="md:col-span-7 col-span-1">
          <div className="flex md:flex-row md:items-center flex-col ">
            <div className="text-xl font-bold mb-1 mr-2">{position.title}</div>
            <div className="my-3">
              <FullTimeIcon type={position.type} />
            </div>
          </div>
          <DaysIcon stringDate={position.created_at} />
          <div className="flex items-center my-3">
            <Icon src={position.company_logo} />
            <div className="ml-2">
              <div className="mb-2">{position.company}</div>
              <LocationIcon location={position.location} />
            </div>
          </div>
          <div>
            <TagText text={position.description} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Position

export const getStaticPaths: GetStaticPaths = async () => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch('https://jobs.github.com/positions.json')
  const positions = await res.json()

  // 事前ビルドしたいパスを指定
  const paths = positions.map((position) => ({
    params: {
      // ファイル名と合わせる ※文字列指定
      id: position.id.toString(),
    },
  }))
  // paths：事前ビルドするパス対象を指定するパラメータ
  // fallback：事前ビルドしたパス以外にアクセスしたときのパラメータ true:カスタム404Pageを表示 false:404pageを表示
  return { paths, fallback: true }
}

// paramsには上記pathsで指定した値が入る（1postずつ）
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch(`https://jobs.github.com/positions/${params.id}.json`)
  const position: PositionsData = await res.json()

  // ページコンポーネントにpropsとしてに渡す
  return {
    props: {
      position,
    },
  }
}
