import type { NextApiRequest, NextApiResponse } from 'next'
import { buildUrl, buildTerminal } from '../../../hooks/build'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) { 

    try {
        const slug = buildTerminal("cko")
        const apiBase = buildUrl(slug) + "/search?query=" + req.query.value
                
        const search = await fetch(apiBase)
        const result = await search.json()
        
        res.status(200).json({
            result: result["data"]["attributes"]["pools"]
        })
    } catch (error) {
        res.status(200).json(error)
    }
}
