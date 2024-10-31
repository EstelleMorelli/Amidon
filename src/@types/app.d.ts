export interface IQandA {
  question: string;
  response: string;
}

export interface ILegals {
  date: string;
  legals: {
    number: number;
    title: string;
    article: string;
  }[];
}
