import type { NextApiRequest, NextApiResponse } from 'next'
import { buildUrl, buildTerminal, includeNetwork, includeDex } from '../../../../hooks/build'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) { 
    const { network, dex } = req.query

    try {
        const slug = buildTerminal("cko")
        const apiBase = buildUrl(slug) + "/trends"
        const url = includeNetwork((apiBase + "?"), network.toString())
        const api = includeDex((url + "&"), dex.toString())
                
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
