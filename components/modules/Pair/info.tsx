import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { priceBarColor, shortenAddress } from "../../../hooks/formatter";
import Swap from "../Swap";
import network from "../../db/network.json"

interface Token {
    name: string,
    symbol: string,
    address: string,
    image_url: string
}

export default function Pair({ net, pair, token1, token2, pairDataInfo, priceDataInfo, firstLoad, lang }) {

    var index = 1
    const router = useRouter()
    const [swapped, setSwapped] = useState(false)
    const [firstToken, setFirstToken] = useState<Token>()
    const [secondToken, setSecondToken] = useState<Token>()
    if (net !== "" && net !== null && net !== undefined) {
        index = network["networks"].findIndex((network) => network.attributes.identifier === net)
    }
    const explorer = network["networks"][index]["attributes"].explorer_tx_url + "/address/"


    const swapPlace = (initialToken1, initialToken2) => {
        setFirstToken(initialToken2)
        setSecondToken(initialToken1)
        setSwapped(!swapped)
    }
    
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    useEffect(() => {
        if (token1 !== firstToken && !swapped) {
            setFirstToken(token1)
        } else if (token2 !== firstToken && swapped) {
            setFirstToken(token2)
        }
    }, [setFirstToken, token1, token2, firstToken])
    
    useEffect(() => {
        if (token2 !== secondToken && !swapped) {
            setSecondToken(token2)
        } else if (token1 !== secondToken && swapped) {
            setSecondToken(token1)
        }
    }, [setSecondToken, token1, token2, secondToken])
    
    useEffect(() => {
        if (!firstLoad) {
            setFirstToken(token1)
            setSecondToken(token2)
        }
    }, [setFirstToken, setSecondToken, firstLoad])

    return (
        <div>
            <div className="overflow token-info-area content-center">
                <div className="padding-side-default grid-50-50-100 content-center">
                    <div className="layout-pair-topbar content-center">
                        <a className="layout-prices content-center padding-default pointer" href="/">
                            <i className="back-icon bx bx-chevron-left" />
                        </a>
                        <div className="grid-50-100 content-center">
                            <div>
                                <div className="token-pair pointer" onClick={() => swapPlace(firstToken, secondToken)}>
                                    <h2>
                                        {firstToken && firstToken.image_url != "missing.png" ? (
                                            <img className="token-icon" src={firstToken.image_url} /> 
                                        ) : (
                                            <i className="bx bx-question-mark token-icon-missing" />
                                        )}
                                        
                                        {secondToken && secondToken.image_url != "missing.png" ? (
                                            <img className="token-icon" src={secondToken.image_url} /> 
                                        ) : (
                                            <i className="bx bx-question-mark token-icon-missing" />
                                        )}
                                        {firstToken ? firstToken.symbol : ""} / {secondToken ? secondToken.symbol : ""}
                                        <i className="swap-btn bx bx-sort" />
                                    </h2>
                                </div>
                                <div className="token-info">
                                    <a href={firstToken ? explorer + firstToken.address : ""} target="_blank" className="token-link pointer">
                                        <span>{firstToken ? firstToken.name : ""}</span>
                                        <span className="address-box">{firstToken && firstToken.address? shortenAddress(firstToken.address) : ""}</span>
                                        <i className="bx bx-link-external" />
                                    </a>
                                    <a onClick={() => handleCopy(firstToken.address)}>
                                        <i className="bx bx-copy-alt padding-copy pointer" />
                                    </a>
                                </div>
                                <div className="token-info">
                                    <a href={secondToken ? explorer + secondToken.address : ""} target="_blank" className="token-link pointer">
                                        <span>{secondToken ? secondToken.name : ""}</span>
                                        <span className="address-box">{secondToken && secondToken.address ? shortenAddress(secondToken.address) : ""}</span>
                                        <i className="bx bx-link-external" />
                                    </a>
                                    <a onClick={() => handleCopy(secondToken.address)}>
                                        <i className="bx bx-copy-alt padding-copy pointer" />
                                    </a>
                                </div>
                            </div>
                            <div className="token-info">
                                <p className="pair-info-title">{lang["general"].tokenPrice}: </p>
                                <h2 className={"pair-info-price" + priceBarColor(
                                    pairDataInfo &&
                                    pairDataInfo.price_percent_change !== "" &&
                                    pairDataInfo.price_percent_change !== null && 
                                    pairDataInfo.price_percent_change !== undefined ? 
                                        pairDataInfo.price_percent_change : ""
                                )}>
                                    {pairDataInfo ? "$" + Number(pairDataInfo.price_in_usd).toFixed(9) : "$0.00"}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="padding-side-default">
                        <p>{lang["general"].priceChange} (%): </p>
                        <div className="grid-25-50">
                            <div className={"token-price-change-title" + priceBarColor(
                                priceDataInfo &&
                                priceDataInfo.last_5m !== "" &&
                                priceDataInfo.last_5m !== null && 
                                priceDataInfo.last_5m !== undefined ? 
                                    priceDataInfo.last_5m : ""
                            )}>
                                <h2>
                                    {pairDataInfo ? priceDataInfo.last_5m : "0%"}
                                </h2>
                                <p>5m</p>
                            </div>
                            <div className={"token-price-change-title" + priceBarColor(
                                priceDataInfo &&
                                priceDataInfo.last_1h !== "" &&
                                priceDataInfo.last_1h !== null && 
                                priceDataInfo.last_1h !== undefined ? 
                                    priceDataInfo.last_1h : ""
                            )}>
                                <h2>
                                    {pairDataInfo ? priceDataInfo.last_1h : "0%"}
                                </h2>
                                <p>1H</p>
                            </div>
                            <div className={"token-price-change-title" + priceBarColor(
                                priceDataInfo &&
                                priceDataInfo.last_6h !== "" &&
                                priceDataInfo.last_6h !== null && 
                                priceDataInfo.last_6h !== undefined ? 
                                    priceDataInfo.last_6h : ""
                            )}>
                                <h2>
                                    {pairDataInfo ? priceDataInfo.last_6h : "0%"}
                                </h2>
                                <p>6H</p>
                            </div>
                            <div className={"content-center token-price-change-title" + priceBarColor(
                                priceDataInfo &&
                                priceDataInfo.last_24h !== "" &&
                                priceDataInfo.last_24h !== null && 
                                priceDataInfo.last_24h !== undefined ? 
                                    priceDataInfo.last_24h : ""
                            )}>
                                <h2>
                                    {pairDataInfo ? priceDataInfo.last_24h : "0%"}
                                </h2>
                                <p>24H</p>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="layout-pair">
                    <div>
                        <Swap
                            firstTokenSymbol={firstToken ? firstToken.symbol : ""}
                            firstTokenAddress={firstToken ? firstToken.address : ""}
                            secondTokenSymbol={secondToken ? secondToken.symbol : ""}
                            secondTokenAddress={secondToken ? secondToken.address : ""}
                            lang={lang}
                            swapped={swapped}
                        />
                        <br />
                    </div>
                    <div className="chart-area">
                        <iframe
                            height="100%"
                            width="100%"
                            id="geckoterminal-embed"
                            title="GeckoTerminal Embed"
                            src={"https://www.geckoterminal.com/" + net + "/pools/" + pair + "?embed=1&info=0&swaps=1"}
                            allow="clipboard-write"
                            className="no-border"
                        />  
                    </div>
                </div>
            </div>
        </div>
    )
}