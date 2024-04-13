'use client'
import React, { useState } from 'react';
import Web3 from 'web3';
import tokenPoolAbi from './TokenPool.json';
import tokenSwappingAbi from './swap.json';

const web3 = new Web3('https://sepolia.infura.io/v3/778da54755694b53ba306a480ad551b3'); // Use the appropriate provider URL

// const tokenPoolAddress = 'TOKEN_POOL_CONTRACT_ADDRESS';
// const tokenSwappingAddress = 'TOKEN_SWAPPING_CONTRACT_ADDRESS';

const tokenPoolAddress = '0x29ae73BDeC67373eCeADd0C0f1939D1300B3D7cA';
const tokenSwappingAddress = '0x44B5B33dd4fa76F3EA454D3B80e87C01119872aC';

const tokenPoolContract = new web3.eth.Contract(tokenPoolAbi, tokenPoolAddress);
const tokenSwappingContract = new web3.eth.Contract(tokenSwappingAbi, tokenSwappingAddress);

const App = () => {
  const [spenderAddress, setSpenderAddress] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [depositTokenAddress, setDepositTokenAddress] = useState('');
  const [depositAmount, setDepositAmount] = useState('');

  const approveTokenTransfer = async () => {
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
  };

  const depositToken = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await tokenPoolContract.methods.depositToken(depositTokenAddress, depositAmount).send({
        from: accounts[0],
        gas: 300000, // Adjust gas limit as needed
      });
      alert('Deposit successful');
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  const swapGoldForTokens = async () => {
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
  };

  return (
    <div>
      <h1>Token Swapping Interface</h1>
      <div>
        <input type="text" placeholder="Spender Address" value={spenderAddress} onChange={(e) => setSpenderAddress(e.target.value)} />
        <input type="text" placeholder="Token Address" value={tokenAddress} onChange={(e) => setTokenAddress(e.target.value)} />
        <input type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={approveTokenTransfer}>Approve Token Transfer</button>
      </div>
      <div>
        <input type="text" placeholder="Token Address" value={depositTokenAddress} onChange={(e) => setDepositTokenAddress(e.target.value)} />
        <input type="text" placeholder="Amount" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
        <button onClick={depositToken}>Deposit Token</button>
      </div>
      <div>
        <button onClick={swapGoldForTokens}>Swap Gold For Tokens</button>
      </div>
    </div>
  );
};

export default App;
