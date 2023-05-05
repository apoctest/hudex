import Web3 from "web3"
import network from "../../../db/network.json"
import { useAccount } from "wagmi"

function Button({ lang }) {

    var index = 1
    const { isConnected } = useAccount()

    if (isConnected) {
        const chainID = Web3.givenProvider.chainId
        index = network["networks"].findIndex((network) => network.attributes.chain_id === Number(chainID))
    }

    return (
        <div>
            <button className="button-connect" >
                <div className={network && Number(index) >= 0 ? "layout-nav-item nav-item pointer" : "pointer"}>
                    {network && Number(index) >= 0 ? (
                        <div className="button-icon">
                            <img src={network && Number(index) >= 0 ? network["networks"][index]["attributes"].image_url : ""} />
                        </div>
                    ) : null }
                    <div className="button-title">
                        <p>{network && Number(index) >= 0 ? network["networks"][index]["attributes"].name : "Network"}</p>
                    </div>
                </div>
            </button>
        </div>
    )
}

export default Button