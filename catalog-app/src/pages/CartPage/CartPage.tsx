import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cartSlice';
import { addOrder } from '../../store/orderSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import styles from './CartPage.module.css';

export const CartPage: React.FC = () => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (id: number, title: string) => {
    dispatch(removeFromCart(id));
    toast.error(`${title.substring(0, 20)}... удален`, {
      icon: '🗑️',
      duration: 2000
    });
  };

  const handleCheckout = () => {
    const orderData = {
      id: Math.random().toString(36).substring(2, 11).toUpperCase(),
      date: new Date().toLocaleString(),
      items: [...items],
      total: totalPrice,
    };

    dispatch(addOrder(orderData));
    dispatch(clearCart());
    
    toast.success('Заказ оформлен! Переходим к истории...', {
      duration: 3000,
      icon: '📦',
    });

    setTimeout(() => navigate('/orders'), 2000);
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyWrapper}>
        <div className={styles.emptyContent}>
          <div className={styles.emptyIllustration}>
            <span className={styles.emptyIcon}>🛒</span>
          </div>
          <h2 className={styles.emptyTitle}>Ваша корзина пуста</h2>
          <p className={styles.emptyText}>
            Похоже, вы еще ничего не добавили в корзину. 
            Начните с каталога, чтобы найти интересные товары.
          </p>
          <Link to="/catalog" className={styles.returnButton}>
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ваша корзина</h1>
      <div className={styles.cartContent}>
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.title} className={styles.itemImage} />
              <div className={styles.itemInfo}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
              </div>
              <div className={styles.quantityControls}>
                <button 
                  onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))} 
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => dispatch(updateQuantity({ id: item.id, delta: 1 }))}
                >
                  +
                </button>
              </div>
              <div className={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button 
                className={styles.removeButton} 
                onClick={() => handleRemove(item.id, item.title)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <aside className={styles.summaryCard}>
          <div className={styles.totalRow}>
            <span>Итого:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button 
            className={styles.checkoutButton} 
            onClick={handleCheckout}
          >
            Оформить заказ
          </button>
        </aside>
      </div>
    </div>
  );
};