import { Triangle } from 'react-feather';
import { useState } from 'react';
import './QuestionAnswer.scss';


interface QuestionAnswerProps {
  question: string;
  answer: string;
}

function QuestionAnswer({ question, answer }: QuestionAnswerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (

    <div className="question-answer">
      <div className="question" onClick={toggleAnswer}>
        {question} 
        <Triangle className={`triangle-icon ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && (
        <div className="answer">
          {answer}
        </div>
      )}

    </div>
  );
}

export default QuestionAnswer;
