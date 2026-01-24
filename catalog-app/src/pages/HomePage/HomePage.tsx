import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Marketplace</h1>
          <p className={styles.subtitle}>
            Профессиональные решения для вашего бизнеса и жизни. 
            Доступ к мировым брендам в один клик.
          </p>
          <Link to="/catalog" className={styles.ctaButton}>
            Перейти в каталог
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featureCard}>
          <span className={styles.number}>01</span>
          <h3>Безопасность</h3>
          <p>Гарантия качества и защита каждой сделки на уровне банковских стандартов.</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.number}>02</span>
          <h3>Скорость</h3>
          <p>Мгновенная обработка заказов и логистика по всему миру.</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.number}>03</span>
          <h3>Эксклюзивность</h3>
          <p>Прямые поставки от производителей и уникальные предложения для клиентов BNP.</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.number}>04</span>
          <h3>Поддержка</h3>
          <p>Персональный менеджер для решения любых вопросов в режиме 24/7.</p>
        </div>
      </section>
    </div>
  );
};