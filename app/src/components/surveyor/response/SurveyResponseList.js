import React from 'react';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  dialog: {
    minWidth: '500px',
  }
})
class SurveyResponseList extends React.Component {
  state = {
    open: false,
    questions: []
  };

  handleClickOpen = (response) => {
    const { survey } = this.props;

    let questions = [];
    for (let answer of response.answers) {
      let question = survey.questions.find(q => q._id === answer.questionId);
      questions.push({
        question: question.question,
        answer: answer.answer
      });
    }

    this.setState({ open: true, questions });
  };

  handleClose = () => {
    this.setState({ open: false, questions: [] });
  };

  render() {
    let { classes, survey, surveyResponses } = this.props;

    return (
      <div>
        <Typography color="textPrimary" variant="h4" gutterBottom>
          Click for details
        </Typography>

        <List component="nav">
          {surveyResponses.map((response, index) => {
            let date = new Date(response.respondedOn).toUTCString();
            let text = `Response ${index + 1}: ${date}`;
            return (
              <ListItem button divider key={response._id} onClick={this.handleClickOpen.bind(this, response)}>
                <ListItemText primary={text} />
              </ListItem>
            )
          })}
        </List>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{paper: classes.dialog}}
        >
          <DialogTitle id="alert-dialog-title">{survey.name}</DialogTitle>
          <DialogContent>
            {
              this.state.questions.map((q, index) => (
                <div key={index}>
                  <Typography color="textPrimary" variant="h5" gutterBottom>
                    #{index + 1} {q.question}
                  </Typography>
                  <Typography color="textSecondary" variant="h6" gutterBottom>
                    {q.answer}
                  </Typography>
                </div>
              ))
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(SurveyResponseList);
