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
import { List, ListItem, Paper, Divider } from "@material-ui/core";

const styles = theme => ({
  marginTop: {
    marginTop: theme.spacing.unit * 2
  }
});

class CreateQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      optionText: ''  // The text for an option if Multiple Choice is selected
    }

    this.setTypeOfQuestion = this.setTypeOfQuestion.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.addOption = this.addOption.bind(this);
  }

  setTypeOfQuestion = event => {
    const { question } = this.props;
    question.type = event.target.value;
    this.setState({ question })
  }

  handleOptionChange = event => {
    this.setState({
      optionText: event.target.value
    })
  }

  addOption() {
    const { question } = this.props;
    const { optionText } = this.state;

    if (optionText === '') {
      this.props.enqueueSnackbar('You need to add a value for the option.', { variant: 'error' });
      return;
    }
    question.options.push(optionText);
    this.setState({ optionText: '' });
  }

  render() {
    const { classes, question } = this.props;

    let questionField;
    if (question.type === QuestionTypes.Choice) {
      questionField = this.buildMultipleChoice();
    } else {
      questionField = (
        <TextField
          id="question"
          label="Question"
          helperText="What is your question?"
          fullWidth
          margin="normal"
        />
      );
    }

    return (
      <div className={classes.marginTop}>
        <Typography color="textSecondary" variant="h5" gutterBottom>
          Question #{question.id}
        </Typography>

        <Grid container spacing={0}>
          <Grid item xs={12}>
            <FormControl component="fieldset" className={classes.marginTop}>
              <FormLabel component="legend">Type of question</FormLabel>
              <RadioGroup
                aria-label="Type of question"
                name="typeOfQuestion"
                value={question.type}
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
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {questionField}
          </Grid>
        </Grid>
      </div>
    );
  }

  buildMultipleChoice() {
    const { classes, question } = this.props;

    return (
      <div>

        <Typography color="textSecondary" variant="h6" className={classes.marginTop}>
          Options
        </Typography>
        <List>
          {question.options.map((option, index) => (
            <ListItem key={index}>{option}</ListItem>
          ))}
        </List>
        <Grid container spacing={16} alignItems="flex-end">
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
