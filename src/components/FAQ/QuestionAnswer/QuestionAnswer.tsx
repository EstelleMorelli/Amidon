import { Triangle } from 'react-feather';
import './QuestionAnswer.scss';

interface QuestionAnswerProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function QuestionAnswer({
  question,
  answer,
  isOpen,
  onClick,
}: QuestionAnswerProps) {
  return (
    <div className="question-answer">
      <div className="question" onClick={onClick}>
        {question}
        <Triangle className={`triangle-icon ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && <div className="answer">{answer}</div>}
    </div>
  );
}

export default QuestionAnswer;
