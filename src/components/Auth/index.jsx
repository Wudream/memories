import React, { useState } from 'react'
import { Avatar,Button,Typography,Grid,Container,Paper} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';

import useStyles from './styles'
import Input from './Input'
import { signup, signin}from '../../actions/auth'

const intialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

const Auth = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(intialState)
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleChange=(e)=>{
        setFormData({ ...formData,[e.target.name]:e.target.value})
    }
   
    const handleSubmit=(e)=>{
        // 提交表单防止浏览器出现默认行为刷新
        e.preventDefault()
        
        if (isSignup) {
            dispatch(signup(formData,history))
        } else {
            dispatch(signin(formData,history))
        }
    }

    //注册登录页面的切换
    const switchMode=()=>{
        setIsSignup((prevIsSignup)=>!prevIsSignup)
        setShowPassword(false)
    }

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">{isSignup?'Sign up':'Sign in'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup&&(
                            <>
                            <Input name='firstName' label="Frist Name" handleChange={handleChange} autoFocus half />
                            <Input name='lastName' label="Last Name" handleChange={handleChange} autoFocus half />
                            </>
                        )
                    }
                    <Input name='email' lable='Email Address' handleChange={handleChange} type="email"/>
                    <Input name="password" label='Password' handleChange={handleChange} type={showPassword?'text':'password'} handleShowPassword={handleShowPassword}/>
                    {isSignup&&<Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>}
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                    {isSignup ? 'Sign UP':"Sign in"}
                </Button>
                  <Grid container justifyContent="flex-end">
                      <Grid item>
                          <Button onClick={switchMode}>
                              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                          </Button>
                      </Grid>
                  </Grid>
                
            </form>
        </Paper>

    </Container>
  )
}

export default Auth