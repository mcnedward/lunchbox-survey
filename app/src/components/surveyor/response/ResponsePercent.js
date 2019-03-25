import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  progress: {
    flexGrow: 1,
    padding: '20px'
  },
  progressBar: {
    height: '10px'
  }
})

class ResponsePercent extends React.Component {

  render() {
    let { classes, text, value, total } = this.props;

    let percent = Math.floor(value / total * 100);
    
    let progressBarClasses = {
      root: classes.progressBar
    }

    return (
      <Grid container spacing={24} alignItems="center">
        <Grid item xs={4}>
          {text} - <small>{value}/{total}</small>
        </Grid>
        <Grid item xs={8} className={classes.progress}>
          <LinearProgress variant="determinate" value={percent} classes={progressBarClasses} />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(ResponsePercent);
