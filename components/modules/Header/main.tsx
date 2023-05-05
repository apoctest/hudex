import { useRouter } from "next/router"
import Navigation from "../Navigation"

export default function Header({ lang }) {

    const router = useRouter()

    return (
        <div className="sidebar">
            <a className="grid-logo pointer" href="/">
                <div>
                    <img className="logo-icon" src="/assets/img/hudex.png" />
                </div>
                <div>
                    <p className="logo-title">{lang["main"].title}</p>
                </div>
            </a>
            <Navigation lang={lang} />
        </div>
    )
}