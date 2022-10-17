import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'

import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'

export default function Form({ CurrentId, setCurrentId }) {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })
  const post = useSelector((state) => CurrentId ? state.posts.find((p) => p._id === CurrentId) : null)
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  //清空输入框的内容
  const clear = () => {

    setCurrentId(null);
    //清空状态
    setPostData({ title: '', message: '', tags: '', selectedFile: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // 创建更新贴子
    if (CurrentId) {
      dispatch(updatePost(CurrentId, { ...postData, name: user?.result?.name }))
      clear()

    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }))
      clear()
    }
  }

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align='center'>
          Pleace Sign In to create you own memories and like others memorise!
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}></form>
      <Typography variant="h6">{CurrentId ? 'Editing' : 'Creating'} a Memory</Typography>
      <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
      <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
      <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
      <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
      <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onClick={handleSubmit}>Submit</Button>
      <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
    </Paper>
  )
}
