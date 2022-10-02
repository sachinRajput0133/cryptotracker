// import styled from '@emotion/styled'
import { AppBar, createTheme, MenuItem, Select, ThemeProvider, Toolbar ,Typography} from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../ContextTest'
import './Header.css'

const Header = () => {

const navigate=useNavigate()
const {currency,setCurrency}=CryptoState()
console.log(currency)
const dartTheme=createTheme({
  palette:{
    mode:'dark',
    primary:{
      main:'#fff',
    }
  }
})

  return (
    <div>
    <AppBar  color='transparent'  position='static' >
    
    <Container>

      <Toolbar>
        <Typography  variant='h6' className='title'  onClick={()=>navigate('/')}  >
          Crypto Tracker
        </Typography>
        <ThemeProvider theme={dartTheme}>
        <Select variant='outlined'  value={currency} onChange={(e)=>setCurrency(e.target.value)}   style={{width:100,height: 40,color:'white',marginRight:15}} >
          <MenuItem value={'USD'} >USD</MenuItem>
          <MenuItem  value={'INR'}>INR</MenuItem>
        </Select>
        </ThemeProvider>
      </Toolbar>
    </Container>

    </AppBar>
    </div>
  )
}

export default Header
