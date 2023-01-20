import React from 'react'
import styles from "../styles/Home.module.css"
import { abi, contractAddress } from "../constants"
import { useWeb3Contract } from 'react-moralis'
import { useEffect, useState } from 'react'
import {ethers} from "ethers"
import { useNotification } from 'web3uikit'

const Main = () => {
    const [_name, setName] = useState("")
    // const [_symbol, setSymbol] = useState("")
    // const [_decimals, setDecimals] = useState("0")
    // const [maxSupply, setMaxSupply] = useState("0")
    // const [_totalSupply, setTotalSupply] = useState("0")
    // const [_receivingAddresses, setAddresses] = useState([])
    // const [_balance, setBalance] = useState("0")
    // const [address, setAddress] = useState("0x")

    // const dispatch = useNotification()

    // const handleSuccess = async function() {
    //     console.log("success")
    //     handleNewNotification()
    // }

    // function handleNewNotification() {
    //     const addrLen = address.length
    //     dispatch({
    //         title: `${address.slice(0,4)}...${address.slice(addrLen-4, addrLen)} Balance`,
    //         message: `value: ${_balance}`,
    //         type: "info",
    //         position: "bottomR",
    //         icon: "",
    //     })
    // }

    const handleError = function(err) {
        console.error(err)
        dispatch( {
            title: "An error occured",
            message: `${err}`,
            type: "error",
            position: "topR"
        })
    }

    // const {runContractFunction: totalSupply} = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: contractAddress,
    //     functionName: "totalSupply",
    //     params: {},
    //     // msgValue: 
    // })

    // const {runContractFunction: MAX_SUPPLY} = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: contractAddress,
    //     functionName: "MAX_SUPPLY",
    //     params: {},
    //     // msgValue: 
    // })

    const {runContractFunction: name} = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "name",
        params: {},
        // msgValue: 
    })

    // const {runContractFunction: symbol} = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: contractAddress,
    //     functionName: "symbol",
    //     params: {},
    //     // msgValue: 
    // })

    // const {runContractFunction: decimals} = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: contractAddress,
    //     functionName: "decimals",
    //     params: {},
    //     // msgValue: 
    // })

    // const {runContractFunction: getReceivingAddresses} = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: contractAddress,
    //     functionName: "getReceivingAddresses",
    //     params: {}
    //     // msgValue: 
    // })

    // const {runContractFunction: balanceOf} = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: contractAddress,
    //     functionName: "balanceOf",
    //     params: {account: address}
    //     // msgValue: 
    // })
    
    // const getBalanceOf = async () => {
    //     const addressToCheck = document.getElementById("addressToCheck")
    //     setAddress(addressToCheck.value)
    //     const balance = (await balanceOf({
    //         onSuccess: handleSuccess,
    //     })).toString()
    //     setBalance(balance)
    //     addressToCheck.value=""
    // }

    async function updateUI() {
            
        // const totalSupplyFromCall = await totalSupply({
        //     onError: err => console.error(err)
        // })
        
        // setTotalSupply(totalSupplyFromCall)
        // console.log(`Total supply: ${_totalSupply}`)
        //
        // const maximumSupply = await MAX_SUPPLY({
        //     onError: err => console.error(err)
        // })
        // setMaxSupply(maximumSupply)
        // console.log(`Max supply: ${maxSupply}`)

        const nameFromCall = await name({
            onError: err => console.error(err)
        })
        setName(nameFromCall)
        console.log(`name: ${_name}`)

        // const symbolFromCall = await symbol({
        //     onError: err => console.error(err)
        // })
        // setSymbol(symbolFromCall)
        // console.log(`symbol: ${_symbol}`)

        // const decimalsFromCall = await decimals({
        //     onError: err => console.error(err)
        // })
        // setDecimals(decimalsFromCall)
        // console.log(`Decimals: ${_decimals}`)

        // receivers = await getReceivingAddresses({
        //     onError: err => console.error(err)
        // })
        // setAddresses(receivers)
    }

    useEffect(() => {
       updateUI()
    }, [])
    // ethers.utils.formatUnits(maxSupply, "ether")
    return (
        <>
        <div className='font-mono p-5 mx-3'>
            Token Name: {_name} <br/>
            {/* Token Symbol: {_symbol} <br/>
            Decimals: { _decimals } <br/>
            Maximum Supply is { maxSupply } <br/>
            Total Supply is { _totalSupply } <br/> */}
            {/* Receiving addresses: 
            <div  className="my-2"> */}
                {/* {_receivingAddresses.length} */}
                {/* {
                    _receivingAddresses.map((address, index) => (
                        <h6 key={index} className=" text-white bg-neutral-400 px-5 py-1"> {address} </h6>
                    ))
                }
            </div> */}

            {/* <div className='flex items-center'>
                <input type="text" name="" id="addressToCheck" placeholder='Enter address to get balance' className='border-2 w-96 px-2 h-12'/>
                <button onClick={getBalanceOf}
                className="m-5 flex items-center px-4 py-3 text-white rounded-lg bg-blue-500 hover:bg-blue-400">
                    Get Balance
                </button>
            </div> */}

            {/* <div>
                {
                    address.length>2 ? (
                        <h5>Balance of {`${address.slice(0,4)}...${address.slice(address.length-4, address.length)} is ${_balance}`}</h5>
                    ): (<h4>Provide an XYZ token address to get balance</h4>)
                }
            </div> */}

        </div>
        </>
    )
}

export default Main