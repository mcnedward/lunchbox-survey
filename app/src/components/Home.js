import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { fetchSurveys } from '../actions/surveyAction';

const styles = theme => ({
  emptyStyle: {
    padding: theme.spacing.unit * 2
  },
  listStyle: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
})

class Home extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSurveys());
  }

  render() {
    const { classes, surveys } = this.props;

    let contents;
    if (surveys == null || surveys.length === 0) {
      contents = (
        <h3 className={classes.emptyStyle}>No surveys yet!</h3>
      );
    } else {
      let items = [];
      for (let survey of surveys) {
        let el = (
          <ListItem button key={survey.id}>
            <ListItemText primary={survey.name} />
          </ListItem>
        );
        items.push(el);
      }
      contents = (
        <List component="nav">
          {items}
        </List>
      )
    }

    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Grid container justify="center" spacing={Number('16')}>
            <Grid item>
              <Paper className={classes.paperStyle}>
                {contents}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { surveyState } = state;
  return { surveys: surveyState.surveys };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Home)));
