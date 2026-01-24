import cartReducer, { addToCart, removeFromCart } from './cartSlice';

const initialState = {
  items: [],
};

const mockItem = {
  id: 1,
  title: 'Test Item',
  price: 50,
  image: '',
  description: 'some text', 
  category: 'electronics',
  quantity: 1
};

describe('cartSlice reducer', () => {
  test('должен обрабатывать начальное состояние', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({ items: [] });
  });

  test('должен добавлять товар в корзину', () => {
    const actual = cartReducer(initialState, addToCart(mockItem));
    expect(actual.items.length).toBe(1);
    expect(actual.items[0].title).toBe('Test Item');
  });

  test('должен увеличивать количество, если товар уже в корзине', () => {
    const stateWithItem = { items: [{ ...mockItem, quantity: 1 }] };
    const actual = cartReducer(stateWithItem, addToCart(mockItem));
    expect(actual.items[0].quantity).toBe(2);
  });

  test('должен удалять товар из корзины', () => {
    const stateWithItem = { items: [mockItem] };
    const actual = cartReducer(stateWithItem, removeFromCart(1));
    expect(actual.items.length).toBe(0);
  });
});