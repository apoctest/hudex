import { getLanguageText } from "../hooks/formatter"
import useMedia from "use-media"
import Main from "../components/layouts/Main"
import Mobile from "../components/layouts/Mobile"
import DashboardMobile from  "../components/modules/Dashboard/mobile"
import DashboardMain from  "../components/modules/Dashboard/main"

function HomePage() {
    const isMobile = useMedia({ maxWidth: 767 })
    const lang = getLanguageText("en")

    if(isMobile) {
        return (
            <Mobile lang={lang}>
                <DashboardMobile lang={lang} />
            </Mobile>
        )
    } else {
        return (
            <Main lang={lang}>
                <DashboardMain lang={lang} />
            </Main>
        )
    }    
}
  
export default HomePage
  