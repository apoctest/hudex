import { getLanguageText } from "../hooks/formatter"
import useMedia from "use-media"
import Main from "../components/layouts/Main"
import Mobile from "../components/layouts/Mobile"
import Chart from "../components/modules/Chart/main"

function ChartPage() {
    const isMobile = useMedia({ maxWidth: 767 })
    const lang = getLanguageText("en")

    if(isMobile) {
        return (
            <Mobile lang={lang}>
                <Chart lang={lang} />
            </Mobile>
        )
    } else {
        return (
            <Main lang={lang}>
                <Chart lang={lang} />
            </Main>
        )
    }    
}
  
export default ChartPage
  