import React from 'react';
import type { Product } from '../../types/product';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import toast from 'react-hot-toast'; 
import styles from './ProductCard.module.css';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    
    toast.success(`${product.title.substring(0, 20)}... добавлен в корзину!`, {
      style: {
        border: '1px solid #1a3b5d',
        padding: '16px',
        color: '#1a3b5d',
        fontWeight: '500',
      },
      iconTheme: {
        primary: '#1a3b5d',
        secondary: '#FFFAEE',
      },
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.category}>{product.category}</div>
      
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} className={styles.image} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title} title={product.title}>
          {product.title}
        </h3>
        
        <p className={styles.description}>
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description}
        </p>
        
        <div className={styles.stock}>
          <span className={styles.stockDot}></span>
          В наличии
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.price}>${product.price.toFixed(2)}</span>
        
        <button 
          className={styles.addButton}
          onClick={handleAddToCart}
        >
          В корзину
        </button>
      </div>
    </div>
  );
};