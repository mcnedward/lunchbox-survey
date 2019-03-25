import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  container: {
    maxWidth: '600px',
    marginBottom: theme.spacing.unit * 2
  },
  responseList: {
    maxHeight: '250px',
    overflowY: 'auto'
  }
})

class TextResponse extends React.Component {

  render() {
    let { classes, question } = this.props;

    return (
      <div className={classes.container}>
        <Typography color="textPrimary" variant="h5" className={classes.padding}>
          #{question.number} {question.question}
        </Typography>

        <div className={classes.responseList}>
          <List>
            {question.answers.map((answer, index) => (
              <ListItem divider key={index}>
                <ListItemText primary={answer} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(TextResponse);
