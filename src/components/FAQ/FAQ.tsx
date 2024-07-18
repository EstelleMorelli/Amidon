import { Link } from 'react-router-dom';
import './FAQ.scss';
import QuestionAnswer from './QuestionAnswer/QuestionAnswer';
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import { useEffect } from 'react';
import getFAQ from '../../store/middlewares/getFAQ';
import { RootState } from '../../store/store';

function FAQ() {
  const dispatch = useAppDispatch();
  const faq = useAppSelector((state: RootState) => state.appReducer.faq);

  useEffect(() => {
    dispatch(getFAQ());
  }, [dispatch]);

  return (
    <div className="faq">
      <h1>F.A.Q.</h1>
      {faq.map((qAndA, index) => (
        <QuestionAnswer
          key={index}
          question={qAndA.question}
          answer={qAndA.response}
        />
      ))}
      <Link to="/" className="link">
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default FAQ;
