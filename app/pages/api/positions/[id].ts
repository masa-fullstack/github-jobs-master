import type { NextApiRequest, NextApiResponse } from 'next'
import { URL, URLSearchParams } from 'url'

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const {
    query: { id },
  } = req

  const params = new URLSearchParams(req.query)
  const url = new URL(`https://jobs.github.com/positions/${id}.json`)
  url.search = params.toString()

  res.statusCode = 200
  fetch(url.toString(), {
    method: 'GET',
  })
    .then((r) => r.json())
    .then((data) => res.json(data))
}
