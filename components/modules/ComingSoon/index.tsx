export default function ComingSoon({ lang }) {
    return (
        <div className="margin-auto txt-center">
            <h1>
                {lang["general"].comingSoon}
            </h1>
            <p>
                {lang["general"].comingSoonMessage}
            </p>
        </div>
    )
}