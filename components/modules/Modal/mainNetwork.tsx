import { useEffect } from "react"

export default function Modal({ lang, onClose }) {
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose()
            }
        }
    
        const handleClickOutside = (event: MouseEvent) => {
            if ((event.target as HTMLElement).classList.contains("modal-overlay")) {
                onClose()
            }
        }
    
        document.addEventListener("keydown", handleEscapeKey)
        document.addEventListener("mousedown", handleClickOutside)
    
        return () => {
            document.removeEventListener("keydown", handleEscapeKey)
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [onClose])

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Modal Title</h2>
                <p>Modal content goes here.</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

