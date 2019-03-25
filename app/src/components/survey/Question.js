import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import QuestionTypes from "../../constants/question-types";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class Question extends React.Component {
  constructor(props) {
    super(props);
    const { question } = this.props;
    this.state = { question };
    this.setAnswer = this.setAnswer.bind(this);
  }

  setAnswer = event => {
    const { question } = this.props;
    question.answer = event.target.value;
    this.setState({question})
  };

  render() {
    const { question } = this.props;

    if (question.type === QuestionTypes.Text) {
      return this.buildText();
    } else if (question.type === QuestionTypes.Choice) {
      return this.buildRadio();
    } else if (question.type === QuestionTypes.Bool || question.type === QuestionTypes.YesNo) {
      return this.buildBool();
    }

    return <div>No question type defined...</div>;
  }

  buildText() {
    const { classes, question } = this.props;
    return (
      <TextField
        id="standard-multiline-flexible"
        label={question.question}
        multiline
        fullWidth
        rowsMax="4"
        value={question.answer}
        onChange={this.setAnswer}
        className={classes.textField}
        margin="normal"
      />
    );
  }

  buildRadio() {
    const { classes, question } = this.props;

    let options = question.options.map((option, index) => (
      <FormControlLabel
        key={index}
        value={option}
        control={<Radio />}
        label={option}
      />
    ));

    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{question.question}</FormLabel>
        <RadioGroup
          aria-label={question.question}
          name="choices"
          className={classes.group}
          value={question.answer}
          onChange={this.setAnswer}
        >
          {options}
        </RadioGroup>
      </FormControl>
    );
  }

  buildBool() {
    const { classes, question } = this.props;

    let positiveLabel = question.type === QuestionTypes.Bool ? 'True' : 'Yes';
    let negativeLabel = question.type === QuestionTypes.Bool ? 'False' : 'No';

    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{question.question}</FormLabel>
        <RadioGroup
          aria-label={question.question}
          name="truefalse"
          className={classes.group}
          value={question.answer}
          onChange={this.setAnswer}
        >
          <FormControlLabel
            value="true"
            control={<Radio />}
            label={positiveLabel}
          />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label={negativeLabel}
          />
        </RadioGroup>
      </FormControl>
    );
  }
}

export default withStyles(styles)(Question);
