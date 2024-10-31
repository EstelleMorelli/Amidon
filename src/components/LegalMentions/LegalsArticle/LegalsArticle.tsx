import './LegalsArticle.scss';

interface LegalsArticleProps {
  number: number;
  title: string;
  article: { __html: string };
}

const LegalsArticle = ({ number, title, article }: LegalsArticleProps) => {
  return (
    <div className="legalm-item">
      <h2 className="legalm-subtitle">
        {number}. {title}
      </h2>
      <p className="legalm-content" dangerouslySetInnerHTML={article}></p>
    </div>
  );
};

export default LegalsArticle;
