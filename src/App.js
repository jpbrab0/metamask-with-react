import { useState } from "react";
import styled from "styled-components"

const Wrapper = styled.main`
  display: grid;
  place-items: center;
  height: 100vh;
`
const Button = styled.button`
  background-color: ${ props => 
    props.color
  };
  cursor: pointer;
  border: 13px;
  outline: none;
  color: #fff;
  padding: 16px;
  font-size: 1.8rem;
`
const Text = styled.h1`
  color: ${ props => props.color};
  font-size: 1.6rem;
  font-family: Ubuntu;
`

function App() {
  const [useWallet, setWallet] = useState("")
  const [useStatus, setStatus] = useState("")
  const ethereum = window.ethereum
  
  async function connectWallet() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    setWallet(accounts[0])
  }
  async function getCurrentWalletConnected() {
    const accounts = await ethereum.request({
      method: 'eth_accounts',
    });

    if(accounts > 0){
      setWallet(accounts[0])
    }
  }
  getCurrentWalletConnected()

  ethereum.on("disconnect", (err) => {
    if(err) {
      throw new Error("Error in server")
    }
    setWallet("")
    window.location.reload()
  })

  ethereum.on("accountsChanged", (accounts) => {
    setWallet(accounts[0])
  })
  return (
    <Wrapper>
      {ethereum ? 
        <div>
          {!useWallet && <Button onClick={connectWallet} color="#037DD6">Connect Ethereum Wallet!</Button>}
          {useWallet && 
            <div>
              {/* <Button onClick={disconnectWallet} color="#BB2D3B">Disconnect Wallet</Button> */}
              <Text color="#000">Your ethereum address: {useWallet}</Text>
            </div>
          }
        </div>
      :
        <Text color="#ff000">Ops... You dont have a Ethereum Wallet in your browser :/ </Text>
      }
    </Wrapper>
  );
}


export default App;
