import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { getAllSurveys } from '../../actions/surveyAction';

const styles = theme => ({
  padding: {
    padding: theme.spacing.unit * 2
  },
  listStyle: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
})

class SurveyorHome extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllSurveys());
  }

  render() {
    let { classes, surveys } = this.props;

    if (surveys == null) surveys = [];

    let title = surveys.length === 0 ?
      'You haven\'t created any surveys yet!' :
      'Surveys created by you';

    let items = [];
    for (let survey of surveys) {
      let to = `/surveyor/surveys/${survey.id}`;
      let el = (
        <ListItem button component={Link} to={to} key={survey.id}>
          <ListItemText primary={survey.name} />
        </ListItem>
      );
      items.push(el);
    }

    return (
      <div>
        <Typography color="primary" variant="h4" className={classes.padding}>
          {title}
        </Typography>
        <List component="nav">
          {items}
        </List>

        <div className={classes.padding}>
          <Button fullWidth variant="contained" color="primary" component={Link} to="surveyor/surveys">
            Create new survey
          </Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { surveyState } = state;
  return { surveys: surveyState.surveys };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(SurveyorHome)));
