import { Question } from './question'

export default class Survey {

  constructor(data) {
    data && Object.assign(this, data);

    if (this.questions == null) {
      this.questions = [];
    } else {
      this.questions = this.questions.map(q => new Question(q));
    }
    
    this.isComplete = false;
    this.numberOfQuestions = this.questions.length;
    this.answeredQuestions = [];
    this.unansweredQuestions = this.questions.slice();
    this.currentQuestion = this.unansweredQuestions.shift();
  }

  getCurrentQuestion() {
    return this.currentQuestion;
  }

  getCurrentIndex() {
    return this.questions.indexOf(this.currentQuestion);
  }

  nextQuestion() {
    // Add the current question to answered array
    this.answeredQuestions.push(this.currentQuestion);
    // Set the current to the first of the unanswered array
    this.currentQuestion = this.unansweredQuestions.shift();
  }

  previousQuestion() {
    // Add the current back to the first spot in unanswered array
    this.unansweredQuestions.unshift(this.currentQuestion);
    // Take back the last answered
    this.currentQuestion = this.answeredQuestions.pop();
  }

  submit() {
    this.answeredQuestions.push(this.currentQuestion);
    this.isComplete = true;
  }

  addQuestion() {
    let id = this.questions.length + 1;
    let question = new Question(id);
    this.questions.push(question);
  }

  removeQuestion(question) {
    let index = this.questions.indexOf(question);
    this.questions.splice(index, 1);
  }
}