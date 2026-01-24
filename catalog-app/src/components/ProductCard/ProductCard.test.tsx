import { describe, test, expect } from 'vitest'; 
import '@testing-library/jest-dom';            
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../store/cartSlice';

const renderWithRedux = (component: React.ReactNode) => {
  const store = configureStore({ reducer: { cart: cartReducer } });
  return render(<Provider store={store}>{component}</Provider>);
};

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 100,
  description: 'Description',
  category: 'electronics',
  image: 'test.jpg',
  rating: { rate: 4.5, count: 10 }
};

describe('ProductCard Component', () => {
  test('отображает название и цену товара', () => {
    renderWithRedux(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$100/)).toBeInTheDocument();
  });

  test('кнопка добавления в корзину активна', () => {
    renderWithRedux(<ProductCard product={mockProduct} />);
    const button = screen.getByRole('button', { name: /В корзину/i });
    
    expect(button).toBeEnabled();
    fireEvent.click(button);
  });
});