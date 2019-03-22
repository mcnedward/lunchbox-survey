export default class Survey {

  constructor(id, name, questions) {
    this.id = id;
    this.name = name;
    this.questions = questions;

    this.answeredQuestions = [];
    this.unansweredQuestions = questions;
    this.currentQuestion = questions.shift();
  }

  getCurrentQuestion() {
    return this.currentQuestion;
  }

  nextQuestion() {
    this.answeredQuestions.push(this.currentQuestion);
    this.currentQuestion = this.unansweredQuestions.shift();
  }
}