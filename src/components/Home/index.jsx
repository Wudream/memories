import React, { useEffect, useState } from 'react'
import { Grid, Container, Grow } from '@material-ui/core'

import Form from '../Form'
import Posts from '../Posts'
import { getPosts } from '../../actions/posts'
import { useDispatch } from 'react-redux'

const Home = () => {
    const dispatch = useDispatch()
    const [CurrentId, setCurrentId] = useState(0)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch, CurrentId])

    return (
        <Grow in>
            <Container >
                <Grid container justifyContent="space-between" alignItems='stretch' spacing={4}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form CurrentId={CurrentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home