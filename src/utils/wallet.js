// - Function to connect metamask wallet
async function connectWallet() {
    const { ethereum } = window
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return {status: "connected", account: accounts[0] || ""}
}
// - Function to get connected metamask wallet 
async function getCurrentWalletConnected() {
    const { ethereum } = window

    const accounts = await ethereum.request({
        method: 'eth_accounts',
    });
    if(accounts > 0){
        return {
            status: "connected",
            account: accounts[0]
        }
    } else {
        return {
            status: "Please, connect to metamask",
            account: ""
        }
    }
}

export { connectWallet, getCurrentWalletConnected }