import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header/Header';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { CartPage } from './pages/CartPage/CartPage';
import { OrdersPage } from './pages/OrdersPage/OrdersPage';

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Header />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;