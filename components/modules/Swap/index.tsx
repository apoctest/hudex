import { BLOCKCHAIN_NAME, CHAIN_TYPE, OnChainTrade, OnChainTradeType, PANCAKE_SWAP_PROVIDER_CONFIGURATION, SDK, WalletProvider } from "rubic-sdk"
import { configuration } from "../../constants/sdk-config"
import { useAccount } from "wagmi"
import Web3 from "web3"
import { useEffect, useState } from "react"

export default function Swap({ swapped, firstTokenSymbol, firstTokenAddress, secondTokenSymbol, secondTokenAddress, lang }) {
    
    const {address} = useAccount()
    const [fromAmount, setFromAmount] = useState(1)
    const [toAmount, setToAmount] = useState(0)
    const [isSwap, setIsSwap] = useState(false)
    const [loading, setLoading] = useState(false)
    const [check, setCheck] = useState(false)
    const [firstLoad, setFirstLoad] = useState(false)
    const [bestTrade, setBestTrade] = useState<OnChainTrade>()

    const blockchain = BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN
    var fromTokenAddress = firstTokenAddress === PANCAKE_SWAP_PROVIDER_CONFIGURATION.wethAddress ? "0x0000000000000000000000000000000000000000" : firstTokenAddress
    var toTokenAddress = secondTokenAddress === PANCAKE_SWAP_PROVIDER_CONFIGURATION.wethAddress ? "0x0000000000000000000000000000000000000000" : secondTokenAddress
    
    const walletProvider: WalletProvider = {
        [CHAIN_TYPE.EVM]: {
            address: address, // user wallet address
            core: Web3.givenProvider
        }
    }

    const checkTrade = async (value) => {
        const sdk = await SDK.createSDK(configuration)
        sdk.updateWalletProvider(walletProvider)

        const trades = await sdk.onChainManager.calculateTrade(
            { 
                blockchain,
                address: fromTokenAddress 
            }, 
            value,
            toTokenAddress,
            {
                slippageTolerance: 0.49
            }
        )
        
        var bestTrade = trades[0]
        var best = false

        trades.forEach(trade => {
            const tradeType: OnChainTradeType = trade.type
            
            if (trade instanceof OnChainTrade) {
                if (!best) {
                    bestTrade = trade
                    console.log(`to amount: ${trade.to.tokenAmount.toFormat(3)}`)
                }
            } else {
               console.log(`error: ${trade.error}`)
            }
        })

        if (bestTrade instanceof OnChainTrade) {
            setToAmount(Number(bestTrade.to.tokenAmount.toFormat(3)))
            setBestTrade(bestTrade)
        }
    }

    const swap = async () => {
        const onConfirm = (hash: string) => alert("Txn successful: " + hash)

        if (bestTrade instanceof OnChainTrade) {
            try {
                await bestTrade.swap({ onConfirm })
            } catch (error) {
                alert(error)
                console.log(error)
            }
        }               
    }

    const handleChange = async (value: number) => {
        setFromAmount(value)
        setLoading(true)
        setCheck(false)
        if (value > 0) {
            await checkTrade(value)
        } else {
            setFromAmount(0)
            setToAmount(0)
        }
        setLoading(false)
        setCheck(true)
    }

    useEffect(() => {
        if (!firstLoad && firstTokenAddress !== null && firstTokenAddress !== undefined && firstTokenAddress !== "" && secondTokenAddress !== null && secondTokenAddress !== undefined && secondTokenAddress !== "") {
            setTimeout(() => {
                setFirstLoad(true)
                handleChange(1)
            }, 1000)
        }
    }, [setFirstLoad, handleChange, fromTokenAddress, toTokenAddress])

    useEffect(() => {
        if (swapped !== isSwap) {
            setIsSwap(swapped)
            setTimeout(() => {
                handleChange(1)
            }, 1000)
        }
    }, [setFirstLoad, swapped, handleChange, fromTokenAddress, toTokenAddress])

    return (
        <div className="padding-side-default">
            <h2 className="padding-side-default" >
                HuSwap
            </h2>
            <div className="padding-side-default" >
                {lang["general"].from + ": " + (!firstTokenSymbol ? "" : firstTokenSymbol === "WBNB" ? "BNB" : firstTokenSymbol)}
            </div>
            <br/>
            <div className="input-area">
                <input type="number" className="input-bar" placeholder={lang["general"].placeholderAmount + " " + (firstTokenSymbol ? firstTokenSymbol : "")} value={fromAmount} onChange={(e) => {handleChange(Number(e.target.value))}} />
            </div>
            <br/>
            <div className="padding-side-default" >
                {lang["general"].to + ": " + (!secondTokenSymbol ? "" : secondTokenSymbol === "WBNB" ? "BNB" : secondTokenSymbol)}
            </div>
            <br/>
            <div className="input-area">
                <input disabled type="number" className="input-bar" placeholder={
                    loading ? (lang["general"].loading) : (
                        check ? (
                            toAmount + " " + (!secondTokenSymbol ? "" : secondTokenSymbol === "WBNB" ? "BNB" : secondTokenSymbol)
                        ) : (
                            lang["general"].placeholderAmount + " " + (!firstTokenSymbol ? "" : firstTokenSymbol === "WBNB" ? "BNB" : firstTokenSymbol)
                        )
                    )
                } />
            </div>
            <br />
            <div className="padding-side-default" onClick={() => swap()}>
                <button className="button-swap margin-bottom-1_2">
                    <p>Swap</p>
                </button>
            </div>
            <br />
        </div>
    )
}