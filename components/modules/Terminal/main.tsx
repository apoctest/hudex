import { useRouter } from "next/router";
import { nFormatter, percentageStringColorFormatter } from "../../../hooks/formatter";

export default function Terminal({ page, title, icon, list, net }) {

    const router = useRouter()

    return (
        <div className="terminal">
            <div className="layout-terminal-headline headline">
                <img className="terminal-icon" src={icon} />
                <h3>{title}</h3>
            </div>
            {list ? (
                <div className="grid-terminal margin-top-bottom-1_2">
                    <div className="layout-terminal-pairs-header border-bottom" onClick={() => null}>
                        <div className="pair-header-title">
                            <p>Pool</p>
                        </div>
                        <div className="pair-header-price txt-right no-wrap">
                            <p>Price</p>
                        </div>
                        <div className="pair-header-price txt-right no-wrap">
                            <p>24H Vol</p>
                        </div>
                        <div className="pair-header-price txt-right no-wrap">
                            <p>Liquidity</p>
                        </div>
                        <div className="pair-header-price txt-right no-wrap">
                            <p>24H Txns</p>
                        </div>
                        <div className="pair-header-price txt-right no-wrap">
                            <p>5m</p>
                        </div>
                        <div className="pair-header-price txt-right no-wrap">
                            <p>1H</p>
                        </div>
                        <div className="pair-header-price txt-right no-wrap">
                            <p>6H</p>
                        </div>
                        <div className="pair-header-price txt-right no-wrap">
                            <p>24H</p>
                        </div>
                    </div>
                    {list.pairs && list.pairs.length > 0 && list.pairs.map((item, index) => (
                        <a
                            key={"pairs-" + index}
                            className="layout-terminal-pairs-main pair-interactive pointer"
                            href={"/pair/" + net + "/" + item.pairAddress}
                        >
                            <div className="layout-terminal-pairs-list-main">
                                <div className="pair-index">
                                    <p>#{index + (50 * (page - 1)) + 1}</p>
                                </div>
                                <div className="pair-icon">
                                    {item["token1"].img != "missing.png" ? (
                                        <img className="terminal-icon" src={item["token1"].img } /> 
                                    ) : (
                                        <i className="bx bx-question-mark terminal-icon-missing" />
                                    )}
                                </div>
                                <div className="pair-icon">
                                    {item["token2"].img != "missing.png" ? (
                                        <img className="terminal-icon" src={item["token2"].img } /> 
                                    ) : (
                                        <i className="bx bx-question-mark terminal-icon-missing" />
                                    )}
                                </div>
                                <div className="pair-title">
                                    <p>{item["token1"].symbol + " / " + item["token2"].symbol}</p>
                                </div>
                            </div>
                            <div className="pair-price txt-right no-wrap">
                                <p>${nFormatter(item.price)}</p>
                            </div>
                            <div className="pair-price txt-right no-wrap">
                                <p>${nFormatter(item.volume24H)}</p>
                            </div>
                            <div className="pair-price txt-right no-wrap">
                                <p>${nFormatter(item.liquidity)}</p>
                            </div>
                            <div className="pair-price txt-right no-wrap">
                                <p>{nFormatter(item.txns24H)}</p>
                            </div>
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
                        </a>
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