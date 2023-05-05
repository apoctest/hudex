import { useEffect, useState } from "react"
import network from "../../db/network.json"
import { getBool, getBoolClass, getBoolClassInvert, getBoolInvert, nAmount, shortenAddress } from "../../../hooks/formatter"
import { isAddress } from "ethers/lib/utils.js"
import Footer from "../Footer"

export default function Checker({ lang }) {
    const [networkID, setNetworkID] = useState(56)
    const [contractAddress, setContractAddress] = useState("")
    const [checked, setChecked] = useState(false)
    const [contractData, setContractData] = useState()
    const [holders, setHolders] = useState([])
    const [lpHolders, setLPHolders] = useState([])

    const explorer = network["networks"][1]["attributes"].explorer_tx_url + "/address/"

    const handleChange = (value) => {
        setChecked(false)
        setContractAddress(value)
    }

    const select = (
        //<select className="input-bar" value={networkID} onChange={(e) => {setNetworkID(Number(e.target.value))}}>
        //    {network["networks"].map((item) => (
        //        <option key={"network-" + item["attributes"].name} value={item["attributes"].chain_id}>{item["attributes"].name}</option>
        //    ))}
        //</select>
        <div className="input-bar content-center" style={{display:"grid",gridTemplateColumns:"auto 1fr",columnGap:"0.6rem",justifyContent:"center"}}>
            <img src="https://assets.geckoterminal.com/rk3bsa3pl5h3h7frn6etl1v4opsz" />
            <div>
                Binance
            </div>
        </div>
    )
    
    const getContractData = async () => {      
        if (isAddress(contractAddress)) {
            setChecked(true)
            try {
                const api = "/api/checker/" + networkID + "/" + contractAddress
                const res = await fetch(api)
                const data = await res.json()
    
                const stringify = JSON.stringify(data["contractInfo"]["result"] , null, 2)
    
                const final = stringify.substring(49, stringify.length-1)
                const parsed = JSON.parse(final)
    
                setContractData(parsed)
                setHolders(parsed.holders)
                setLPHolders(parsed.lp_holders)
            } catch (error) {
                console.log(error)
            }
        }  
    }

    return (
        <div className="overflow page-area">
            <div className="padding-side-default">
                <h2 className="page-title">{lang["menu"][4].title}</h2>
            </div>
            <div className="input-area layout-checker-main">
                {select}
                <input type="text" className="input-bar" placeholder={lang["checker"].placeholder} value={contractAddress} onChange={(e) => {handleChange(e.target.value)}} />
                <div className="button-check" onClick={contractAddress.length === 42 ? (() => getContractData()) : null}>
                    <p>
                        Check
                    </p>
                </div>
            </div>
            {checked ? (
                <div>
                    <div className="padding-side-default">
                        <h2 className="page-title">{lang["checker"].resultTitle}</h2>
                    </div>
                    <div className="grid-checker">
                        <div className="padding-side-default">
                            <div className="checker-container">
                                <h2 className="page-title">{lang["checker"].basicInfo}</h2>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].tokenInfo}</div>
                                    <div className="txt-focus">{contractData ? contractData["token_name"] + " (" + contractData["token_symbol"] + ")": null}</div>
                                </div>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].totalSupply}</div>
                                    <div className="txt-focus">{contractData ? nAmount(Number(contractData["total_supply"])) : null}</div>
                                </div>
                                <a href={contractAddress!== null && contractAddress !== undefined && contractAddress !== "" ? explorer + contractAddress : null} target="_blank">
                                    <div className="grid-listing">
                                        <div className="strong">{lang["checker"].contractAddress}</div>
                                        <div className="txt-focus">{shortenAddress(contractAddress)}</div>
                                    </div>
                                </a>
                                <a href={contractData && contractData["creator_address"] !== null && contractData["creator_address"] !== undefined && contractData["creator_address"] !== "" ? explorer + contractData["creator_address"] : null} target="_blank">
                                    <div className="grid-listing">
                                        <div className="strong">{lang["checker"].creatorAddress}</div>
                                        <div className="txt-focus">{contractData ? shortenAddress(contractData["creator_address"]) : null}</div>
                                    </div>
                                </a>
                                <a href={contractData && contractData["owner_address"] !== null && contractData["owner_address"] !== undefined && contractData["owner_address"] !== "" ? explorer + contractData["owner_address"] : null} target="_blank">
                                    <div className="grid-listing">
                                        <div className="strong">{lang["checker"].ownerAddress}</div>
                                        <div className="txt-focus">{contractData ? shortenAddress(contractData["owner_address"]) : null}</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="padding-side-default">
                            <div className="checker-container">
                                <h2 className="page-title">{lang["checker"].poolInfo}</h2>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].lpHolders}</div>
                                    <div className="txt-focus">{contractData ? contractData["lp_holder_count"] : null}</div>
                                </div>
                                {lpHolders && lpHolders.length > 0 ? lpHolders.map((item, index) => (
                                    <a key={"lpholders-" + index} href={explorer + item.address} target="_blank">
                                        <div className="grid-listing">
                                            <div className="strong">{index + 1}.</div>
                                            <div className="txt-focus grid-listing">
                                                <div>
                                                    {shortenAddress(item.address)}
                                                </div>
                                                <div>
                                                    [ {nAmount(item.balance)} ]
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                )) : null}
                            </div>
                        </div>
                        <div className="padding-side-default">
                            <div className="checker-container">
                                <h2 className="page-title">{lang["checker"].topHolders}</h2>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].totalHolders}</div>
                                    <div className="txt-focus">{contractData ? contractData["holder_count"] : null}</div>
                                </div>
                                {holders && holders.length > 0 ? holders.map((item, index) => (
                                    <a key={"holders-" + index} href={explorer + item.address} target="_blank">
                                        <div className="grid-listing">
                                            <div className="strong">{index + 1}.</div>
                                            <div className="txt-focus grid-listing">
                                                <div>
                                                    {shortenAddress(item.address)}
                                                </div>
                                                <div>
                                                    [ {nAmount(item.balance)} ]
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                )) : null}
                            </div>
                        </div>
                        <div className="padding-side-default">
                            <div className="checker-container">
                                <h2 className="page-title">{lang["checker"].riskCheck}</h2>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].anti_whale_modifiable}</div>
                                    <div className={contractData ? getBoolClass(contractData["anti_whale_modifiable"]) : "txt-focus"}>{contractData ? getBool(contractData["anti_whale_modifiable"]) : null}</div>
                                </div>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].is_honeypot}</div>
                                    <div className={contractData ? getBoolClass(contractData["is_honeypot"]) : "txt-focus"}>{contractData ? getBool(contractData["is_honeypot"]) : null}</div>
                                </div>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].is_mintable}</div>
                                    <div className={contractData ? getBoolClass(contractData["is_mintable"]) : "txt-focus"}>{contractData ? getBool(contractData["is_mintable"]) : null}</div>
                                </div>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].is_open_source}</div>
                                    <div className={contractData ? getBoolClassInvert(contractData["is_open_source"]) : "txt-focus"}>{contractData ? getBoolInvert(contractData["is_open_source"]) : null}</div>
                                </div>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].transfer_pausable}</div>
                                    <div className={contractData ? getBoolClass(contractData["transfer_pausable"]) : "txt-focus"}>{contractData ? getBool(contractData["transfer_pausable"]) : null}</div>
                                </div>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].owner_change_balance}</div>
                                    <div className={contractData ? getBoolClass(contractData["owner_change_balance"]) : "txt-focus"}>{contractData ? getBool(contractData["owner_change_balance"]) : null}</div>
                                </div>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].is_whitelisted}</div>
                                    <div className={contractData ? getBoolClass(contractData["is_whitelisted"]) : "txt-focus"}>{contractData ? getBool(contractData["is_whitelisted"]) : null}</div>
                                </div>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].is_blacklisted}</div>
                                    <div className={contractData ? getBoolClass(contractData["is_blacklisted"]) : "txt-focus"}>{contractData ? getBool(contractData["is_blacklisted"]) : null}</div>
                                </div>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].is_proxy}</div>
                                    <div className={contractData ? getBoolClass(contractData["is_proxy"]) : "txt-focus"}>{contractData ? getBool(contractData["is_proxy"]) : null}</div>
                                </div>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].is_anti_whale}</div>
                                    <div className={contractData ? getBoolClass(contractData["is_anti_whale"]) : "txt-focus"}>{contractData ? getBool(contractData["is_anti_whale"]) : null}</div>
                                </div>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].selfdestruct}</div>
                                    <div className={contractData ? getBoolClass(contractData["selfdestruct"]) : "txt-focus"}>{contractData ? getBool(contractData["selfdestruct"]) : null}</div>
                                </div>
                                <div className="grid-listing">
                                    <div className="strong">{lang["checker"].can_take_back_ownership}</div>
                                    <div className={contractData ? getBoolClass(contractData["can_take_back_ownership"]) : "txt-focus"}>{contractData ? getBool(contractData["can_take_back_ownership"]) : null}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
            <Footer lang={lang} />
        </div>
    )
}