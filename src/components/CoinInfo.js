import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import './CoinInfo.css'
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../Config/api";
import { CryptoState } from "../ContextTest";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { chartDays } from "../Config/cartDays";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const CoinInfo = ({ coin, id }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);

  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState();

  const fetchHistoricalData = async () => {
    setLoading(true);
    const { data } = await axios.get(HistoricalChart(id, days, currency));
    // console.log(data.prices);
    setHistoricalData(data.prices);
    setLoading(false);
  };
  console.log(historicalData);
  useEffect(() => {
    fetchHistoricalData();

    // eslint-disable-next-line
  }, [currency, days]);
  let data = {
    labels: historicalData.map((e) => {
      let date = new Date(e[0]);
      let time =
        date.getHours() > 12
          ? `${date.getHours() - 12}  : ${date.getMinutes()} PM `
          : `${date.getHours()}  : ${date.getMinutes()}AM `;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `price (past ${days}) in ${currency}`,
        data: historicalData.map((e) => {
          return e[1];
        }),

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1.5,
        borderColor: "#eebc1d",
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      legend: {
        fontSize: 40,
      },
    },
  };

  return (
    <>
    
    <div className="wrapper"style={{width:'100%',height:'100vh', display:'flex' ,flexDirection:'column',margin:'auto',alignItems:'center'}} >
    <div className="container"   >
      {loading ? (
        <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
      ) : (
        <Line data={data} options={options} style={{ color: "gold" }} />
      )}

      
    </div>
    <div className="daysBtnWrap" >
    {
      chartDays.map((day)=>{
        return (
          <button className="days-btn"    onClick={()=>setDays(day.value)} >{day.label}</button>
        )
      })
    }

    </div>
    </div>
    </>
  );
};

export default CoinInfo;
