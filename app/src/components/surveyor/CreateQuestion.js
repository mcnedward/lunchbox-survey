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

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 2
  }
});

class CreateQuestion extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes, question } = this.props;

    return (
      <Grid container spacing={0} className={classes.container}>
        <Typography color="textSecondary" variant="h6">
          Question #{question.id}
        </Typography>
        <TextField
          id="question"
          label="Question"
          helperText="What is your question?"
          fullWidth
          margin="normal"
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(CreateQuestion);
