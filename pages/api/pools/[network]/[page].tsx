import type { NextApiRequest, NextApiResponse } from 'next'
import { buildUrl, buildTerminal, includeNetMet, includePage } from '../../../../hooks/build'
import networks from '../../../../components/db/network.json'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) { 
    const { network, page } = req.query

    try {
        if (/[^\d]/.test(page.toString())) {
            res.status(200).json({
                error: "Page parameter can only contain numbers!"
            })
        }
            
        const parsed = parseInt(page.toString())
        if (
            isNaN(parsed) || !Number.isInteger(parsed)
        ) {
            res.status(200).json({
                error: "Please use a number for page parameter!"
            })
        }
        
        const slug = buildTerminal("cko")
        const poolDataCheck = includePage("dex%2Cdex.network%2Cdex.network.network_metric%2Ctokens", 1)
        const poolCheck = includeNetMet(poolDataCheck)
        const apiBase = buildUrl(slug) + "/" + network + "/pools"
        
        var currentPage = parsed
        var err = ""
        
        const poolsCheck = await fetch(apiBase + "?include=" + poolCheck)
        const poolInfoCheck = await poolsCheck.json()
        const series = poolInfoCheck["links"]["last"]["meta"]["series"]
        const len = series.length - 1
        const maxPage = series[len]
        if (Number(page) > maxPage) {
            currentPage = maxPage
            err = " (Error: Page parameter exceed maximum page, displaying data from last page!)"
        }

        const poolData = includePage("dex%2Cdex.network%2Cdex.network.network_metric%2Ctokens", Number(currentPage))
        const poolInclude = includeNetMet(poolData)
        
        const net = networks["networks"].filter(net => net.attributes.identifier === network)
        const attr = net[0].attributes
        
        const pools = await fetch(apiBase + "?include=" + poolInclude)
        const poolsInfo = await pools.json()
        const tokenInfo = poolsInfo["included"].filter((net: { type: string }) => net.type === "token")
        const dexInfo = poolsInfo["included"].filter((net: { type: string }) => net.type === "dex")
        const networkMetric = poolsInfo["included"].filter((net: { type: string }) => net.type === "network_metric")
        
        const pairList = [];

        for (let i = 0; i < poolsInfo["data"].length; i++) {
            const thePair = poolsInfo["data"][i]
            const pairAttr = thePair["attributes"]
            const pairVol = (Number(pairAttr.from_volume_in_usd) + Number(pairAttr.to_volume_in_usd)) / 2
            
            const tkn1 = tokenInfo.filter((tkn: { id: any }) => tkn.id === thePair["relationships"]["tokens"]["data"][0].id.toString())[0]["attributes"]
            const tkn2 = tokenInfo.filter((tkn: { id: any }) => tkn.id === thePair["relationships"]["tokens"]["data"][1].id.toString())[0]["attributes"]
            const dex = dexInfo.filter((tkn: { id: any }) => tkn.id === thePair["relationships"]["dex"]["data"].id.toString())[0]["attributes"]

            pairList.push({
                name: pairAttr.name,
                pairAddress: pairAttr.address,
                token1: {
                    img: tkn1.image_url,
                    symbol: tkn1.symbol,
                    name: tkn1.name,
                    contractAddress: tkn1.address
                },
                token2: {
                    img: tkn2.image_url,
                    symbol: tkn2.symbol,
                    name: tkn2.name,
                    contractAddress: tkn2.address
                },
                price: pairAttr.price_in_usd,
                liquidity: pairAttr.reserve_in_usd,
                priceChange: {
                    change5m: pairAttr.price_percent_changes.last_5m,
                    change1H: pairAttr.price_percent_changes.last_1h,
                    change6H: pairAttr.price_percent_changes.last_6h,
                    change24H: pairAttr.price_percent_changes.last_24h
                },
                txns24H: pairAttr.swap_count_24h,
                volume24H: pairVol,
                dex: {
                    name: dex.name,
                    identifier: dex.identifier,
                    img: dex.image_url
                }
            })
        }

        res.status(200).json({
            status: err === "" ? "Success." : err,
            page: currentPage,
            lastPage: maxPage,
            network: attr.identifier,
            id: attr.chain_id,
            img: attr.image_url,
            name: attr.name,
            symbol: attr.native_currency_symbol,
            networkInfo: {
                name: attr.name,
                img: attr.image_url,
                txns24H: networkMetric[0]["attributes"].swap_count_24h,
                volume24H: networkMetric[0]["attributes"].swap_volume_usd_24h,
                pairs: pairList
            }
        })
    } catch (error) {
        res.status(200).json(error)
    }
}
