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
import TextResponse from './TextResponse';
import { getSurveyResponses } from '../../actions/surveyAction';
import { QuestionTypes } from '../../models/question';

const styles = theme => ({
  header: {
    marginBottom: theme.spacing.unit * 2
  }
})

class SurveyResponse extends React.Component {

  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getSurveyResponses(+id));
  }

  render() {
    let { classes, survey } = this.props;

    let title;
    if (survey == null) {
      return (
        <Typography color="primary" variant="h5" className={classes.header}>
          {title}
        </Typography>
      );
    }

    return (
      <div>
        <Typography color="primary" variant="h5" className={classes.header}>
          {survey.name}
        </Typography>
        {survey.questions.map((question, index) => {
          if (question.type === QuestionTypes.Text) {
            return <TextResponse question={question} number={index + 1} key={index} />
          }
        })}
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
