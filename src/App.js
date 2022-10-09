
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CoinePage from './Pages/CoinePage';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import styled from '@emotion/styled';
// import { createTheme ,ThemeProvider} from '@mui/material';

function App() {
const DivStyled =styled('div')({
  backgroundColor:'#14161a',
  color:'white',
  minHeight:'100vh'
})



  return ( 

   <BrowserRouter>

     <DivStyled  >
      <Header/>
       <Routes      >
        <Route  path='/cryptotracker' element={<Homepage/>}  />
        <Route  path='cryptotracker/coin/:id' element={<CoinePage/>}  />
       
       </Routes>
     </DivStyled>
   
   
   </BrowserRouter> 
   
  );
}

export default App;
