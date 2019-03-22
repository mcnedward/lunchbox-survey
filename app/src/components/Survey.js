import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { getSurveyById } from "../actions/surveyAction";
import Question from "./Question";

const styles = theme => ({
  card: {
    minWidth: 275
  },
  emptyStyle: {
    padding: theme.spacing.unit * 2
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  }
});

class Survey extends React.Component {

  constructor(props) {
    super(props);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { dispatch, id } = this.props;
    dispatch(getSurveyById(+id));
  }

  previousQuestion() {
    // const { survey } = this.props;
    // survey.nextQuestion();

    // this.setState({ survey });
  }
  nextQuestion() {
    const { survey } = this.props;
    survey.nextQuestion();

    this.setState({ survey });
  }

  render() {
    const { classes, survey } = this.props;

    let contents;
    if (survey == null) {
      contents = (
        <div className={classes.emptyStyle}>Could not find the survey</div>
      );
    } else {
      contents = this.buildCard();
    }

    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <Grid container justify="center" spacing={Number("16")}>
            <Grid item>
              <Paper className={classes.paperStyle}>{contents}</Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  buildCard() {
    const { classes, survey } = this.props;

    let question = survey.getCurrentQuestion();

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {survey.name}
          </Typography>
          <Question question={question} />
        </CardContent>
        <CardActions className={classes.actions}>
          <Button size="small" onClick={this.previousQuestion}>Back</Button>
          <Button size="small" onClick={this.nextQuestion}>Next</Button>
        </CardActions>
      </Card>
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

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Survey)));