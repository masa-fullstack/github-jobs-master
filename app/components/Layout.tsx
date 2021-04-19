import Head from 'next/head'

type Props = {
  title?: string
}

const Layout: React.FC<Props> = ({ children, title = 'Default title' }) => {
  return (
    <div className="flex justify-center item-center flex-col min-h-screen font-Raleway text-white">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="">{children}</main>
    </div>
  )
}

export default Layout
