import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { transcript } = req.body
    try {
        const response = await axios.post('http:/localhost:3001', { transcript })
        res.status(200).json({ analysis: response.data.analysis})
        } catch (error) {
            res.status(500).json({ error: 'Sorry, the interview could not be analyzed.' })
    }
  } else {
    res.status(405).json({ error: 'Sorry, only POST requests are allowed.' })
  }
}
