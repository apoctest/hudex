import { BLOCKCHAIN_NAME, Configuration, CHAIN_TYPE } from 'rubic-sdk'

// optional parameter
const providerAddress = {
    [CHAIN_TYPE.EVM]: {
        crossChain: "0x95dB7Abc07D6A55D77c30889f35DF200cf96Fe58",
        onChain: "0x9c48405d8e4d107c9dc033993d18d60f67380ca1"
    }
}

export const configuration: Configuration = {
    rpcProviders: {
        // optional blockchains
        [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
            rpcList: [
                "https://bsc-dataseed.binance.org"
            ]
        }
    },
    providerAddress
}