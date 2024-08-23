import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FAQ.scss';
import QuestionAnswer from './QuestionAnswer/QuestionAnswer';
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import getFAQ from '../../store/middlewares/getFAQ';
import { RootState } from '../../store/store';

const FAQ: React.FC = () => {
  const dispatch = useAppDispatch();
  const faq = useAppSelector((state: RootState) => state.appReducer.faq);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getFAQ());
  }, [dispatch]);

  const handleQuestionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <h1>F.A.Q.</h1>
      {faq.map((qAndA, index) => (
        <QuestionAnswer
          key={index}
          question={qAndA.question}
          answer={qAndA.response}
          isOpen={activeIndex === index}
          onClick={() => handleQuestionClick(index)}
        />
      ))}
      <Link to="/" className="link">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default FAQ;
