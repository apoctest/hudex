import ButtonNetworkModal from "../modules/Button/Network/main"
import ButtonConnect from "../modules/Button/Connect/main"
import Header from "../modules/Header/main"
import Search from "../modules/Search/main"

type LayoutProps = {
    lang: any,
    children: React.ReactNode,
}
  
export default function Main({ lang, children } : LayoutProps) {
    return (
        <div className="layout-main">
            <Header lang={lang} />
            <div className="layout-main-display">
                <div className="topbar layout-topbar">
                    <Search lang={lang} />
                    <div className="padding-default content-center">
                        <ButtonNetworkModal lang={lang} />
                    </div>
                    <div className="padding-default content-center">
                        <ButtonConnect lang={lang} />
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}
