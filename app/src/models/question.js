export class Question {
  constructor(id, type, question, options = []) {
    this.id = id;
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
