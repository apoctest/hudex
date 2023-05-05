import { useState, useEffect } from 'react'

type UseLocalStorageReturnType<T> = [T, (value: T) => void]

type Chart = {
    network: string,
    pair: string
}

function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageReturnType<T> {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.log(error)
            return initialValue
        }
    })

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue))
        } catch (error) {
            console.log(error)
        }
    }, [key, storedValue])

    return [storedValue, setStoredValue]
}

export const useCharts = (key: string, initialValue: Chart[]): {
    charts: Chart[]
    addChart: (chart: Chart) => void
    removeChart: (index: number) => void
} => {
    const [charts, setCharts] = useLocalStorage(key, initialValue)

    const addChart = (chart: Chart) => {
        if (charts.some(multi => multi.network === chart.network && multi.pair === chart.pair)) {
            alert("This chart is already added.")
        } else if (charts.length < 9) {
            setCharts([...charts, chart])
        } else {
            alert("Cannot exceed 9 charts!")
        }
    }

    const removeChart = (index: number) => {
        const newCharts = [...charts]
        newCharts.splice(index, 1)
        setCharts(newCharts)
    }

    return { charts, addChart, removeChart }
}

type StorageType = 'session' | 'local'

type UseStorageReturnValue = {
    getItem: (key: string, type?: StorageType) => string
    setItem: (key: string, value: string, type?: StorageType) => boolean
    removeItem: (key: string, type?: StorageType) => void
}

export const useStorage = (): UseStorageReturnValue => {
    const storageType = (type?: StorageType): 'localStorage' | 'sessionStorage' => `${type ?? 'session'}Storage`

    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')()

    const getItem = (key: string, type?: StorageType): string => {
        return isBrowser ? window[storageType(type)][key] : ''
    }

    const setItem = (key: string, value: string, type?: StorageType): boolean => {
        if (isBrowser) {
            window[storageType(type)].setItem(key, value)
            return true
        }

        return false
    }

    const removeItem = (key: string, type?: StorageType): void => {
        window[storageType(type)].removeItem(key)
    }

    return {
        getItem,
        setItem,
        removeItem,
    }
}

export const buildTerminal = (connector: string) => {
    return connector + "terminal.com/api/p1"
}

export const buildChecker = (connector: string) => {
    return "https://api.gopluslabs.io/api/v1/" + connector
}

export const buildUrl = (slug: string) => {
    return "https://app.ge" + slug
}

export const includeNetMet = (connector: string) => {
    return connector + "&include_network_metrics=true"
}

export const includeFromTo = (connector: string) => {
    return connector + "?include=from_token%2Cto_token"
}

export const includeNetwork = (url: string, network: string) => {
    return url + "network=" + network
}

export const includeDex = (url: string, dex: string) => {
    return url + "dex=" + dex
}

export const includePage = (connector: string, page: number) => {
    return connector + "&page=" + page
}

export const cgContractAPI = (address: string) => {
    return "https://api.coingecko.com/api/v3/coins/token/contract/" + address
}