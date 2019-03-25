import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withSnackbar } from 'notistack';
import SurveyResponseOverview from './SurveyResponseOverview';
import { QuestionTypes } from '../../../models/question';
import getSurveyResponses from '../../../actions/surveyResponse/getSurveyResponsesAction';
import getSurvey from '../../../actions/survey/getSurveyAction';

const styles = theme => ({
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
            let showDivider = index < surveyResponses.length - 1;
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
        >
          <DialogTitle id="alert-dialog-title">{survey.name}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
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
            </DialogContentText>
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

export default SurveyResponseList;
