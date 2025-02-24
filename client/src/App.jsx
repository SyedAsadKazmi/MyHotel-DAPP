import React, { useState, useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ethers } from 'ethers';
import { contractAddress, contractABI } from './constants';
import './App.css';
import Footer from './components/Footer';
import Home from './components/Home';
import Nav from './components/Nav';
import Hotels from './components/Hotels';
import Bookings from './components/Bookings';
import Profile from './components/Profile';
import Book from './components/Book'

const App = () => {
  const [contractIns, setContractIns] = useState(null);
  const [account, setAccount] = useState(null);

  const connectContract = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.error("Please install or enable MetaMask");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      setAccount(accounts[0]);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      setContractIns(contract);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Nav connectContract={connectContract} account={account}/>
        <Routes>
          <Route path="/" element={<Home contractIns={contractIns} account={account} connectContract={connectContract} />} />
          <Route path="/hotels" element={<Hotels contractIns={contractIns} account={account} connectContract={connectContract} />} />
          <Route path='/bookings' element={<Bookings contractIns={contractIns} account={account} connectContract={connectContract} />} />
          <Route path='/profile' element={<Profile contractIns={contractIns} account={account} connectContract={connectContract} />} />
          <Route path='/book' element={<Book contractIns={contractIns} account={account} connectContract={connectContract} />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App

