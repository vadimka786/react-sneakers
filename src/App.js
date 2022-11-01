import React from 'react';
import { Route, Routes } from "react-router-dom";
import axios  from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from './context';

import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
  
      try {

        const [CartResponce, FavoritesResponce, itemsResponce] = await Promise.all([axios.get('https://6302582ac6dda4f287b82b44.mockapi.io/cart'),
        axios.get('https://6302582ac6dda4f287b82b44.mockapi.io/favorites'),
        axios.get('https://6302582ac6dda4f287b82b44.mockapi.io/items')
      ]);

  /*  | | | |     
      v v v v тут мы сделали промис all, вмиесто того, чтобы отправлять 
                сразу несколько запросов */

      /* const CartResponce = await axios.get('https://6302582ac6dda4f287b82b44.mockapi.io/cart');
      const FavoritesResponce = await axios.get('https://6302582ac6dda4f287b82b44.mockapi.io/favorites')
      const itemsResponce = await axios.get('https://6302582ac6dda4f287b82b44.mockapi.io/items'); */
  
      setIsLoading(false);

      setCartItems(CartResponce.data);
      setFavorites(FavoritesResponce.data);
      setItems(itemsResponce.data);

      } catch (error) {
        alert('упсс... случилась ошибка при запросе данных, попытайтесь еще раз');
        console.log(error);
      }
  
    }

    fetchData();

  }, []);

  const onAddToCart = async (obj) => {

      try {
        const findedItems = cartItems.find((CartObj) => Number(CartObj.parentId) == Number(obj.id))

        if (findedItems) {
          setCartItems((prev) => prev.filter((CartObj) => Number(CartObj.parentId) !== Number(obj.id)));
          await axios.delete(`https://6302582ac6dda4f287b82b44.mockapi.io/cart/${findedItems.id}`);
          
        } else {
          setCartItems((prev) => [...prev, obj]);
          const {data} = await axios.post('https://6302582ac6dda4f287b82b44.mockapi.io/cart', obj);
          setCartItems((prev) => prev.map(item => {
            if (item.parentId == data.parentId) {
              return {
                ...item,
                id: data.id
              };
            }
            return item;
          }));
        }

      } catch {
        alert('упс... случилась ошибка при добавлении товара в корзину, попытайтесь еще раз');
        console.error(Error);
      }

  };

  /* удаление карточек из корзины */
  const onRemoveItem = (id) => {
    try {

      axios.delete(`https://6302582ac6dda4f287b82b44.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id))); 

    } catch {
      alert('что-то пошло не так, попробуйте еще раз удалить товар из корзины');
      console.error(Error);
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) == Number(obj.id))) {
        axios.delete(`https://6302582ac6dda4f287b82b44.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://6302582ac6dda4f287b82b44.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в избранное, попробуйте еще разок');
      console.error(Error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) == Number(id))
  }

  return (
    <AppContext.Provider value={{ 
      items, 
      cartItems, 
      favorites, 
      isItemAdded, 
      onAddToFavorite,
      onAddToCart,
      setCartOpened,
      setCartItems
      }}>
      <div className="wrapper clear">

      {cartOpened && (
        <Drawer 
        items={cartItems} 
        onClose={() => setCartOpened(false)}  
        onRemove={onRemoveItem}
        />  
      )}

    {/*тут мы говорим что если cardOpened положительеное значение то рендерим
    вот это <Drawer />, а если оно отрицательное(false) то возращаем null 
    тоесть не показываем ничего*/}
    {/*в этом файле находится корзина сайта(код)*/}

    <Header onClickCart={() => setCartOpened(true)}/> 
    {/* в этом файле находится шапка сайта (код)*/}

  <Routes>
    <Route path="/" exact element={ <Home  
      items={items}
      cartItems = {cartItems}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      onChangeSearchInput={onChangeSearchInput}
      onAddToFavorite={onAddToFavorite}
      onAddToCart={onAddToCart}
      isLoading={isLoading}
    /> 
    } />

{/* ---------------------------------- */}

  <Route path="/favorites" exact element={ <Favorites 
  
  /> } />

<Route path="/Orders" exact element={ <Orders
  
  /> } />

</Routes>


  </div>
    </AppContext.Provider>
  );
}

export default App;
