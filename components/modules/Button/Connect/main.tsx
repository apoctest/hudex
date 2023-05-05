import { useWeb3Modal } from '@web3modal/react'
import { useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'

function Button({ lang }) {
    const [loading, setLoading] = useState(false)
    const { open } = useWeb3Modal()
    const { isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const label = isConnected ? lang["general"].disconnect : lang["general"].connect
    const icon = isConnected ? "bx bx-log-out" : "bx bxs-wallet-alt"

    async function onOpen() {
        setLoading(true)
        await open()
        setLoading(false)
    }

    function onClick() {
        if (isConnected) {
            disconnect()
        } else {
            onOpen()
        }
    }

    return (
        <button onClick={onClick} disabled={loading} className="button-connect" >
            <div className="layout-nav-item nav-item pointer">
                <div className="button-icon">
                    <i className={icon} />
                </div>
                <div className="button-title">
                    <p>{loading ? lang["general"].loading : label}</p>
                </div>
            </div>
        </button>
    )
}

export default Button