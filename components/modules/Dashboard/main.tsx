import { getListings, getTrends } from "../../../hooks/pairHelpers";
import Featured from "../Featured";
import Terminal from "../Terminal/main";
import Slide from "../Slide";
import network from "../../db/network.json"
import { useEffect, useState } from "react";
import Footer from "../Footer";
import Web3 from "web3";
import { useAccount } from "wagmi";

export default function Main({ lang }) {

    const [page, setPage] = useState(1)
    const [firstLoad, setFirstLoad] = useState(false)

    var index = 1
    var identifier = "bsc"
    const { isConnected } = useAccount()

    if (isConnected) {
        const chainID = Web3.givenProvider.chainId
        index = network["networks"].findIndex((network) => network.attributes.chain_id === Number(chainID))
        if (index >= 0) {
            identifier = network["networks"][index]["attributes"].identifier
        }
    }
    
    var trends = getTrends(identifier, firstLoad, 15000)

    var listing = getListings(identifier, page, firstLoad, 15000)

    useEffect(() => {
        if (!firstLoad) {
            setTimeout(() => {
                setFirstLoad(true)
            }, 1000)
        }
    }, [setFirstLoad])

    return (
        <div className="overflow page-area">
            <div className="padding-default">
                <Slide />
            </div>
            <div className="padding-side-default">
                <h2 className="page-title">{lang["menu"][0].title}</h2>
            </div>
            <div className="grid-33-100 padding-side-default">
                <Featured
                    title={lang["general"].hotPairs}
                    icon="bx bxs-hot"
                    list={trends["popular"]}
                    net={identifier}
                />
                <Featured
                    title={lang["general"].dailyGainers}
                    icon="bx bx-trending-up"
                    list={trends["topGainer"]}
                    net={identifier}
                />
                <Featured
                    title={lang["general"].dailyLosers}
                    icon="bx bx-trending-down"
                    list={trends["topLoser"]}
                    net={identifier}
                />
            </div>
            <Terminal
                title={index >= 0 ? network["networks"][index]["attributes"].name + " " + lang["general"].pools : lang["general"].pools}
                icon={index >= 0 ? network["networks"][index]["attributes"].image_url : ""}
                list={listing["networkInfo"]}
                page={page}
                net={identifier}
            />
            <div style={{display:"grid",gridTemplateColumns:"1fr auto auto auto 1fr"}}>
                <div className="prev-btn" onClick={() => {
                    if (page === 1) {
                        setPage(1)
                    } else {
                        setPage(page - 1)
                    }
                }}>
                    <button className="pagination-btn">Previous</button>
                </div>
                <div className="page-btn" onClick={() => {
                    if (page === 1) {
                        setPage(1)
                    } else {
                        setPage(page - 1)
                    }
                }}>
                    <button className="pagination-btn">
                        {page === 1 ? (
                            page.toString()
                        ) : (
                            page === Number(listing["lastPage"]) ? (
                                (page - 2).toString()
                            ) : (
                                (page - 1).toString()
                            )
                        )}
                    </button>
                </div>
                <div className="page-btn" onClick={() => {
                    setPage(page)
                }}>
                    <button className="pagination-btn">
                        {page === 1 ? (
                            (page + 1).toString()
                        ) : (
                            page === Number(listing["lastPage"]) ? (
                                (Number(listing["lastPage"]) - 1).toString()
                            ) : (
                                page.toString()
                            )
                        )}
                    </button>
                </div>
                <div className="page-btn" onClick={() => {
                    if (page === Number(listing["lastPage"])) {
                        setPage(Number(listing["lastPage"]))
                    } else {
                        setPage(page + 1)
                    }
                }}>
                    <button className="pagination-btn">
                        {page === 1 ? (
                            (page + 2).toString()
                        ) : (
                            page === Number(listing["lastPage"]) ? (
                                Number(listing["lastPage"]).toString()
                            ) : (
                                (page + 1).toString()
                            )
                        )}
                    </button>
                </div>
                <div className="next-btn" onClick={() => {
                    if (page === Number(listing["lastPage"])) {
                        setPage(Number(listing["lastPage"]))
                    } else {
                        setPage(page + 1)
                    }
                }}>
                    <button className="pagination-btn">Next</button>
                </div>
            </div>
            <Footer lang={lang} />
        </div>
    )
}