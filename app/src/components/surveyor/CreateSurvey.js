import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import { withSnackbar } from 'notistack';
import CreateQuestion from './CreateQuestion'
import { QuestionTypes } from "../../models/question";
import uuid from 'uuid';
import addSurvey from '../../actions/postSurveyAction';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing.unit * 2
  },
  spinner: {
    marginTop: theme.spacing.unit
  }
});

class CreateSurvey extends React.Component {

  createQuestion() {
    return {
      key: uuid(),
      type: QuestionTypes.Text,
      question: '',
      options: [],
      optionText: ''  // The text for an option if Multiple Choice is selected
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      questions: [this.createQuestion()]
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.onDeleteQuestion = this.onDeleteQuestion.bind(this);
    this.createSurvey = this.createSurvey.bind(this);
  }

  componentDidUpdate(prevProps) {
    let { error } = this.props;
    if (error) {
      this.props.enqueueSnackbar(error, { variant: 'error' });
    }
  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    })
  }

  addQuestion() {
    this.setState(prevState => ({
      questions: [...prevState.questions, this.createQuestion()]
    }));
  }

  onDeleteQuestion(questionIndex) {
    let questions = [...this.state.questions];
    if (questions.length === 1) {
      return this.props.enqueueSnackbar('You need at least one question.', { variant: 'warning' });
    }

    questions.splice(questionIndex, 1);
    this.setState({ questions });
  }

  handleQuestionChange(index, question) {
    let questions = [...this.state.questions];
    questions[index] = question;
    this.setState({ questions });
  }

  createSurvey() {
    const { dispatch } = this.props;
    const { name, questions } = this.state;

    if (name == null || name === '') {
      return this.props.enqueueSnackbar('You need to enter a title.', { variant: 'warning' });
    }
    for (let q of questions) {
      if (q.type === QuestionTypes.Choice) {
        if (q.options.length === 0) {
          return this.props.enqueueSnackbar('You need to enter options for a Multiple Choice question.', { variant: 'warning' });
        }
      } else {
        if (q.question == null || q.question === '') {
          return this.props.enqueueSnackbar('You need to enter a value for each question.', { variant: 'warning' });
        }
      }
    }

    let survey = { name, questions };
    dispatch(addSurvey(survey));
  }

  render() {
    const { classes, isSubmitted, isLoading } = this.props;
    const { questions } = this.state;

    if (isSubmitted) {
      return (
        <div>
          <Typography color="primary" variant="h4">
            Your survey has been created
        </Typography>
          <Button component={Link} to="/surveyor" color="primary" size="small" className={classes.marginTop}>
            Go back
          </Button>
        </div>
      )
    }

    return (
      <div>
        <Typography color="primary" variant="h4">
          Create New Survey
        </Typography>

        <TextField
          id="surveyTitle"
          label="Survey Title"
          helperText="Enter a title for your survey"
          value={this.state.name}
          onChange={this.handleNameChange}
          fullWidth
          margin="normal"
        />

        {
          questions.map((question, index) => {
            return (
              <CreateQuestion
                question={question}
                key={question.key}
                index={index}
                onChange={this.handleQuestionChange}
                onDeleteQuestion={this.onDeleteQuestion} />
            )
          })
        }

        <Button size="small" onClick={this.addQuestion}>
          Add question
        </Button>
        <Grid container justify="space-between" spacing={24} className={classes.marginTop}>
          <Grid item>
            <Button component={Link} to="/surveyor" color="primary" size="small">
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button size="small" variant="contained" color="primary" onClick={this.createSurvey} disabled={isLoading}>
              Create
            </Button>
          </Grid>
        </Grid>
        {isLoading ? <div style={{ 'textAlign': 'center' }}><CircularProgress className={classes.spinner} /></div> : ''}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { postSurveyState } = state;

  return {
    isSubmitted: postSurveyState.isSubmitted,
    isLoading: postSurveyState.isLoading,
    error: postSurveyState.error || ''
  };
}

const snackbarSurvey = withSnackbar(CreateSurvey);
const styledSurvey = withStyles(styles, { withTheme: true })(snackbarSurvey);
const connectedSurvey = connect(mapStateToProps)(styledSurvey);

export default withRouter(connectedSurvey);
