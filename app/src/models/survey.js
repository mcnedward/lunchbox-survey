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