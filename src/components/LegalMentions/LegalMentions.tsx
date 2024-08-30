import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks-redux';
import { RootState } from '../../store/store';
import './LegalMentions.scss';
import getLegals from '../../store/middlewares/getLegals';
import { Link } from 'react-router-dom';
import LegalsArticle from './LegalsArticle/LegalsArticle';

const LegalMentions: React.FC = () => {
  const dispatch = useAppDispatch();

  const legalsData = useAppSelector(
    (state: RootState) => state.appReducer.legalsData
  );

  console.log(legalsData, legalsData.legals);

  useEffect(() => {
    dispatch(getLegals());
  }, [dispatch]);

  return (
    <div className="legalm-container">
      <h1 className="legalm-title">
        Mentions Légales et Conditions d&#39;Utilisation
      </h1>
      {legalsData.legals.map((legal, index) => (
        <LegalsArticle
          key={index}
          number={legal.number}
          title={legal.title}
          // TODO : voir pour créer l'objet beaucoup plus tôt dans le code cf. doc https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html
          article={{ __html: legal.article }}
        />
      ))}
      <p className="legalm-content">
        <strong>Date de la dernière mise à jour :</strong> DATE
      </p>
      <Link to="/" className="link">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default LegalMentions;
