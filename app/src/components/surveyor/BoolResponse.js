import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  container: {
    marginBottom: theme.spacing.unit * 2
  }
})

class BoolResponse extends React.Component {

  render() {
    let { classes, question, number } = this.props;

    let trueCount = 0;
    let falseCount = 0;
    for (let response of question.responses) {
      if (response) trueCount++;
      else falseCount++;
    }

    let trueText = `True: ${trueCount}/${question.responses.length}`;
    let falseText = `False: ${falseCount}/${question.responses.length}`;

    return (
      <div className={classes.container}>
        <Typography color="textPrimary" variant="h6" className={classes.padding}>
          #{number} - {question.question}
        </Typography>

        <div>
          <List>
            <ListItem>
              <ListItemText primary={trueText} />
            </ListItem>
            <ListItem>
              <ListItemText primary={falseText} />
            </ListItem>
          </List>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(BoolResponse);
