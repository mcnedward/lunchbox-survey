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

class BoolResponse extends React.Component {

  render() {
    let { classes, question, number } = this.props;

    const { responses } = question;

    let trueCount = 0;
    let falseCount = 0;
    for (let response of responses) {
      if (response) trueCount++;
      else falseCount++;
    }

    return (
      <div className={classes.container}>
        <Typography color="textPrimary" variant="h6" className={classes.padding}>
          #{number} - {question.question}
        </Typography>

        <div className={classes.progressContainer}>
          <ResponsePercent text="True" value={trueCount} total={responses.length} />
          <ResponsePercent text="False" value={falseCount} total={responses.length} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(BoolResponse);
