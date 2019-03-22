import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Home from './Home';

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
        <Route path="/" exact render={({ location }) => {
          return <Home/>;
        }} />
      </div>
    </div>
  )
}

export default App;