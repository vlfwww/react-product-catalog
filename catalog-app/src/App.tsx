import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header/Header';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { CartPage } from './pages/CartPage/CartPage';
import { OrdersPage } from './pages/OrdersPage/OrdersPage';
import { HomePage } from './pages/HomePage/HomePage';

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Header />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;