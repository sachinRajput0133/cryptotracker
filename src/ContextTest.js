import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";



const crypto=createContext();

const ContextTest=( {children} )=>{
const [currency,setCurrency]=useState('USD');
const [symbol,setSymbol]=useState('$');

useEffect(()=>{
if(currency==='INR')setSymbol('₹');
else if(currency==='USD')setSymbol('$');
},[currency])



return   <crypto.Provider  value={{currency,setCurrency,symbol}}  > {children}</crypto.Provider>

}


export  const  CryptoState=()=>{
    return useContext(crypto)
}


export default ContextTest;