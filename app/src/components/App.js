import React from 'react';
import { Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import SurveyHome from './survey/SurveyHome';
import SurveyForm from './survey/SurveyForm';
import SurveyorHome from './surveyor/SurveyorHome';
import CreateSurvey from './surveyor/CreateSurvey';
import SurveyResponse from './surveyor/response/SurveyResponse';
import { Button } from '@material-ui/core';

const styles = theme => ({
  block: {
    display: 'inline-block'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  appContainer: {
    paddingTop: theme.spacing.unit * 2
  },
  contentsContainer: {
    minWidth: '500px'
  },
  paper: {
    padding: theme.spacing.unit * 2
  }
});

class App extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h6" color="inherit" className={classes.block}>
                  <Link to="/" className={classes.link}>Lunchbox | Survey</Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="inherit" className={classes.block}>
                  <Button to="/" component={Link} className={classes.link}>Surveys</Button>
                </Typography>
                <Typography variant="h6" color="inherit" className={classes.block}>
                  <Button to="/surveyor" component={Link} className={classes.link}>Surveyor</Button>
                </Typography>
              </Grid>
            </Grid>

          </Toolbar>
        </AppBar>

        <Grid container justify="center" className={classes.appContainer}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={8}>
              <Grid item className={classes.contentsContainer}>
                <Paper className={classes.paper}>
                  <Route path="/" exact component={SurveyHome} />
                  <Route path="/survey/:id" exact component={SurveyForm} />
                  <Route path="/surveyor/" exact component={SurveyorHome} />
                  <Route path="/surveyor/surveys" exact component={CreateSurvey} />
                  <Route path="/surveyor/surveys/:id" exact component={SurveyResponse} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(App);