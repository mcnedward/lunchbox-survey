export class Question {
  constructor(id, type = QuestionTypes.Text, question, options = []) {
    this.id = id;   // TODO See about getting rid of this
    this.type = type; // Free text, multiple choice, true/false
    this.question = question;
    this.options = options; // If multiple choice
    this.answer = '';

    this.responses = [];
  }

  isAnswered() {
    return this.answer != null && this.answer !== '';
  }
}

export const QuestionTypes = {
  Text: "Text",
  Choice: "Choice",
  Bool: "Bool"
};
