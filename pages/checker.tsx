import { getLanguageText } from "../hooks/formatter"
import useMedia from "use-media"
import Main from "../components/layouts/Main"
import Mobile from "../components/layouts/Mobile"
import Checker from "../components/modules/Checker"

function CheckerPage() {
    const isMobile = useMedia({ maxWidth: 767 })
    const lang = getLanguageText("en")

    if(isMobile) {
        return (
            <Mobile lang={lang}>
                <Checker lang={lang} />
            </Mobile>
        )
    } else {
        return (
            <Main lang={lang}>
                <Checker lang={lang} />
            </Main>
        )
    }    
}
  
export default CheckerPage
  