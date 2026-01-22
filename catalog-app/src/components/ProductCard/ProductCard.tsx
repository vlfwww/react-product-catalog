import React from 'react';
import type { Product } from '../../types/product';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import styles from './ProductCard.module.css';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.card}>
      <div className={styles.category}>{product.category}</div>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.description}>
        {product.description.substring(0, 100)}...
      </p>
      
      <div className={styles.stock}>
        <span style={{ height: 8, width: 8, borderRadius: '50%', background: '#27ae60' }}></span>
        В наличии
      </div>

      <div className={styles.footer}>
        <span className={styles.price}>${product.price}</span>
        <button 
          className={styles.addButton}
          onClick={() => dispatch(addToCart(product))}
        >
          В корзину
        </button>
      </div>
    </div>
  );
};