import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { Link } from 'react-router-dom';
import styles from './OrdersPage.module.css';

export const OrdersPage: React.FC = () => {
  const { orders } = useAppSelector((state) => state.orders);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>История заказов</h1>
        
        {orders.length === 0 ? (
          <div className={styles.emptyWrapper}>
            <div className={styles.emptyContent}>
              <div className={styles.emptyIllustration}>
                <span className={styles.emptyIcon}>📋</span>
              </div>
              <h2 className={styles.emptyTitle}>Заказов пока нет</h2>
              <p className={styles.emptyText}>
                Здесь будет отображаться история ваших покупок. 
                Оформите свой первый заказ в каталоге нашего маркетплейса.
              </p>
              <Link to="/catalog" className={styles.returnButton}>
                Перейти к покупкам
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.ordersList}>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <span className={styles.orderId}>ID ЗАКАЗА: {order.id}</span>
                  <span className={styles.orderDate}>{order.date}</span>
                </div>
                
                <div className={styles.orderItems}>
                  {order.items.map((item) => (
                    <div key={item.id} className={styles.itemRow}>
                      <span className={styles.itemName}>{item.title}</span>
                      <span className={styles.itemQty}>x{item.quantity}</span>
                      <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className={styles.orderFooter}>
                  <span className={styles.totalLabel}>ИТОГО:</span>
                  <span className={styles.totalAmount}>${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};