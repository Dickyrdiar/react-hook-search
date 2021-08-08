import React, {Fragment, useEffect, useState} from 'react' 
import axios from 'axios'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
// import DirectionsIcon from '@material-ui/icons/Directions';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '4px 8px',
      display: 'flex',
      alignItems: 'center',
      width: 600,
      marginTop: 98,
      marginLeft: 300,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    rootCard: {
        marginTop: 40,
        padding: '4px 8px',
        display: 'flex',
        alignItems: 'center',
        width: 550,
        marginLeft: 320
    },
    bullet: {
        display: 'inline-block', 
        margin: '0 2px', 
        transform: 'scale(0.8)'
    },
    title: {
        fontSize: 14
    }, 
    pos: {
        marginBottom: 12
    }
}));

const HomeDepo = () => {
    // eslint-disable-next-line no-unused-vars
    const classes = useStyles()
    const [data, setData] = useState({
        hits: []
    })
    const [query, setQuery] = useState('')
    const[loading, setLoading] = useState(false)
    const[isError, setError] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        // eslint-disable-next-line no-unused-vars 
        const fetchData = async () => {
            setError(false)
            setLoading(true)
           
            try {
                const result = await axios(`https://hn.algolia.com/api/v1/search?query=${query}`)
                setData(result.data)
                console.log(result)
            } catch (error) {
                setError(true)
            }

            setLoading(false)
        }
        fetchData()
    }, [query])

    return(
        <Fragment>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper component="form" className={classes.root}>

                            <InputBase 
                                className={classes.input}
                                placeholder="Search doodle"
                                type="text"
                                value={query}
                                onChange= {event => setQuery(event.target.value)}
                                inputProps={{ 'arial-label' : 'Search doodle' }}
                            />

                            <IconButton type="submit" className={classes.iconButton} arial-lable="search" onClick={() => setQuery(query)}>
                                <SearchIcon />
                            </IconButton>

                        </Paper>

                        {isError && <div>Something went wrong...</div>}

                        {loading ? (
                            <div className={classes.rootCard}>loading...</div>
                        ) : (
                            <div>
                                {data.hits.map(item => (
                                    <Card className={classes.rootCard} variant="outlined">
                                        <CardContent>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom key={item.objectID}>
                                                <a href={item.url}>{item.title}</a>
                                            </Typography>

                                            <Typography variant="body2" component="p">
                                                {item.url}
                                            <br />
                                                {item.story_text}
                                            </Typography>

                                            {/* <Typography className={classes.pos} color="textSecondary">
                                                {item.created_at_i}
                                            </Typography> */}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
}

export default HomeDepo