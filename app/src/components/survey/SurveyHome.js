import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withSnackbar } from 'notistack';

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

  componentDidUpdate() {
    let { error } = this.props;

    if (error) {
      this.props.enqueueSnackbar(error, { variant: 'error' });
    }
  }

  render() {
    let { classes, surveys } = this.props;

    if (surveys == null) surveys = [];

    let title = surveys.length === 0 ?
      'No surveys yet!' :
      'Please select a survey to start';

    return (
      <div>
        <Typography color="primary" variant="h4" className={classes.padding}>
          {title}
        </Typography>
        <List component="nav">
          {surveys.map(survey => {
            let to = `/survey/${survey._id}`;
            return (
              <ListItem button component={Link} to={to} key={survey._id}>
                <ListItemText primary={survey.name} />
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { surveyState } = state;

  return {
    surveys: surveyState.surveys,
    error: surveyState.error
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(withSnackbar(SurveyHome))));
