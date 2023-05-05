export default function Custom404({ lang }) {
    return (
        <div className="margin-auto txt-center">
            <h1>
                {lang["general"].error404}
            </h1>
            <p>
                {lang["general"].error404Message}
            </p>
        </div>
    )
}