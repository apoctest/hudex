import { useEffect, useState } from "react";
import { getPairInfo, getPairTokenInfo, getPriceInfo } from "../../../hooks/pairHelpers";
import PairInfo from "../Pair/info";
import Footer from "../Footer";

export default function Pair({ net, pair, lang }) {

    const [firstLoad, setFirstLoad] = useState(false)

    const pairTokenInfo = getPairTokenInfo(net, pair, firstLoad, 15000)
    const pairDataInfo = getPairInfo(net, pair, firstLoad, 15000)
    const priceDataInfo = getPriceInfo(net, pair, firstLoad, 15000)

    useEffect(() => {
        if (!firstLoad) {
            setTimeout(() => {
                setFirstLoad(true)
            }, 1000)
        }
    }, [setFirstLoad])

    return (
        <div className="overflow page-area">
            <PairInfo
                token1={pairTokenInfo && pairTokenInfo.length > 0 ? pairTokenInfo[0] : []}
                token2={pairTokenInfo && pairTokenInfo.length > 0 ? pairTokenInfo[1] : []}
                pairDataInfo={pairDataInfo}
                priceDataInfo={priceDataInfo}
                firstLoad={firstLoad}
                lang={lang}
                pair={pair}
                net={net}
            />
            <Footer lang={lang} />
        </div>
    )
}