import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withSnackbar } from 'notistack';
import SurveyResponseOverview from './SurveyResponseOverview';
import SurveyResponseList from './SurveyResponseList';
import { QuestionTypes } from '../../../models/question';
import getSurveyResponses from '../../../actions/surveyResponse/getSurveyResponsesAction';
import getSurvey from '../../../actions/survey/getSurveyAction';

const styles = theme => ({
  container: {
    minWidth: '800px'
  },
  header: {
    marginBottom: theme.spacing.unit * 2
  },
  btnReturn: {
    marginTop: theme.spacing.unit * 2
  }
})

class SurveyResponse extends React.Component {

  componentDidMount() {
    const { dispatch, id } = this.props;
    // Get the survey and all of the responses associated with it
    dispatch(getSurvey(id));
    dispatch(getSurveyResponses(id));
  }
  componentDidUpdate() {
    let { error } = this.props;
    if (error) {
      this.props.enqueueSnackbar(error, { variant: 'error' });
    }
  }

  render() {
    let { classes, isLoadingSurvey, isLoadingSurveyResponses, survey, surveyResponses } = this.props;

    let btnReturn = (
      <Button component={Link} to="/surveyor" color="primary" size="small" className={classes.btnReturn}>
        Back
      </Button>
    );

    if (isLoadingSurvey || isLoadingSurveyResponses) {
      return (
        <div>
          <Typography color="primary" variant="h4" gutterBottom>
            Loading survey responses
          </Typography>
          {btnReturn}
        </div>
      );
    }

    let name = (
      <Typography color="primary" variant="h4" gutterBottom>
        {survey.name}
      </Typography>
    )

    if (surveyResponses == null || surveyResponses.length === 0) {
      return (
        <div>
          {name}
          <Typography color="primary" variant="h4" className={classes.header}>
            Could not find any responses
          </Typography>
          {btnReturn}
        </div>
      );
    }

    return (
      <div className={classes.container}>
        {name}
        <Grid container spacing={32}>
          <Grid item xs={6}>
            <SurveyResponseList survey={survey} surveyResponses={surveyResponses}/>
          </Grid>
          <Grid item xs={6}>
            <SurveyResponseOverview survey={survey} surveyResponses={surveyResponses}/>
          </Grid>
        </Grid>
        {btnReturn}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { getSurveyState, getSurveyResponsesState } = state;
  const { id } = ownProps.match.params;

  return {
    id,
    survey: getSurveyState.survey,
    isLoadingSurvey: getSurveyState.isLoading == null ? true : getSurveyState.isLoading,
    surveyResponses: getSurveyResponsesState.surveyResponses,
    isLoadingSurveyResponses: getSurveyResponsesState.isLoading == null ? true : getSurveyResponsesState.isLoading,
    error: getSurveyResponsesState.error
  };
}

const snackbarComp = withSnackbar(SurveyResponse);
const styledComp = withStyles(styles, { withTheme: true })(snackbarComp);
const connectedComp = connect(mapStateToProps)(styledComp);

export default connectedComp;
