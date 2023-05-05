import { useRouter } from "next/router";
import { nFormatter, percentageStringColorFormatter } from "../../../hooks/formatter";

export default function Terminal({ page, title, icon, list }) {

    const router = useRouter()

    return (
        <div className="terminal">
            <div className="layout-terminal-headline headline">
                <img className="terminal-icon" src={icon} />
                <h3>{title}</h3>
            </div>
            {list ? (
                <div className="grid-terminal margin-top-bottom-1_2">
                    <div className="layout-terminal-pairs-header-mobile border-bottom " onClick={() => null}>
                        <div className="pair-header-title">
                            <p>Pool</p>
                        </div>
                        <div className="pair-header-price txt-right no-wrap">
                            <p>Price</p>
                        </div>
                        <div className="pair-header-price txt-right no-wrap">
                            <p>Liquidity</p>
                        </div>
                        <div className="pair-header-price txt-right no-wrap grid-100 content-center">
                            <p className="border-bottom">24H Vol</p>
                            <p>24H Txns</p>
                        </div>
                        <div className="grid-50-small-gap">
                            <div className="pair-header-price txt-right no-wrap border-bottom">
                                <p>5m</p>
                            </div>
                            <div className="pair-header-price txt-right no-wrap border-bottom">
                                <p>1H</p>
                            </div>
                            <div className="pair-header-price txt-right no-wrap">
                                <p>6H</p>
                            </div>
                            <div className="pair-header-price txt-right no-wrap">
                                <p>24H</p>
                            </div>
                        </div>
                    </div>
                    {list.pairs && list.pairs.length > 0 && list.pairs.map((item, index) => (
                        <div key={"pairs-" + index} className="layout-terminal-pairs-mobile pair-interactive pointer" onClick={() => router.push("/pair/" + item.pairAddress)}>
                            <div>
                                <div className="pair-title">
                                    <p>#{index + (50 * (page - 1)) + 1} | {item["token1"].symbol + " / " + item["token2"].symbol}</p>
                                </div>
                            </div>
                            <div className="pair-price txt-right no-wrap">
                                <p>${nFormatter(item.price)}</p>
                            </div>
                            <div className="pair-price txt-right no-wrap">
                                <p>${nFormatter(item.liquidity)}</p>
                            </div>
                            <div className="pair-price txt-right no-wrap">
                                <p>${nFormatter(item.volume24H)}</p>
                                <p>{nFormatter(item.txns24H)}</p>
                            </div>
                            <div className="grid-50-small-gap">
                                <div className="pair-price-change txt-right no-wrap">
                                    <p className={percentageStringColorFormatter(item["priceChange"].change5m)}>{item["priceChange"].change5m}</p>
                                </div>
                                <div className="pair-price-change txt-right no-wrap">
                                    <p className={percentageStringColorFormatter(item["priceChange"].change1H)}>{item["priceChange"].change1H}</p>
                                </div>
                                <div className="pair-price-change txt-right no-wrap">
                                    <p className={percentageStringColorFormatter(item["priceChange"].change6H)}>{item["priceChange"].change6H}</p>
                                </div>
                                <div className="pair-price-change txt-right no-wrap">
                                    <p className={percentageStringColorFormatter(item["priceChange"].change24H)}>{item["priceChange"].change24H}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="padding-top-bottom-1_2">
                    <p>Loading...</p>
                </div>
            )}
        </div>
    )
}