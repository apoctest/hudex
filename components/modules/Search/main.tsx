import { useRef, useState } from "react"

export default function Search({ lang }) {
    const [searchMainInfo, setSearchMainInfo] = useState("")
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState([])

    const handleChange = (value) => {
        if (value !== "" && value !== null && value !== undefined) {
            setLoading(true)
        }
        setChecked(false)
        setSearchMainInfo(value)
        setResult([])
        getSearchData(value)
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
        <div className="search-main padding-default">
            <div className="search-area layout-search-main">
                <div>
                    <i className="bx bx-search-alt search-icon" />
                </div>
                <input type="search" className="input-bar" placeholder={lang["chart"].placeholder} value={searchMainInfo} onChange={(e) => {handleChange(e.target.value)}} />
            </div>
            <div className="search-result padding-side-default">
                <div className={!loading && result && result.length === 0 ? "result-empty overflow" : "padding-default result-box overflow"}>
                    {loading ? (
                        <div>{lang["general"].loading}</div>
                    ) : 
                        result && result.length > 0 ?
                            result.map((item) => (
                                <a href={"/pair/" + item["network"].identifier  + "/" + item.address}>
                                    <div className="result-item pointer">
                                        <h3 className="result-title">
                                            {item["tokens"][0].name + " / " + item["tokens"][1].name}
                                        </h3>
                                        {item.address}
                                    </div>
                                </a>
                            ))
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

