import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import styles from './Header.module.css';

export const Header = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}><h1>Marketplace</h1></Link>
      <nav className={styles.nav}>
        <Link to="/catalog">Каталог</Link>
        <Link to="/cart">
          Корзина 
          {totalCount > 0 && <span className={styles.badge}>{totalCount}</span>}
        </Link>
        <Link to="/orders">Заказы</Link>
      </nav>
    </header>
  );
};