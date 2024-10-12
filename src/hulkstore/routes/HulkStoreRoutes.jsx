import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { ProductsPage, CategoriesPage, ShoppingPage, ReportsPage } from "../pages";

import './styles.css';

export const HulkStoreRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="shopping" element={<ShoppingPage />} />
          <Route path="reports" element={<ReportsPage />} />

          <Route path="/" element={<Navigate to="products" />} />
        </Routes>
      </div>
    </>
  )
}