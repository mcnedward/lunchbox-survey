export class Question {
  constructor(data) {
    data && Object.assign(this, data);

    this.positiveLabel = this.type === QuestionTypes.Bool ? 'True' : 'Yes';
    this.negativeLabel = this.type === QuestionTypes.Bool ? 'False' : 'No';
  }

  isAnswered() {
    return this.answer != null && this.answer !== '';
  }

}

export const QuestionTypes = {
  Text: "Text",
  Choice: "Choice",
  Bool: "Bool",
  YesNo: "YesNo"
};
