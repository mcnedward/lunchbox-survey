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
import CircularProgress from '@material-ui/core/CircularProgress';
import getSurveys from '../../actions/survey/getSurveysAction';

const styles = theme => ({
  spinner: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2
  }
})

class SurveyHome extends React.Component {

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

    let title = surveys.length === 0 ?
      'No surveys yet!' :
      'Please select a survey to start';

    return (
      <div>
        <Typography color="primary" variant="h4">
          {title}
        </Typography>
        {isLoading ? <div className={classes.spinner}><CircularProgress/></div> : ''}
        <List component="nav">
          {surveys.map(survey => {
            let to = `/survey/${survey._id}`;
            let date = new Date(survey.createdOn).toUTCString();
            let text = `${survey.name} - ${date}`;
            return (
              <ListItem button component={Link} to={to} key={survey._id}>
                <ListItemText primary={text} />
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { getSurveysState } = state;

  return {
    surveys: getSurveysState.surveys,
    isLoading: getSurveysState.isLoading,
    error: getSurveysState.error
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(withSnackbar(SurveyHome))));
