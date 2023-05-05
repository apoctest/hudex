import type { NextApiRequest, NextApiResponse } from 'next'
import { buildUrl, buildTerminal } from '../../../hooks/build'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) { 

    try {
        const slug = buildTerminal("cko")
        const apiBase = buildUrl(slug) + "/trends"
                
        const trends = await fetch(apiBase)
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
