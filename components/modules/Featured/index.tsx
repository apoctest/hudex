import { nFormatter, percentageColorFormatter } from "../../../hooks/formatter";

export default function Featured({ title, net, icon, list }) {

    return (
        <div className="featured">
            <div className="layout-featured-headline headline">
                <i className={icon + " featured-icon"} />
                <h3>{title}</h3>
            </div>
            {list ? (
                <div className="grid-featured featured-height margin-top-bottom-1_2">
                    {list && list.length > 0 && list.map((item, index) => (
                        <a 
                            key={"pairs-" + index}
                            className="pair-interactive pointer"
                            href={"/pair/" + net + "/" + item.address}
                        >
                            <div key={"pairs-" + index} className="layout-featured-pairs-main pointer" onClick={() => null}>
                                <div className={index < 3 ? "pair-index-" + index : "pair-index"}>
                                    <p>#{index + 1}</p>
                                </div>
                                <div className="pair-icon">
                                    {item["tokens"][0].image_url != "missing.png" ? (
                                        <img className="featured-icon" src={item["tokens"][0].image_url} /> 
                                    ) : (
                                        <i className="bx bx-question-mark featured-icon-missing" />
                                    )}
                                </div>
                                <div className="pair-icon">
                                    {item["tokens"][1].image_url != "missing.png" ? (
                                        <img className="featured-icon" src={item["tokens"][1].image_url} /> 
                                    ) : (
                                        <i className="bx bx-question-mark featured-icon-missing" />
                                    )}
                                </div>
                                <div className="pair-title">
                                    <p>{item["tokens"][0].symbol + " / " + item["tokens"][1].symbol}</p>
                                </div>
                                <div className="pair-price txt-right no-wrap">
                                    <p>${nFormatter(item.price_in_usd)}</p>
                                </div>
                                <div className="pair-price-change txt-right no-wrap">
                                    <p className={percentageColorFormatter(item.price_percent_change)}>{Number(item.price_percent_change).toFixed(2)}%</p>
                                </div>
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