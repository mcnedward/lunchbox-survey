import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import ResponsePercent from './ResponsePercent';

const styles = theme => ({
  container: {
    marginBottom: theme.spacing.unit * 2
  },
  progressContainer: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  }
})

class ChoiceResponse extends React.Component {

  render() {
    let { classes, question } = this.props;
    const { answers } = question;

    let optionMap = {};
    for (let option of question.options) {
      optionMap[option] = 0;
    }
    for (let response of answers) {
      optionMap[response] = optionMap[response] + 1;
    }

    return (
      <div className={classes.container}>
        <Typography color="textPrimary" variant="h5" className={classes.padding}>
          #{question.number} - {question.question}
        </Typography>

        <div className={classes.progressContainer}>
          {
            question.options.map((option, index) => {
              let count = optionMap[option];
              return <ResponsePercent text={option} value={count} total={answers.length} key={index} />;
            })
          }
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(ChoiceResponse);
