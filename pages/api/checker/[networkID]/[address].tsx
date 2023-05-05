import type { NextApiRequest, NextApiResponse } from 'next'
import { buildUrl, buildChecker } from '../../../../hooks/build'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) { 
    const { networkID, address } = req.query

    try {
        const slug = buildChecker("token_security")
        const apiBase = slug + "/" + networkID + "?contract_addresses=" + address
        const contractCheck = await fetch(apiBase)
        const contractInfo = await contractCheck.json()

        res.status(200).json({
            contractInfo: contractInfo
        })
    } catch (error) {
        res.status(200).json(error)
    }
}
