import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import getSurveys from '../../actions/survey/getSurveysAction';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  spinner: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2
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
    dispatch(getSurveys());
  }

  componentDidUpdate() {
    let { error } = this.props;
    if (error) {
      this.props.enqueueSnackbar(error, { variant: 'error' });
    }
  }

  render() {
    let { classes, surveys, isLoading } = this.props;

    if (surveys == null) surveys = [];

    let title;
    if (isLoading) {
      title = 'Loading surveys...';
    } else {
      title = surveys.length === 0 ?
        'You haven\'t created any surveys yet!' :
        'Surveys created by you';
    }

    return (
      <div>
        <Typography color="primary" variant="h4">
          {title}
        </Typography>
        {isLoading ? <div className={classes.spinner}><CircularProgress /></div> : ''}
        <List component="nav">
          {surveys.map(survey => {
            let to = `/surveyor/surveys/${survey._id}`;
            let date = new Date(survey.createdOn).toUTCString();
            let text = `${survey.name} - ${date}`;
            return (
              <ListItem button component={Link} to={to} key={survey._id}>
                <ListItemText primary={text} />
              </ListItem>
            )
          })}
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

function mapStateToProps(state) {
  const { getSurveysState } = state;
  return {
    surveys: getSurveysState.surveys,
    error: getSurveysState.error,
    isLoading: getSurveysState.isLoading,
    isSubmitted: getSurveysState.isSubmitted
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(SurveyorHome)));
