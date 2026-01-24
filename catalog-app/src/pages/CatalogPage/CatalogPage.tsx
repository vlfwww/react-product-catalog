import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCategories, fetchProducts } from '../../store/productSlice';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { SkeletonCard } from '../../components/Skeleton/SkeletonCard';
import { Filters } from '../../components/Filters/Filters'; 
import { useDebounce } from '../../hooks/useDebounce';
import styles from './CatalogPage.module.css';

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

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory, sortBy]);

  const filteredItems = items
    .filter(item => item.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .filter(item => selectedCategory ? item.category === selectedCategory : true)
    .sort((a, b) => {
      if (sortBy === 'asc') return a.price - b.price;
      if (sortBy === 'desc') return b.price - a.price;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0;
    });

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('');
    setSortBy('none');
  };

  return (
    <div className={styles.container}>
      <Filters 
        categories={categories}
        search={search}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        onSearch={setSearch}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSortBy}
      />

      <div className={styles.grid}>
        {loading ? (
          Array.from({ length: itemsPerPage }).map((_, i) => <SkeletonCard key={i} />)
        ) : currentItems.length > 0 ? (
          currentItems.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <div className={styles.emptyCatalogWrapper}>
            <div className={styles.emptyCatalogContent}>
              <h2 className={styles.emptyTitle}>Ничего не найдено</h2>
              <p className={styles.emptyText}>Попробуйте изменить параметры поиска.</p>
              <button className={styles.resetButton} onClick={handleReset}>Сбросить фильтры</button>
            </div>
          </div>
        )}
      </div>
      
      {!loading && currentItems.length > 0 && totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button 
              key={i} 
              className={currentPage === i + 1 ? styles.activePage : styles.pageBtn}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};