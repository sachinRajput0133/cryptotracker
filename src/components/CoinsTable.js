import axios from "axios";
import React, { useState } from "react";
import { CryptoState } from "../ContextTest";
import { CoinList } from "../Config/api";
import {
  Container,
  createTheme,
  LinearProgress,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  TableBody,
  Pagination,
  
} from "@mui/material";


import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CoinsTable = () => {
  const [coinList, setCoinList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency,symbol } = CryptoState();
const navigate=useNavigate()
const [page,setPage]=useState(1)



  function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g , ',')
        }
  const fetchList = async () => {
    setLoading(true);
    const  {data}  = await axios.get(CoinList(currency));
    console.log(data);
    setCoinList(data);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchList();
    // eslint-disable-next-line
  }, [currency,symbol]);

  const darkTheme = createTheme({
    palette: {
      mode:'dark',
      primary: {
        main: "#fff",
      },
    },
  });
  console.log(search);

  const handelSearch=()=>{
    return coinList.filter((coin)=>
        coin.name.toLowerCase().includes(search.toLowerCase())  || coin.symbol.toLowerCase().includes(search.toLowerCase())
    )
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          varient="h4"
          style={{ margin: 18, fontFamily: "Montserrat", fontSize: "2rem" }}
        >
          Cryptocurrency by market cap
        </Typography>
        <TextField
          label="search for a crypto currency"
          variant="outlined"
          style={{
            marginBottom: 20,
            width: "100%",
            borderBottom: ".1px solid white",
            borderRadius: "4px",
            color: "white",
          }}
          onChange={(e) => setSearch(e.target.value)}
        ></TextField>
        <TableContainer>
          {loading ? (
            <LinearProgress
              style={{ backgroundColor: "gold" }}
            ></LinearProgress>
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => {
                    return (
                      <TableCell
                        style={{ fontWeight: "700" }}
                        key={head}
                        align={head === 'Coin'? 'justify': 'right'}
                      >
                     
                        {head}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>

                {
                    handelSearch().slice((page-1)*10, ((page-1)*10+10) ).map((c)=>{
                        const profit= c.price_change_percentage_24h >= 0 ;
                        return(
                     <TableRow   onClick={()=>navigate(`./coin/${c.id}`)} key={c.id} style={{textColor:'white',cursor:'pointer','&:hover':{color:'grey'}}} >
                        <TableCell   style={{display:'flex',gap:15 }} ><img   style={{height:30}} src={c.image} alt={c.name} />  <div className="names"  style={{display:'flex',flexDirection:'column',justifyContent:'center'}} >
                        <span className="color"  style={{color:'white'}} >{c.symbol}</span> <span  style={{color:'white'}}> {c.name}</span>
                            
                            </div></TableCell>
                        
                        <TableCell  style={{color:'white'}} className="color" align="right"   >{symbol}{numberWithCommas(c.current_price)
}</TableCell>
                        <TableCell style={{color:profit? 'green' : 'red'}} align="right">{profit? '+':''}  {c.price_change_percentage_24h.toFixed(2)}%</TableCell>
                        <TableCell   style={{color:'white'}} align="right">{ numberWithCommas(c.market_cap.toString().slice(0,-6))} M</TableCell>
                     </TableRow>


                        )
                    })
                }
                


              </TableBody>
         </Table>
          )}
        </TableContainer>
        <Pagination  style={{color:'white',padding:'20px',width:'100%',display:'flex',justifyContent:'center'}}  count={ +(handelSearch()?.length/10).toFixed(0)}  onChange={(_,value)=>{
              setPage(value)
              window.scroll(0,350)
        } } ></Pagination>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
