import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../Config/api";
import CoinInfo from "../components/CoinInfo";
import "./CoinPage.css";
import { LinearProgress } from "@mui/material";
// import HTMLReactParser from "html-react-parser";
import { CryptoState } from "../ContextTest";
// import { CryptoState } from '../ContextTest'

const CoinePage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState([]);
  const [loading,setLoading]=useState(false);

  const { currency, symbol } = CryptoState();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchCoin = async () => {
    setLoading(true)
    const { data } = await axios.get(SingleCoin(id));
    // console.log(data);
    setCoin(data);
    setLoading(false)
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);

  if (loading) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className="container">
      <div className="sidebar">
        {" "}
        <img
          src={coin?.image?.large}
          alt={coin.name}
          style={{
            height: "150px",
            marginBottom: "10px",
            objectFit: "contain",
          }}
        />
        <span className="coin-name">{coin.name}</span>
        <p className="description">{coin?.description?.en.split(". ")[0]}.</p>
        <div className="market-data">
          <span className="numbers"  >Rank:&nbsp; <span  >
            
            
            {coin?.market_cap_rank}</span>
            </span> 
          <span className="numbers">
            Current Price:<span style={{fontWeight:'100'}} >
             {symbol}{" "}
            {coin?.market_data?.current_price[currency.toLowerCase()]}
            </span>
          </span>
          <span className="numbers">
            Market Cap:&nbsp;  <span  style={{fontWeight:'100'}} >
            {symbol}
              
            {(
              coin?.market_data?.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)
            )}
            M
              
              </span> 
          </span>
        </div>
      </div>
      

      <CoinInfo  coin={coin} id={id} />
     
    </div>
  );
};

export default CoinePage;
