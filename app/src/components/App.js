import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SurveyHome from './survey/SurveyHome';
import Survey from './survey/Survey';
import SurveyorHome from './surveyor/SurveyorHome';
import CreateSurvey from './surveyor/CreateSurvey';

const style = {
  paddingTop: '10px'
}
const App = () => {
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Lunchbox | Survey
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={style}>
        <Route path="/" exact component={SurveyHome} />
        <Route path="/survey/:id" exact component={Survey} />
        <Route path="/surveyor/" exact component={SurveyorHome} />
        <Route path="/surveyor/surveys" exact component={CreateSurvey} />
      </div>
    </div>
  )
}

export default App;