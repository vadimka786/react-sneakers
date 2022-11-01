import React from 'react';
import axios from 'axios';
import Card from '../components/Card';
import AppContext from '../context';


export default function Orders() {

    const [Orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const {onAddToCart, onAddToFavorite} = React.useContext(AppContext);

    React.useEffect(() => {
        (async () => {
          try {
            const { data } = await axios.get('https://6302582ac6dda4f287b82b44.mockapi.io/orders');
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            setIsLoading(false);
          } catch (error) {
            alert('Ошибка при запросе заказов');
            console.log(error);
          }
        })();
      }, []);

    return (
    <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40" >
            <h1>Мои заказы</h1>
        </div>

<div className="d-flex flex-wrap">

    {(isLoading ? [...Array(2)] : Orders).map((item, index) => (
        <Card 
        key={index}
        Loading={isLoading}
        {...item}
        />
))}
</div>
    </div>
    );
}
