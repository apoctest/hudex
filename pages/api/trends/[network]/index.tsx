import type { NextApiRequest, NextApiResponse } from 'next'
import { buildUrl, buildTerminal, includeNetwork } from '../../../../hooks/build'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) { 
    const { network } = req.query

    try {
        const slug = buildTerminal("cko")
        const apiBase = buildUrl(slug) + "/trends"
        const api = includeNetwork((apiBase + "?"), network.toString())
                
        const trends = await fetch(api)
        const trendsInfo = await trends.json()
        
        res.status(200).json({
            popular: trendsInfo["data"]["attributes"].most_visits,
            topGainer: trendsInfo["data"]["attributes"].top_gainers,
            topLoser: trendsInfo["data"]["attributes"].top_losers
        })
    } catch (error) {
        res.status(200).json(error)
    }
}
