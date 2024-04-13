const Web3 = require('web3');
const { abi: tokenPoolAbi } = require('./TokenPool.json');
const { abi: tokenSwappingAbi } = require('./swap.json');

// Initialize Web3
const web3 = new Web3('https://sepolia.infura.io/v3/778da54755694b53ba306a480ad551b3'); // Use the appropriate provider URL

// Set the contract addresses
const tokenPoolAddress = '0x29ae73BDeC67373eCeADd0C0f1939D1300B3D7cA';
const tokenSwappingAddress = '0x44B5B33dd4fa76F3EA454D3B80e87C01119872aC';

// Initialize the contracts
const tokenPoolContract = new web3.eth.Contract(tokenPoolAbi, tokenPoolAddress);
const tokenSwappingContract = new web3.eth.Contract(tokenSwappingAbi, tokenSwappingAddress);

// Function to approve token transfer
async function approveTokenTransfer() {
    const spenderAddress = document.getElementById('spenderAddress').value;
    const tokenAddress = document.getElementById('tokenAddress').value;
    const amount = document.getElementById('amount').value;

    try {
        const accounts = await web3.eth.getAccounts();
        await tokenPoolContract.methods.approveTokenTransfer(spenderAddress, tokenAddress, amount).send({
            from: accounts[0],
            gas: 300000, // Adjust gas limit as needed
        });
        alert('Approval successful');
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    }
}

// Function to deposit token into pool
async function depositToken() {
    const tokenAddress = document.getElementById('depositTokenAddress').value;
    const amount = document.getElementById('depositAmount').value;

    try {
        const accounts = await web3.eth.getAccounts();
        await tokenPoolContract.methods.depositToken(tokenAddress, amount).send({
            from: accounts[0],
            gas: 300000, // Adjust gas limit as needed
        });
        alert('Deposit successful');
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    }
}

// Function to swap gold for tokens
async function swapGoldForTokens() {
    try {
        const accounts = await web3.eth.getAccounts();
        await tokenSwappingContract.methods.swapGoldForTokens().send({
            from: accounts[0],
            gas: 300000, // Adjust gas limit as needed
        });
        alert('Swap successful');
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    }
}
