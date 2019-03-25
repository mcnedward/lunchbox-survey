import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SurveyStepper from './SurveyStepper';
import getSurvey from "../../actions/survey/getSurveyAction";

const styles = theme => ({
  btnReturn: {
    marginTop: theme.spacing.unit * 2
  }
});

class SurveyForm extends React.Component {

  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getSurvey(id));
  }
  componentDidUpdate() {
    let { error } = this.props;
    if (error) {
      this.props.enqueueSnackbar(error, { variant: 'error' });
    }
  }

  render() {
    const { classes, survey, isSubmitted } = this.props;

    let btnReturn = (
      <Button component={Link} to="/" color="primary" size="small" className={classes.btnReturn}>
        Return to home
      </Button>
    );
    if (survey == null) {
      return (
        <div>
          <Typography color="primary" variant="h4" gutterBottom>
            Could not find the survey
          </Typography>
          {btnReturn}
        </div>
      );
    } else if (isSubmitted) {
      return (
        <div>
          <Typography color="primary" variant="h4" gutterBottom>
            {survey.name}
          </Typography>
          <Typography color="textPrimary" variant="h5" gutterBottom>
            Thank you for completing the survey!
          </Typography>
          {btnReturn}
        </div>
      )
    }

    return (
      <div>
        <SurveyStepper survey={survey}></SurveyStepper>
        {btnReturn}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { getSurveyState, postSurveyResponseState } = state;
  const { id } = ownProps.match.params;

  return {
    id,
    survey: getSurveyState.survey,
    error: getSurveyState.error,
    isSubmitted: postSurveyResponseState.isSubmitted
  };
}

const snackbarComp = withSnackbar(SurveyForm);
const styledComp = withStyles(styles, { withTheme: true })(snackbarComp);
const connectedComp = connect(mapStateToProps)(styledComp);

export default withRouter(connectedComp);
