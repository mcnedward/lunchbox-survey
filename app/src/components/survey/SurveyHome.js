import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import Typography from "@material-ui/core/Typography";
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

class SurveyHome extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllSurveys());
  }

  render() {
    let { classes, surveys } = this.props;

    if (surveys == null) surveys = [];

    let title = surveys.length === 0 ?
      'No surveys yet!' :
      'Please select a survey to start';

    let items = [];
    for (let survey of surveys) {
      let to = `/survey/${survey.id}`;
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
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { surveyState } = state;
  return { surveys: surveyState.surveys };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(SurveyHome)));
