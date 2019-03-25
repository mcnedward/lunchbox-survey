import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import { QuestionTypes } from "../../models/question";
import { withSnackbar } from 'notistack';
import { List, ListItem, Paper } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing.unit * 2
  },
  container: {
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2
  }
});

class CreateQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      key: props.question.key,
      type: QuestionTypes.Text,
      question: '',
      options: [],
      optionText: ''  // The text for an option if Multiple Choice is selected
    }

    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.setTypeOfQuestion = this.setTypeOfQuestion.bind(this);
    this.addOption = this.addOption.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
  }

  setTypeOfQuestion = event => {
    this.setState({ type: event.target.value }, () => {
      this.props.onChange(this.props.index, this.state);
    });
  }

  handleQuestionChange = event => {
    this.setState({ question: event.target.value }, () => {
      this.props.onChange(this.props.index, this.state);
    });
  }
  handleOptionChange = event => {
    this.setState({ optionText: event.target.value });
  }

  addOption() {
    const { optionText } = this.state;
    if (optionText === '') {
      this.props.enqueueSnackbar('You need to add a value for the option.', { variant: 'error' });
      return;
    }

    this.setState(prevState => ({
      options: [...prevState.options, optionText],
      optionText: ''
    }), () => {
      this.props.onChange(this.props.index, this.state);
    });
  }
  deleteOption(index) {
    var options = [...this.state.options];
    options.splice(index, 1);
    this.setState({ options });
  }

  deleteQuestion() {
    const { index, onDeleteQuestion } = this.props;
    onDeleteQuestion(index);
  }

  render() {
    const { classes, index } = this.props;
    const { type } = this.state;

    let questionField;
    if (type === QuestionTypes.Choice) {
      questionField = (
        <Grid item xs={12}>
          {this.buildMultipleChoice()}
        </Grid>
      );
    }

    return (
      <Paper className={classes.container}>
        <Typography color="textSecondary" variant="h5" gutterBottom>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>Question #{index + 1}</Grid>
            <Grid item>
              <IconButton aria-label="Delete" color="secondary" onClick={this.deleteQuestion}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Typography>

        <Grid container spacing={0}>
          <Grid item xs={12}>
            <TextField
              id="question"
              label="Question"
              helperText="What is your question?"
              fullWidth
              margin="normal"
              value={this.state.question}
              onChange={this.handleQuestionChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" className={classes.marginTop}>
              <FormLabel component="legend">Type of question</FormLabel>
              <RadioGroup
                aria-label="Type of question"
                name="typeOfQuestion"
                value={type}
                onChange={this.setTypeOfQuestion}
              >
                <FormControlLabel
                  value={QuestionTypes.Text}
                  control={<Radio />}
                  label="Free Text"
                />
                <FormControlLabel
                  value={QuestionTypes.Choice}
                  control={<Radio />}
                  label="Multiple Choice"
                />
                <FormControlLabel
                  value={QuestionTypes.Bool}
                  control={<Radio />}
                  label="True or False"
                />
                <FormControlLabel
                  value={QuestionTypes.YesNo}
                  control={<Radio />}
                  label="Yes or No"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {questionField}
        </Grid>
      </Paper>
    );
  }

  buildMultipleChoice() {
    const { classes } = this.props;
    const { options } = this.state;

    return (
      <div>
        <Typography color="textSecondary" variant="h6" className={classes.marginTop}>
          Options
        </Typography>
        <List>
          {options.map((option, index) => (
            <Grid container justify="space-between" alignItems="center" key={index}>
              <Grid item>
                <ListItem>{option}</ListItem>
              </Grid>
              <Grid item>
                <IconButton aria-label="Delete" color="secondary" onClick={this.deleteOption.bind(this, index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </List>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item xs={10}>
            <TextField
              id="multipleChoice"
              label="Option"
              margin="normal"
              fullWidth
              value={this.state.optionText}
              onChange={this.handleOptionChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button onClick={this.addOption}>Add</Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(withSnackbar(CreateQuestion));
