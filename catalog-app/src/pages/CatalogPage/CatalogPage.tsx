import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCategories, fetchProducts } from '../../store/productSlice';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import styles from './CatalogPage.module.css';
import { useDebounce } from '../../hooks/useDebounce';

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  
  const { items, loading, categories } = useAppSelector((state) => state.products);
  
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [currentPage, setCurrentPage] = useState(1);
  
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredItems = items
    .filter(item => item.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .filter(item => selectedCategory ? item.category === selectedCategory : true)
    .sort((a, b) => {
      if (sortBy === 'asc') return a.price - b.price;
      if (sortBy === 'desc') return b.price - a.price;
      return 0;
    });

  const itemsPerPage = 12;
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = filteredItems.slice(firstItemIndex, lastItemIndex);

  if (loading) {
    return <div className={styles.loader}>Загрузка...</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {currentItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className={styles.pagination}>
        {Array.from({ length: Math.ceil(items.length / itemsPerPage) }).map((_, i) => (
          <button 
            key={i} 
            className={currentPage === i + 1 ? styles.activePage : styles.pageBtn}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};