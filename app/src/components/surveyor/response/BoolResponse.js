import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import ResponsePercent from './ResponsePercent';
import { QuestionTypes } from '../../../models/question';

const styles = theme => ({
  container: {
    marginBottom: theme.spacing.unit * 2
  },
  progressContainer: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  }
})

class BoolResponse extends React.Component {

  render() {
    let { classes, question } = this.props;
    const { answers } = question;

    let trueCount = 0;
    let falseCount = 0;
    for (let response of answers) {
      if (response) trueCount++;
      else falseCount++;
    }

    let positiveLabel = question.type === QuestionTypes.Bool ? 'True' : 'Yes';
    let negativeLabel = question.type === QuestionTypes.Bool ? 'False' : 'No';

    return (
      <div className={classes.container}>
        <Typography color="textPrimary" variant="h5" className={classes.padding}>
          #{question.number} {question.question}
        </Typography>

        <div className={classes.progressContainer}>
          <ResponsePercent text={positiveLabel} value={trueCount} total={answers.length} />
          <ResponsePercent text={negativeLabel} value={falseCount} total={answers.length} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(BoolResponse);
