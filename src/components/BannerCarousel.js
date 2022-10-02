import { Container } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../Config/api';
import { CryptoState } from '../ContextTest';
import './BannerCarousel'

const BannerCarousel = () => {

    const [trendingData,setTrendingData]=useState();

    const {currency , symbol}=CryptoState()

    const responsive = {
        0: {
          items: 1,
        },
        512: {
          items: 5,
        },
    }

    const fetchData=async ()=>{
        const {data}=await axios.get(TrendingCoins(currency))
        console.log(data)
        setTrendingData(data)
    }
    useEffect(()=>{
      fetchData()
// eslint-disable-next-line
    },[currency])

   function numberWithCommas(x){
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g , ',')
    }


    const items=trendingData?.map((data)=>{

      let profit=data?.price_change_percentage_24h >= 0
        return (
            <Link to={`./coin/${data.id}`} className="carasoul-card"    key={data.id}   style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',color:'white',textTransform:'uppercase'}} >



                <img src={data.image} alt={data.name} style={{height:'100px',objectFit:'contain'}} />
                <span>{data.symbol}
                &nbsp;
                <span style={{color: profit ? 'green' : 'red'  }}  >{profit && '+'}  {data?.price_change_percentage_24h?.toFixed(2)}  </span>
                </span>
                <span>{symbol} {numberWithCommas(data.current_price)
}</span>

            </Link>

        )
    })



  return (
    <Container >
  
          <AliceCarousel
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          mouseTracking
          responsive={responsive}
          autoPlay
          items={items}
          infinite
          disableButtonsControls
          
          />

    </Container>
  )
}

export default BannerCarousel;
