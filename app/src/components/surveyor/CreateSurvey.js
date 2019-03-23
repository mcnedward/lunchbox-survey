import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import { withSnackbar } from 'notistack';
import CreateQuestion from './CreateQuestion'
import { CardActions } from "@material-ui/core";
import Survey from "../../models/survey";
import { Question } from "../../models/question";

const styles = theme => ({
  card: {
    minWidth: 350,
  },
  btnReturn: {
    marginTop: theme.spacing.unit * 2
  },
  padding: {
    padding: theme.spacing.unit * 2
  },
});

class CreateSurvey extends React.Component {

  constructor(props) {
    super(props);

    let question1 = new Question(1);
    this.state = {
      survey: new Survey(1, '', [question1])
    }
  }

  render() {
    const { classes } = this.props;
    const { survey } = this.state;

    return (
      <Grid container justify="center">
        <Grid item>
          <Paper>
            <Card className={classes.card}>
              <CardContent>
                <Typography color="primary" variant="h6">
                  Create New Survey
                    </Typography>

                <TextField
                  id="surveyTitle"
                  label="Survey Title"
                  helperText="Enter a title for your survey"
                  fullWidth
                  margin="normal"
                />

                {survey.questions.map((question => (
                  <CreateQuestion question={question} key={question.id} />
                )))}

              </CardContent>
              <CardActions>
                <Grid container justify="space-between" spacing={24}>
                  <Grid item>
                    <Button size="small" component={Link} to="surveyor/surveys">
                      Add question
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button size="small" color="primary" component={Link} to="surveyor/surveys">
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Paper>
          <Button component={Link} to="/" color="primary" size="small" className={classes.btnReturn}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { surveyState } = state;
  const { id } = ownProps.match.params;

  return {
    id,
    survey: surveyState.survey
  };
}


const snackbarSurvey = withSnackbar(CreateSurvey);
const styledSurvey = withStyles(styles, { withTheme: true })(snackbarSurvey);
const connectedSurvey = connect(mapStateToProps)(styledSurvey);

export default withRouter(connectedSurvey);
