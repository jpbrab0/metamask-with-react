import { useState } from "react";
import { Wrapper, Button, Text} from "./styles"
import { connectWallet, getCurrentWalletConnected} from "./utils/wallet"

function App() {
  const [useWallet, setWallet] = useState("")
  const [useStatus, setStatus] = useState("")
  const ethereum = window.ethereum

  // - Function connect a wallet
  function connect(){
    const { status, account } = connectWallet()
    
    if(status === "connected") {
      setWallet(account)
      setStatus(status)
    } else {
      setStatus(status)
    }
  }
  // - Function to verify if have any wallet connected
  async function connected() {
    const { status, account } = await getCurrentWalletConnected()
    if(status === "connected") {
      setWallet(account)
      setStatus(status)
    } else {
      setStatus(status)
    }
  }

  if(ethereum) {
    // - Listener to get if wallet is disconnected
    ethereum.on("disconnect", (err) => {
      if(err) {
        throw new Error("Error in server")
      }
      setWallet("")
      setStatus("disconnected")
      window.location.reload()
    })

    // - Listener to get if wallet is changed
    ethereum.on("accountsChanged", (accounts) => {
      setWallet(accounts[0])
      setStatus("connected")
    })

    // - Run function to verify if have a connected wallet
    connected()

    return(
        <Wrapper>
          {useStatus !== "connected" && <Button onClick={connect} color="#037DD6">Connect Ethereum Wallet!</Button>}
          {useStatus === "connected" && <Text color="#000">Your ethereum address: {useWallet}</Text>}
        </Wrapper>
    )
  } else {
    return(
      <Wrapper>
        <Text color="#ff000">Ops... You dont have a Ethereum Wallet in your browser :/ </Text>
      </Wrapper>
    )
  }
}


export default App;
