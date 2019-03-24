import { Question } from './question'

export default class Survey {

  constructor(id, name, questions = []) {
    this.id = id;
    this.name = name;
    this.questions = questions;
    this.numberOfQuestions = questions.length;
    this.isComplete = false;
    
    this.answeredQuestions = [];
    this.unansweredQuestions = questions.slice();
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