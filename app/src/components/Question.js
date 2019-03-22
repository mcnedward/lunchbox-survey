import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { QuestionTypes } from "../models/question";

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
  handleTextChange = name => event => {
    console.log(name, event);
  };

  handleRadioChange = event => {
    console.log(event);
  };

  render() {
    const { question } = this.props;

    if (question.type === QuestionTypes.Text) {
      return this.buildText();
    } else if (question.type === QuestionTypes.Choice) {
      return this.buildRadio();
    } else if (question.type === QuestionTypes.Bool) {
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
        onChange={this.handleTextChange("multiline")}
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
          onChange={this.handleRadioChange}
        >
          {options}
        </RadioGroup>
      </FormControl>
    );
  }

  buildBool() {
    const { classes, question } = this.props;

    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{question.question}</FormLabel>
        <RadioGroup
          aria-label={question.question}
          name="truefalse"
          className={classes.group}
          onChange={this.handleRadioChange}
        >
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="True"
          />
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="False"
          />
        </RadioGroup>
      </FormControl>
    );
  }
}

export default withStyles(styles)(Question);
