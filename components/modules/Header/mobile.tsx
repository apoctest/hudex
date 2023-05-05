import { useRouter } from "next/router"

export default function Header() {

    const router = useRouter()

    return (
        <div>
            <a href="/">
                <img src="/assets/img/hudex.png" />
                <span>Hudex</span>
            </a>
        </div>
    )
}