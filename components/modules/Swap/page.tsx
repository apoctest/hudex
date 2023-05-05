import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BLOCKCHAIN_NAME, CHAIN_TYPE, OnChainTrade, OnChainTradeType, PANCAKE_SWAP_PROVIDER_CONFIGURATION, SDK, WalletProvider } from "rubic-sdk"
import { useAccount, useSigner } from "wagmi"
import { configuration } from "../../constants/sdk-config"
import Web3 from "web3"
import { Widget } from "@kyberswap/widgets";
import { Theme } from "@kyberswap/widgets/dist/theme"
import { JsonRpcSigner } from "@ethersproject/providers";
import Footer from "../Footer"

export default function SwapPage({ lang }) {

    const router = useRouter()
    const {address} = useAccount()
    const { provider } = useSigner<JsonRpcSigner>()?.data || {};

    const MY_TOKEN_LIST = [
        {
          "name": "HuDex",
          "address": "0xc06e83828aaf80a2B4883f1e260B1896bfC5bcA3",
          "symbol": "HU",
          "decimals": 9,
          "chainId": 56,
          "logoURI": "https://hudex.io/img/hudex.png"
        }
      ];  
    
      const defaultTokenOut = {
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        symbol: 'BNB',
        name: 'BNB',
        decimals: 18,
        chainId: 56,
      };
    
      const theme: Theme = {
          primary: "#17041a",
          secondary: "#404040", 
          fontFamily: "Source Code Pro, Arial, Helvetica, sans-serif", 
          text: "#cecece", 
          accent: "#CC1388",
          warning: "#f5a623",
          error: "#853627",
          subText: "#cecece",
          success: "#278565",
          dialog: "#202020",
          borderRadius: "1rem",
          stroke: "#000",
          interactive: "#202020aa",
          buttonRadius: "0.3rem",
          boxShadow: "0px 0px #000000",
      };    

    // const [swapped, setSwapped] = useState(false)
    // const [firstLoad, setFirstLoad] = useState(false)
    // const [loading, setLoading] = useState(false)
    // const [check, setCheck] = useState(false)
    // const [firstTokenAddress, setFirstTokenAddress] = useState("0x0000000000000000000000000000000000000000")
    // const [secondTokenAddress, setSecondTokenAddress] = useState("0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56")
    // const [firstTokenSymbol, setFirstTokenSymbol] = useState("BNB")
    // const [secondTokenSymbol, setSecondTokenSymbol] = useState("BUSD")
    // const [fromAmount, setFromAmount] = useState(1)
    // const [toAmount, setToAmount] = useState(0)
    // const [bestTrade, setBestTrade] = useState<OnChainTrade>()

    // const blockchain = BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN
    // const fromTokenAddress = firstTokenAddress === PANCAKE_SWAP_PROVIDER_CONFIGURATION.wethAddress ? "0x0000000000000000000000000000000000000000" : firstTokenAddress
    // const toTokenAddress = secondTokenAddress === PANCAKE_SWAP_PROVIDER_CONFIGURATION.wethAddress ? "0x0000000000000000000000000000000000000000" : secondTokenAddress

    // const walletProvider: WalletProvider = {
    //     [CHAIN_TYPE.EVM]: {
    //         address: address, // user wallet address
    //         core: Web3.givenProvider
    //     }
    // }

    // const checkTrade = async (value) => {
    //     const sdk = await SDK.createSDK(configuration)
    //     sdk.updateWalletProvider(walletProvider)

    //     const trades = await sdk.onChainManager.calculateTrade(
    //         { 
    //             blockchain,
    //             address: fromTokenAddress 
    //         }, 
    //         value,
    //         toTokenAddress,
    //         {
    //             slippageTolerance: 0.49
    //         }
    //     )
        
    //     var bestTrade = trades[0]
    //     var best = false

    //     trades.forEach(trade => {
    //         const tradeType: OnChainTradeType = trade.type
            
    //         if (trade instanceof OnChainTrade) {
    //             if (!best) {
    //                 bestTrade = trade
    //                 console.log(`to amount: ${trade.to.tokenAmount.toFormat(3)}`)
    //             }
    //         } else {
    //            console.log(`error: ${trade.error}`)
    //         }
    //     })

    //     if (bestTrade instanceof OnChainTrade) {
    //         setToAmount(Number(bestTrade.to.tokenAmount.toFormat(3)))
    //         setBestTrade(bestTrade)
    //     }
    // }

    // const swap = async () => {
    //     const onConfirm = (hash: string) => alert("Txn successful: " + hash)

    //     if (bestTrade instanceof OnChainTrade) {
    //         try {
    //             await bestTrade.swap({ onConfirm })
    //         } catch (error) {
    //             alert(error)
    //             console.log(error)
    //         }
    //     }               
    // }

    // const handleChange = async (value: number) => {
    //     setFromAmount(value)
    //     setLoading(true)
    //     setCheck(false)
    //     if (value > 0) {
    //         await checkTrade(value)
    //     } else {
    //         setFromAmount(0)
    //         setToAmount(0)
    //     }
    //     setLoading(false)
    //     setCheck(true)
    // }

    // useEffect(() => {
    //     if (!firstLoad && fromTokenAddress !== null && fromTokenAddress !== undefined && fromTokenAddress !== "" && toTokenAddress !== null && toTokenAddress !== undefined && toTokenAddress !== "") {
    //         setTimeout(() => {
    //             setFirstLoad(true)
    //             handleChange(1)
    //         }, 1000)
    //     }
    // }, [setFirstLoad, handleChange, fromTokenAddress, toTokenAddress])

    // const swapPlace = (initialToken1Address, initialToken2Address, initialToken1Symbol, initialToken2Symbol) => {
    //     setFirstTokenAddress(initialToken2Address)
    //     setSecondTokenAddress(initialToken1Address)
    //     setFirstTokenSymbol(initialToken2Symbol)
    //     setSecondTokenSymbol(initialToken1Symbol)
    //     setSwapped(!swapped)
    //     handleChange(1)
    // }

    return (
        <div className="padding-side-default margin-auto featured">
            <Widget
                client="HuDex"
                theme={theme}
                feeSetting={{
                    feeAmount: 50,
                    feeReceiver: "0x9C48405d8E4d107C9DC033993d18D60F67380ca1",
                    chargeFeeBy: "currency_in",
                    isInBps: true,
                }}
                tokenList={MY_TOKEN_LIST}
                provider={provider}
                defaultTokenOut={defaultTokenOut[56]}
            />
        </div>
    )
}
