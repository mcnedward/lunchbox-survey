import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  container: {
    maxWidth: '600px',
    marginBottom: theme.spacing.unit * 4
  },
  responseList: {
    maxHeight: '250px',
    overflowY: 'scroll'
  }
})

class TextResponse extends React.Component {

  render() {
    let { classes, question, number } = this.props;

    return (
      <div className={classes.container}>
        <Typography color="textSecondary" variant="h6" className={classes.padding}>
          Question #{number} - {question.question}
        </Typography>

        <div className={classes.responseList}>
          <List>
            {question.responses.map((response, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemText primary={response} />
                </ListItem>
                <Divider component="li" />
              </div>
            ))}
          </List>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(TextResponse);
