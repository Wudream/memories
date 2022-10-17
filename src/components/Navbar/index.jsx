import React,{ useEffect } from 'react'
import { AppBar, Button, Toolbar, Typography, Avatar } from '@material-ui/core'
import {Link, useHistory, useLocation} from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
 
import memories from '../../images/memories.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles'

const Navbar = () => {
    const classes = useStyles()
    const location = useLocation();
    const dispatch = useDispatch()
    const history = useHistory()
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const logout =()=>{
        dispatch({type:actionType.LOGOUT})
        history.push('/auth');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

  return (
      <AppBar className={classes.appBar} position='static' color='inherit'>
          <div className={classes.brandContainer}>
              <Typography  component={Link} to='/' className={classes.heading} variant='h2' align='center'>Mermories</Typography>
              <img className={classes.image} src={memories} alt="memories" height='60' />
          </div>
          <Toolbar className={classes.toolbar}>
            {
                user?.result ?(
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} sec={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to="/auth" variant='contained' color='primary'>Sign in</Button>
                )
            }
          </Toolbar>
      </AppBar>
  )
}

export default Navbar