import React from 'react';
import axios from "axios";
import Info from '../Info'
import {useCart} from '../../hooks/useCart';
import styles from './Drawer.moduls.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


export default function Drawer({ onClose, onRemove, items = [] }) {
    const {cartItems, setCartItems, totalPrice} = useCart();
    const [orderId, setOrderId ] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);



    const clearRemoteField = async (itemQty, Url) => {
        for(let i = 0; i < itemQty; i++) {
            await axios.delete(`${Url}/${i + 1}`)

            await delay(1000)
        }
        return true
    }

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post("https://6302582ac6dda4f287b82b44.mockapi.io/orders", {
                items: cartItems
            });
            setOrderId(data.id)
            await clearRemoteField(cartItems.length, "https://6302582ac6dda4f287b82b44.mockapi.io/cart")

            
            setIsOrderComplete(true)
            setCartItems([]);

        } catch (error) {
            alert('Не удалось создать заказ! попробуйте еще раз')
            console.log(error)
        } finally {
            setIsLoading(false)
        }

    };


    return (
        <div className="overlay" >
            <div className="drawer" >               
                <h2 className="d-flex justify-between mb-30">
                    Корзина <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
                </h2>

                {
                    items.length > 0 ? (
                        <div className="d-flex flex-column flex">
                            <div className="items">
                    {items.map((obj) => (
                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                        <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
                            <div className="mr-20 flex">
                                <p className="mb-5">{obj.title}</p>
                                <b>{obj.price} руб.</b>
                            </div>
                            <img 
                                onClick={() => onRemove(obj.id)} 
                                className="removeBtn" 
                                src="/img/btn-remove.svg" 
                                alt="Remove" 
                            />
                        </div>
                    ))}
                </div> 
                <div className="cartTotalBlock">
                <ul>
                    <li>
                        <span>Итого:</span>
                        <div></div>
                        <b>{ totalPrice } руб.</b>
                    </li>

                    <li>
                        <span>Налог 5%:</span>
                        <div></div>
                        <b>{Math.round(totalPrice  * 0.05)} руб. </b>
                    </li>
                </ul>
                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ  <img src="/img/arrow.svg" alt="Arrow" /></button>
            </div>
                        </div>
                    ): (
                    <Info 
                    title={isOrderComplete ? "Заказ оформлен!" : 
                    "Корзина пуста"} 

                    description={isOrderComplete ?
                    `Ваш заказ #${ orderId } скоро будет передан курьерской доставке` :
                    "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} 
                    image={isOrderComplete ? "/img/complete-order.jpg" : "/img/boxed-empty.png"} 
                    />
                    
                )}


            

            
            </div>
        </div >
    );
}

/* export default Drawer; */