import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import TextResponse from './TextResponse';
import ChoiceResponse from './ChoiceResponse';
import BoolResponse from './BoolResponse';
import { QuestionTypes } from '../../models/question';
import Button from "@material-ui/core/Button";
import { withSnackbar } from 'notistack';
import getSurveyResponses from '../../actions/getSurveyResponsesAction';

const styles = theme => ({
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
    dispatch(getSurveyResponses(id));
  }
  componentDidUpdate() {
    let { error } = this.props;
    if (error) {
      this.props.enqueueSnackbar(error, { variant: 'error' });
    }
  }

  render() {
    let { classes, surveyResponses, isLoading } = this.props;

    if (surveyResponses == null || surveyResponses.length === 0) {
      return (
        <Typography color="primary" variant="h4" className={classes.header}>
          Could not find any responses
        </Typography>
      );
    }

    let name = surveyResponses[0].name;
    return (
      <div>
        <Typography color="primary" variant="h4" className={classes.header}>
          {name}
        </Typography>
        {/* {survey.answeredQuestions.map((question, index) => {
          if (question.type === QuestionTypes.Text) {
            return <TextResponse question={question} number={index + 1} key={index} />
          } else if (question.type === QuestionTypes.Choice) {
            return <ChoiceResponse question={question} number={index + 1} key={index} />
          } else if (question.type === QuestionTypes.Bool) {
            return <BoolResponse question={question} number={index + 1} key={index} />
          } else {
            return <div>Could not find the question...</div>
          }
        })} */}
        <Button component={Link} to="/surveyor" color="primary" size="small" className={classes.btnReturn}>
          Back
        </Button>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { getSurveyResponsesState } = state;
  const { id } = ownProps.match.params;

  return {
    id,
    surveyResponses: getSurveyResponsesState.surveyResponses,
    isLoading: getSurveyResponsesState.isLoading,
    error: getSurveyResponsesState.error
  };
}

const snackbarComp = withSnackbar(SurveyResponse);
const styledComp = withStyles(styles, { withTheme: true })(snackbarComp);
const connectedComp = connect(mapStateToProps)(styledComp);

export default connectedComp;
