//Стили React
import './BigArticle.sass'

export const BigArticle = ({children,
                            border,
                            boxShadow,
                            onClick
}) => {
    return (
        <div id='bigArticleWrapper'
            onClick={onClick}
            style={{border, boxShadow}}>
            {children}
        </div>
    );
};

