import { getLanguageText } from "../hooks/formatter"
import useMedia from "use-media"
import Main from "../components/layouts/Main"
import Mobile from "../components/layouts/Mobile"
import Swap from "../components/modules/Swap/page"
import Footer from "../components/modules/Footer"

function SwapPage() {
    const isMobile = useMedia({ maxWidth: 767 })
    const lang = getLanguageText("en")

    if(isMobile) {
        return (
            <Mobile lang={lang}>
                <Swap lang={lang} />
                <Footer lang={lang} />
            </Mobile>
        )
    } else {
        return (
            <Main lang={lang}>
                <Swap lang={lang} />
                <Footer lang={lang} />
            </Main>
        )
    }    
}
  
export default SwapPage
  