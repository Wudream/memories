import React from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Auth from './components/Auth'

export default function App() {
  return (
    <BrowserRouter>
      <Container maxidth='lg'>
        <Navbar />
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/auth' exact component={Auth}/>
          </Switch>
      </Container>
    </BrowserRouter>
  )
}
