import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import TextResponse from './TextResponse';
import ChoiceResponse from './ChoiceResponse';
import BoolResponse from './BoolResponse';
import { getSurveyResponses } from '../../actions/surveyAction';
import { QuestionTypes } from '../../models/question';
import Button from "@material-ui/core/Button";

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

  render() {
    let { classes, survey } = this.props;

    let title;
    if (survey == null) {
      return (
        <Typography color="primary" variant="h4" className={classes.header}>
          {title}
        </Typography>
      );
    }

    return (
      <div>
        <Typography color="primary" variant="h4" className={classes.header}>
          {survey.name}
        </Typography>
        {survey.questions.map((question, index) => {
          if (question.type === QuestionTypes.Text) {
            return <TextResponse question={question} number={index + 1} key={index} />
          } else if (question.type === QuestionTypes.Choice) {
            return <ChoiceResponse question={question} number={index + 1} key={index} />
          } else if (question.type === QuestionTypes.Bool) {
            return <BoolResponse question={question} number={index + 1} key={index} />
          } else {
            return <div>Could not find the question...</div>
          }
        })}
        <Button component={Link} to="/surveyor" color="primary" size="small" className={classes.btnReturn}>
          Back
        </Button>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { surveyState } = state;
  const { id } = ownProps.match.params;

  return {
    id,
    survey: surveyState.survey
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(SurveyResponse)));
