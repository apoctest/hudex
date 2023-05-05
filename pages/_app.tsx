import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { Web3Modal } from '@web3modal/react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { bsc, arbitrum, mainnet, polygon } from 'wagmi/chains'
import Head from "next/head"
import "../styles/globals.css"

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
    throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

// 2. Configure wagmi client
const chains = [bsc, arbitrum, mainnet, polygon]
  
const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider
})
  
// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains)
  
export default function App({ Component, pageProps }: AppProps) {
    
    const [ready, setReady] = useState(false)

    useEffect(() => {
      setReady(true)
    }, [])
  
    return (
        <div>
            {ready ? (
                <WagmiConfig client={wagmiClient}>
            <Head>
                <title>Hudex.io</title>
                <link rel="icon" href="/assets/hudex.ico" />
                <meta name="description" content="Hudex" />
                <meta name="developer" content="Nizar Syahmi — Designer, Programmer, Strategist & Writer (https://nizarsyahmi37.com)" />
                <meta name="tech-support" content="Revoluzion — Revolutionizing The Blockchain Industry (https://revoluzion.io)" />
            </Head>
            <Component {...pageProps} />
                </WagmiConfig>
            ) : null}
    
            <Web3Modal
                projectId={projectId}
                ethereumClient={ethereumClient}
                themeVariables={{
                    '--w3m-font-family': 'Source Code Pro, Arial, Helvetica, sans-serif',
                    '--w3m-accent-color': '#CC1388FF',
                    '--w3m-background-color': '#CC1388FF',
                    '--w3m-z-index': '99',
                }}
            />
        </div>  
    )
}