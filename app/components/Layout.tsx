import Head from 'next/head'

type Props = {
  title?: string
}

const Layout: React.FC<Props> = ({ children, title = 'Default title' }) => {
  return (
    <div className="container mx-auto font-Roboto">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="min-h-screen">
        <div className="py-6 px-2 text-2xl">
          <span className="font-bold">Github </span>
          <span className="font-light">Jobs</span>
        </div>
        {children}
      </main>
      <footer className="w-full h-6 flex justify-center item-center text-gray-400 mt-5 mb-10">
        <div className="w-2/6 border-t text-center pt-5">
          masa @ DevChallenges.io
        </div>
      </footer>
    </div>
  )
}

export default Layout
