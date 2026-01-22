import styles from './Skeleton.module.css';

export const SkeletonCard = () => (
  <div className={styles.skeletonCard}>
    <div className={styles.skeletonImage}></div>
    <div className={styles.skeletonTitle}></div>
    <div className={styles.skeletonText}></div>
    <div className={styles.skeletonButton}></div>
  </div>
);