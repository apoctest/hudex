import { useRouter } from "next/router"

export default function Navigation({ lang }) {

    const router = useRouter()

    return (
        <div className="navigation">
            {lang["menu"].map((item) => (
                <a
                    key={"menu" + item.title}
                    className={router.pathname === item.link ? "layout-nav-item nav-item-active pointer" : "layout-nav-item nav-item pointer"}
                    href={item.link}
                >
                    <div className="menu-icon">
                        <i className={item.icon} />
                    </div>
                    <div className="menu-title">
                        <p>{item.title}</p>
                    </div>
                </a>
            ))}
        </div>
    )
}