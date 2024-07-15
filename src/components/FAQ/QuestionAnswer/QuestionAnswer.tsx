import './QuestionAnswer.scss';

interface QuestionAnswerProps {
  question: string;
  answer: string;
}

function QuestionAnswer({ question, answer }: QuestionAnswerProps) {
  return (
    <div className="questionanswer">
      <h2>{question}</h2>
      <p>{answer}</p>
    </div>
  );
}

export default QuestionAnswer;
