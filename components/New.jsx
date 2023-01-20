import styles from "../styles/Home.module.css"
import {ethers} from "ethers"
import {abi, xyzContractAddress } from "../constants"
import { useState, useEffect } from 'react'
import { useNotification } from 'web3uikit'


const New = () => {

    const [_name, setName] = useState("")
    const [_symbol, setSymbol] = useState("")
    const [_decimals, setDecimals] = useState("0")
    const [maxSupply, setMaxSupply] = useState("0")
    const [_totalSupply, setTotalSupply] = useState("0")
    const [_receivingAddresses, setAddresses] = useState([])
    const [_balance, setBalance] = useState("0")
    const [address, setAddress] = useState("0x")
    const [events, setEvents] = useState([])


    // const provider = ethers.getDefaultProvider("goerli", {
    //     alchemy: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
    // })

    // if (typeof window !== "undefined") {
    //     provider = new ethers.providers.Web3Provider(window.ethereum)
    //     const signer = provider.getSigner()
    //     console.log(await signer.getAddress())
    // }

    const provider = new ethers.providers.WebSocketProvider(process.env.NEXT_PUBLIC_ALCHEMY_WEBSOCKET_URL)
   
    const xyzcontract = new ethers.Contract(xyzContractAddress, abi, provider)

    const dispatch = useNotification()

    const handleSuccess = async function(balance) {
        handleNewNotification(balance)
    }

    function handleNewNotification(balance) {
        const addrLen = address.length
        dispatch({
            title: `${address.slice(0, 6)}...${address.slice(addrLen-6, addrLen)} Balance`,
            message:`Balance is ${ethers.utils.formatUnits(balance, 18)}`,
            type: "info",
            position: "bottomR",
            icon: "",
        })
    }

    const getBalanceOf = async () => {
        const addressToCheck = document.getElementById("addressToCheck")
        if (addressToCheck.value.length > 2) {
            setAddress(addressToCheck.value)
            const balance = (await xyzcontract.balanceOf(addressToCheck.value)).toString()
            console.log(`Balance : ${balance}`)
            setBalance(balance)
            addressToCheck.value=""
            handleSuccess(balance)
        } else {
            alert("Please provide a valid address")
        }
    }

    //  Receive an event when ANY miniting occurs
        xyzcontract.on("Minted", (receiver, amount, time, event) => {
            var date = new Date(time.toString()*1000);
            console.log(date) 
            let info = {
                receiver: receiver,
                amount: ethers.utils.formatUnits(amount, 18),
                time: date,
                event: event
            }
            setEvents([...events, info])
            let details = `${ info.amount } received by ${ info.receiver } 
            at ${ info.time}`
            setNotification(details)
            
            // The event object contains the verbatim log data, the
            // EventFragment and functions to fetch the block,
            // transaction and receipt and event functions
        });

    const setNotification = (details) => {
        dispatch({
            title: "Minted",
            message: details,
            type: "info",
            position: "topR",
            icon: "",
        })
    }

    useEffect(() => {
        async function updateUI() {
            
            const tokenName = await xyzcontract.name()
            setName(tokenName)

            const tokenSymbol = await xyzcontract.symbol()
             setSymbol(tokenSymbol)

            const tokenTotalSupply = (await xyzcontract.totalSupply()).toString()
            setTotalSupply(ethers.utils.formatEther(tokenTotalSupply))

            const tokenMaxSupply = (await xyzcontract.MAX_SUPPLY()).toString()
            setMaxSupply(ethers.utils.formatEther(tokenMaxSupply))

            const decimals = await xyzcontract.decimals()
            setDecimals(decimals)

            const addresses = await xyzcontract.getReceivingAddresses()
            setAddresses(addresses)
        }
        updateUI()
    }, [])

    setInterval( async () => {
        const tokenTotalSupply = (await xyzcontract.totalSupply()).toString()
        setTotalSupply(ethers.utils.formatEther(tokenTotalSupply))
    }, 60000)

    return (
        <>
        <div className='font-mono p-5 mx-3'>
            Token Name: {_name} <br/>
            Token Symbol: {_symbol} <br/>
            Decimals: { _decimals } <br/>
            Maximum Supply is { maxSupply } <br/>
            Total Supply is { _totalSupply } <br/>
            Receiving addresses: 
            <div  className="my-2">

                {
                    _receivingAddresses.map((address, index) => (
                        <h6 key={index} className=" text-white bg-neutral-400 px-5 py-1"> {address} </h6>
                    ))
                }
            </div>

            <div className='flex items-center'>
                <input type="text" name="" id="addressToCheck" placeholder='Enter address to get balance' className='border-2 w-96 px-2 h-12'/>
                <button onClick={getBalanceOf}
                className="m-5 flex items-center px-4 py-3 text-white rounded-lg bg-blue-500 hover:bg-blue-400">
                    Get Balance
                </button>
            </div>

            <div>
                {
                    address.length>2 ? (
                        <h5>Balance of {`${address.slice(0,4)}...${address.slice(address.length-4, address.length)} is ${_balance}`}</h5>
                    ): (<h4>Provide an XYZ token address to get balance</h4>)
                }
            </div>
            <h1 className={styles.latest_header}>Latest Transactions</h1>
            <div className={styles.latest}>

            </div>

        </div>
        </>
    )
}

export default New