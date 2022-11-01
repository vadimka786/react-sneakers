import React from 'react'
import { Link } from 'react-router-dom';
import {useCart} from '../../hooks/useCart';
import styles from './Header.module.scss';


function Header(props) {
    const {totalPrice} = useCart();

    return (
        <header className="d-flex justify-between align-center p-40" >

            <Link to="/">

            
            <div className="d-flex align-center">
                    <img width={40} height={40} src="/img/logo.png" alt="Logotype" />
                <div>
                    <h3 className="text-uppercase">React Sneakers</h3>
                    <p>Магазин лучших кроссовок</p>
                </div>
            </div>

            </Link>

            <ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p" >
                    <img width={18} height={18} src="/img/cart.svg" alt="Корзина" />
                    <span>{totalPrice} руб.</span>
                </li>

                <li className="mr-20 cu-p" >
                    <Link to="/favorites">
                        <img width={18} height={18} src="/img/Vector.svg" alt="Закладки" />
                    </Link>
                </li>

                <Link to="/Orders">
                        
                <li onClick={props.onCloseCart}>
                    <img width={18} height={18} src="/img/Union.svg" alt="Пользователь" />
                </li>
                    </Link>


            </ul>
        </header>
    );
}

export default Header;