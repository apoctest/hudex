import ButtonConnectMain from "../modules/Button/Connect/main"
import Header from "../modules/Header/main"
import Search from "../modules/Search/main"

type LayoutProps = {
    lang: any,
    children: React.ReactNode,
}
  
export default function Mobile({ lang, children } : LayoutProps) {
    return (
        <div className="layout-main">
            <Header lang={lang} />
            <div className="layout-main-display">
                <div className="topbar layout-topbar">
                    <Search lang={lang} />
                    <div className="padding-default content-center margin-top-bottom-auto">
                        <ButtonConnectMain lang={lang} />
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}
