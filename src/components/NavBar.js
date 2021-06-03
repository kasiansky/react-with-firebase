import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid, Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { Container, Box } from '@material-ui/core';
import { UserContext } from '../App';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 4,
  },
}));

const NavBar = props => {
  const classes = useStyles();
  const user = useContext(UserContext);

  return (
    <div className={`${classes.root} app-navbar`}>
      <AppBar position='fixed'>
        <Container fixed>
          <Toolbar>
            <Grid container justify={'flex-end'}>
              <Typography variant='h6' className={classes.title}>
                ToDo App
              </Typography>
              {user && (
                <>
                  <Box mr={3}>
                    <Typography variant='h6' className={classes.title}>
                      Hello {user.displayName}
                    </Typography>
                  </Box>

                  <Box mr={3}>
                    <Button
                      component={Link}
                      to='/'
                      color='secondary'
                      variant='contained'
                      onClick={() => props.firebase.auth().signOut()}
                    >
                      Logout
                    </Button>
                  </Box>
                </>
              )}
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default NavBar;
