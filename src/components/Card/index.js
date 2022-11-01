import React from 'react';
import ContentLoader from "react-content-loader";

import AppContext from '../../context';

import styles from './Card.module.scss';



function Card({onFavorite, 
    id,
    imageUrl, 
    title, 
    price, 
    onPlus, 
    favorited = false, 
    Loading = false
}) {

    
    const{ isItemAdded } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const itemObj = {id, parentId: id, title, imageUrl, price};


    const onClickPlus = () => {
        onPlus(itemObj);
    };

    const onClickFavorite = () => {
        onFavorite(itemObj);
        setIsFavorite(!isFavorite);
    };

/*     console.log(isAdded); */

    return(
        <div className={styles.card}>
            {
                Loading ?  <ContentLoader 
                speed={2}
                width={150}
                height={220}
                viewBox="0 0 150 230"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            
            >
                <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
                <rect x="0" y="140" rx="5" ry="5" width="150" height="15" /> 
                <rect x="0" y="160" rx="5" ry="5" width="100" height="15" /> 
                <rect x="3" y="205" rx="5" ry="5" width="80" height="25" /> 
                <rect x="118" y="200" rx="10" ry="10" width="32" height="32" />
            </ContentLoader> :   <> {/* -фрагмент */}
            { onFavorite &&  <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Unliked" />
            </div>}
                <img width={133} height={112} src={imageUrl} alt="Sneakers" />
                <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                { onPlus && <img className={styles.plus} 
                onClick={onClickPlus} 
                src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} 
                alt="Plus" />}
            </div>
            </>      
            }

        </div>
    );
}

export default Card;