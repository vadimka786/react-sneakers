import React from 'react';
import Card from '../components/Card';



function Home({  items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading
  }) {


      const renderItems = () => {
        const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
          return(isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
          <Card 
            key={index}
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            /* мы здесь сделали при помощи some вместо find, так
            как find по умолчанию передает undefind а нам нужно
            булевое значение true */
            {...item} /* все что есть в этом item, все свойства
            imageUrl, price, id, title, все эти свойства 
            у нас передаются  */ 
            Loading = {isLoading}
        />
        ))
      }


    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40" >
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}" ` : 'Все кроссовки'}</h1>
  
        <div className="search-block d-flex">
          <img src="/img/Search-Icon.svg" alt="Search" />
          {searchValue && (
            <img 
              onClick={() => setSearchValue('')} 
              className="clear cu-p" 
              src="/img/btn-remove.svg" 
              alt="Clear" 
            />
          )}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." className="input_Search"/>
        </div>
        </div>
  
  
        <div className="d-flex flex-wrap">
  
          {renderItems()}
  
  
          {/*
        все карточки находятся теперь в папке components в файле Card.js 
        таким образом мы выяснили что так удобнее, можно понять что где находится
        просто перед началом нужно в самый главный файл (этот) import имя переменной
        (там где нужный код), from (какой файл из какой папки);
        и мы можум легко выхывать его: < имя которое мы давали/>
        таким образом мы не захламляем код в одном файле, а распределяем 
        элементы по другим файлам, это и удобнее, компактнее, и быстро можно
        изменить что нибудь, а самое главное у нас будут элементы находится в отдельных
        файлах, и не засорять наш основной
          */}
        </div>
      </div>
    )
}

export default Home;