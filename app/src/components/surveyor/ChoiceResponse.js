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

class ChoiceResponse extends React.Component {

  render() {
    let { classes, question, number } = this.props;

    let optionMap = {};
    for (let option of question.options) {
      optionMap[option] = 0;
    }
    for (let response of question.responses) {
      optionMap[response] = optionMap[response] + 1;
    }

    return (
      <div className={classes.container}>
        <Typography color="textPrimary" variant="h6" className={classes.padding}>
          #{number} - {question.question}
        </Typography>

        <div>
          <List>
            {question.options.map((option, index) => {
              let count = optionMap[option];
              let text = `${option}: ${count}/${question.responses.length}`
              return (
                <div key={index}>
                  <ListItem>
                    <ListItemText primary={text} />
                  </ListItem>
                </div>
              )
            })}
          </List>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(ChoiceResponse);
