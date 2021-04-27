import Layout from '../components/Layout'
import GithubJobsApp from '../components/GithubJobsApp'

export const Home = (): JSX.Element => {
  return (
    <Layout title="Github Jobs">
      <GithubJobsApp />
    </Layout>
  )
}

export default Home
