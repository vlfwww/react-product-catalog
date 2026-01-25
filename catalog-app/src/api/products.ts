const BASE_URL = import.meta.env.VITE_API_URL;

export const productApi = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Ошибка при загрузке товаров');
    return response.json();
  },

  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Ошибка при загрузке категорий');
    return response.json();
  }
};