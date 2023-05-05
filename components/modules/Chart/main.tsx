import { useEffect, useRef, useState } from "react"
import { useCharts } from "../../../hooks/build"
import Footer from "../Footer"

export default function Chart({ lang }) {
    const [searchInfo, setSearchInfo] = useState("")
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState([])

    const { addChart, removeChart, charts } = useCharts("multichart", [])

    const searchBox = useRef<HTMLInputElement>(null)

    const handleFocus = () => {
        searchBox.current?.focus()
    }
    
    const handleChange = (value) => {
        if (value !== "" && value !== null && value !== undefined) {
            setLoading(true)
        }
        setChecked(false)
        setSearchInfo(value)
        setResult([])
        getSearchData(value)
    }

    const handleChart = (netModifier: string, pairAdr: string) => {
        setChecked(false)
        setSearchInfo("")
        setResult([])
        getSearchData("")
        addChart({network: netModifier, pair: pairAdr})
    }
    
    const getSearchData = async (value) => {        
        try {
            const api = "/api/search/" + value
            
            const search = await fetch(api)
            const res = await search.json()
            
            setResult(res["result"])
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
        setChecked(true)
    }

    return (
        <div className="overflow page-area">
            <div className="padding-side-default">
                <h2 className="page-title">{lang["menu"][3].title}</h2>
            </div>
            <div className="search-area layout-search-main">
                <div>
                    <i className="bx bx-search-alt search-icon" />
                </div>
                <input ref={searchBox} type="search" className="input-bar" placeholder={lang["chart"].placeholder} value={searchInfo} onChange={(e) => {handleChange(e.target.value)}} />
            </div>
            <div className="padding-side-default">
                <div className={!loading && result && result.length === 0 ? "padding-default result-empty overflow" : "padding-default result-box overflow"}>
                    {loading ? (
                        <div>{lang["general"].loading}</div>
                    ) : 
                        result && result.length > 0 ?
                            result.map((item) => (
                                <div className="result-item pointer" onClick={() => handleChart(item["network"].identifier, item.address)}>
                                    <h3 className="result-title">
                                        {item["tokens"][0].name + " / " + item["tokens"][1].name}
                                    </h3>
                                        {item.address}
                                </div>
                            ))
                        : null
                    }
                </div>
            </div>
            <div className="grid-33-50-100 padding-default">
            {charts && charts.length > 0 ?
                    charts.map((item, index) => (
                        <div className="multichart-area">
                            <small className="pointer" onClick={() => removeChart(index)}>Remove</small>
                            <iframe
                                height="100%"
                                width="100%"
                                id="geckoterminal-embed"
                                title="GeckoTerminal Embed"
                                src={"https://www.geckoterminal.com/" + item.network + "/pools/" + item.pair + "?embed=1&info=0&swaps=0"}
                                allow="clipboard-write"
                                className="no-border"
                            /> 
                        </div>
                    ))
                : null}
                {charts && charts.length < 9 ? (
                    <div className="multichart-area-add pointer padding-auto" onClick={() => handleFocus()}>
                        <div className="margin-auto">
                            <h2 className="txt-center"><i className="bx bxs-add-to-queue" /></h2>
                            <p>Add new chart</p>
                        </div>
                    </div>
                ) : null}
            </div>
            <br />
            <Footer lang={lang} />
        </div>
    )
}