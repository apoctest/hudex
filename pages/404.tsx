import { getLanguageText } from "../hooks/formatter"
import useMedia from "use-media"
import Main from "../components/layouts/Main"
import Mobile from "../components/layouts/Mobile"
import Error404 from  "../components/modules/404"

function HomePage() {
    const isMobile = useMedia({ maxWidth: 767 })
    const lang = getLanguageText("en")

    if(isMobile) {
        return (
            <Mobile lang={lang}>
                <Error404 lang={lang} />
            </Mobile>
        )
    } else {
        return (
            <Main lang={lang}>
                <Error404 lang={lang} />
            </Main>
        )
    }    
}
  
export default HomePage
  