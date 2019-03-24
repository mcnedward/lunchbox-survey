export class Question {
  constructor(id, type = QuestionTypes.Choice, question, options = []) {
    this.id = id;
    this.type = type; // Free text, multiple choice, true/false
    this.question = question;
    this.options = options; // If multiple choice
    this.answer = '';
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
