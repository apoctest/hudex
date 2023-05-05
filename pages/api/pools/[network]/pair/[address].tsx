import type { NextApiRequest, NextApiResponse } from 'next'
import { buildUrl, buildTerminal, includeFromTo } from '../../../../../hooks/build'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) { 
    const { network, address } = req.query

    try {
        const slug = buildTerminal("cko")
        const ext = includeFromTo("/swaps")
        const apiBase = buildUrl(slug) + "/" + network + "/pools/" + address
        const poolsCheck = await fetch(apiBase)
        const poolsTokenCheck = await fetch(apiBase + ext)
        const poolInfoCheck = await poolsTokenCheck.json()
        const poolCheck = await poolsCheck.json()

        res.status(200).json({
            poolInfoCheck,
            poolCheck
        })
    } catch (error) {
        res.status(200).json(error)
    }
}
