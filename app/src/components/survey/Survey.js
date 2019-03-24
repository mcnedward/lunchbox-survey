import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SurveyForm from './SurveyForm';

import { getSurveyById } from "../../actions/surveyAction";

const styles = theme => ({
  btnReturn: {
    marginTop: theme.spacing.unit * 2
  }
});

class Survey extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getSurveyById(id));
  }
  componentDidUpdate() {
    let { error } = this.props;

    if (error) {
      this.props.enqueueSnackbar(error, { variant: 'error' });
    }

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.survey !== nextProps.survey) {
      let currentQuestion = nextProps.survey.questions[0];
      this.setState({ currentQuestion });
    }
  }

  submit() {
    // const { survey } = this.props;
    // const question = survey.getCurrentQuestion();
    // if (!question.isAnswered()) {
    //   this.props.enqueueSnackbar('Please answer the question before submitting.', { variant: 'error' });
    //   return;
    // }

    // survey.submit();
    // this.setState({ survey });
  }

  render() {
    const { classes, survey } = this.props;

    let contents;
    if (survey == null) {
      contents = (
        <Typography color="textPrimary" variant="h4" gutterBottom>
          Could not find the survey
        </Typography>
      );
    } else if (survey.isComplete) {
      contents = this.buildCompleteCard()
    } else {
      contents = <SurveyForm survey={survey}></SurveyForm>;
    }

    return (
      <div>
        {contents}
        <Button component={Link} to="/" color="primary" size="small" className={classes.btnReturn}>
          Return to home
        </Button>
      </div>
    );
  }

  buildCompleteCard() {
    const { classes, survey } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography color="textPrimary" variant="h5" gutterBottom>
            {survey.name}
          </Typography>
          <Typography color="textPrimary" variant="h6" gutterBottom>
            Thank you for completing the survey!
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { surveyState } = state;
  const { id } = ownProps.match.params;

  return {
    id,
    survey: surveyState.survey,
    error: surveyState.error
  };
}


const styledSurvey = withStyles(styles, { withTheme: true })(Survey);
const connectedSurvey = connect(mapStateToProps)(styledSurvey);

export default withRouter(connectedSurvey);
