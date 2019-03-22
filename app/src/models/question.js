export class Question {
  constructor(type, question, options = []) {
    this.type = type; // Free text, multiple choice, true/false
    this.question = question;
    this.options = options; // If multiple choice
  }
}

export const QuestionTypes = {
  Text: "Text",
  Choice: "Choice",
  Bool: "Bool"
};
