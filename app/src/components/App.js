import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import SurveyHome from './survey/SurveyHome';
import Survey from './survey/Survey';
import SurveyorHome from './surveyor/SurveyorHome';
import CreateSurvey from './surveyor/CreateSurvey';
import SurveyResponse from './surveyor/SurveyResponse';

const styles = theme => ({
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
            <Typography variant="h6" color="inherit">
              Lunchbox | Survey
          </Typography>
          </Toolbar>
        </AppBar>

        <Grid container justify="center" className={classes.appContainer}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={8}>
              <Grid item className={classes.contentsContainer}>
                <Paper className={classes.paper}>
                  <Route path="/" exact component={SurveyHome} />
                  <Route path="/survey/:id" exact component={Survey} />
                  <Route path="/surveyor/" exact component={SurveyorHome} />
                  <Route path="/surveyor/surveys" exact component={CreateSurvey} />
                  <Route path="/surveyor/surveys:id" exact component={SurveyResponse} />
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