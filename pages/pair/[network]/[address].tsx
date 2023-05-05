import { getLanguageText } from "../../../hooks/formatter"
import useMedia from "use-media"
import Main from "../../../components/layouts/Main"
import Mobile from "../../../components/layouts/Mobile"
import PairPage from "../../../components/modules/Pair/main"
import { useRouter } from "next/router"
import { isAddress } from "ethers/lib/utils.js"

function Pair() {
    const isMobile = useMedia({ maxWidth: 767 })
    const lang = getLanguageText("en")

    const router = useRouter()
    var pair
    var net
    var valid = true
    if (router.query.network !== null && router.query.network !== undefined && router.query.network !== "" && router.query.address !== null && router.query.address !== undefined && router.query.address !== "") {
        net = router.query.network
        pair = router.query.address
        valid = isAddress(pair)
        if (!valid) {
            router.push("/404")
        }
    }
        
    if(isMobile) {
        return (
            <Mobile lang={lang}>
                <PairPage net={net} pair={pair} lang={lang}/>
            </Mobile>
        )
    } else {
        return (
            <Main lang={lang}>
                <PairPage net={net} pair={pair} lang={lang}/>
            </Main>
        )
    }    
}
  
export default Pair
  