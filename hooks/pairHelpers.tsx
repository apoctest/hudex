import { useEffect, useState } from "react"

export const getTrends = (network: string, firstLoad: boolean, delay: number) => {

    const [trendingData, setTrendingData] = useState([])

    const getTrendingData = async () => {        
        try {
            const api = "/api/trends/" + network
            const res = await fetch(api)
            const data = await res.json()
            setTrendingData(data)
        } catch (error) {
            console.log(error)
        }
    }

    if(!firstLoad) {
        getTrendingData()
    } else {
        setTimeout(() => {
            getTrendingData()
        }, delay)
    }

    return trendingData

}

export const getListings = (network: string, page: number, firstLoad: boolean, delay: number) => {

    const [listingData, setListingData] = useState([])
    const [loadedPage, setLoadedPage] = useState(1)

    const getListingData = async () => {        
        try {
            const base = "/api/pools" + (network !== null && network !== undefined && network !== "" ? "/" + network : network)
            const api = base + "/" + page
            const res = await fetch(api)
            const data = await res.json()
            setListingData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(!firstLoad) {
            getListingData()
            return
        }
        if(loadedPage != page) {
            getListingData()
            setLoadedPage(page)
            return
        }
        if(!firstLoad && loadedPage == page) {
            setTimeout(() => {
                getListingData()
            }, delay)
            return
        }

    }, [getListingData, delay, page])

    return listingData

}

export const getPairTokenInfo = (network: string, address: string, firstLoad: boolean, delay: number) => {

    const [token1, setToken1] = useState([])
    const [token2, setToken2] = useState([])

    const getPairData = async () => {      
        if (network !== null && network !== undefined && network !== "" && address !== null && address !== undefined && address !== "") {  
            try {
                const api = "/api/pools/" + network + "/pair/" + address
                const res = await fetch(api)
                const data = await res.json()
                setToken1(data["poolInfoCheck"]["included"][0]["attributes"])
                setToken2(data["poolInfoCheck"]["included"][1]["attributes"])
            } catch (error) {
                console.log(error)
            }
        }
    }

    if(!firstLoad) {
        getPairData()
    } else {
        setTimeout(() => {
            getPairData()
        }, delay)
    }

    return [token1, token2]

}

export const getPairInfo = (network: string, address: string, firstLoad: boolean, delay: number) => {

    const [poolData, setPoolData] = useState([])

    const getPoolData = async () => {      
        if (network !== null && network !== undefined && network !== "" && address !== null && address !== undefined && address !== "") {  
            try {
                const api = "/api/pools/" + network + "/pair/" + address
                const res = await fetch(api)
                const data = await res.json()
                if (data) {
                    setPoolData(data["poolCheck"]["data"]["attributes"] && data["poolCheck"]["data"]["attributes"] !== undefined && data["poolCheck"]["data"]["attributes"] !== null ? data["poolCheck"]["data"]["attributes"] : [])
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    if(!firstLoad) {
        getPoolData()
    } else {
        setTimeout(() => {
            getPoolData()
        }, delay)
    }

    return poolData

}

export const getPriceInfo = (network: string, address: string, firstLoad: boolean, delay: number) => {

    const [poolData, setPoolData] = useState([])

    const getPoolData = async () => {        
        if (network !== null && network !== undefined && network !== "" && address !== null && address !== undefined && address !== "") {
            try {
                const api = "/api/pools/" + network + "/pair/" + address
                const res = await fetch(api)
                const data = await res.json()
                if (data) {
                    setPoolData(data["poolCheck"]["data"]["attributes"]["price_percent_changes"] && data["poolCheck"]["data"]["attributes"]["price_percent_changes"] !== null && data["poolCheck"]["data"]["attributes"]["price_percent_changes"] !== undefined ? data["poolCheck"]["data"]["attributes"]["price_percent_changes"] : [])
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    if(!firstLoad) {
        getPoolData()
    } else {
        setTimeout(() => {
            getPoolData()
        }, delay)
    }

    return poolData

}