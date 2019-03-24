export class Question {
  constructor(data) {
    data && Object.assign(this, data);
  }
}

export const QuestionTypes = {
  Text: "Text",
  Choice: "Choice",
  Bool: "Bool",
  YesNo: "YesNo"
};
