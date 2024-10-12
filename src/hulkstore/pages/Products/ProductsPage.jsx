import { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';

import { ProductModal } from "../../components/ProductModal";
import { useProductsStore } from '../../../hooks';

import './styles.css';

export const ProductsPage = () => {
  const {
    products,
    startLoadingProducts,
    startSavingProduct,
    startUpdatingProduct,
    startDeletingProduct,
  } = useProductsStore();

  const [product, setProduct] = useState(null);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    barcode: { value: null, matchMode: FilterMatchMode.CONTAINS },
    price: { value: null, matchMode: FilterMatchMode.CONTAINS },
    categoryName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'barcode', header: 'Barcode' },
    { field: 'price', header: 'Price' },
    { field: 'quantity', header: 'Stock' },
    { field: 'categoryName', header: 'Category' }
  ];

  useEffect(() => {
    startLoadingProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const showModalAddProduct = () => {
    setProduct(null);
    setShowProductsModal(true);
  }

  const showModalEditProduct = (rowData) => {
    setProduct(rowData);
    setShowProductsModal(true);
  }

  const handleAddProduct = async (product) => {
    (product?.id)
      ? await startUpdatingProduct(product)
      : await startSavingProduct(product);
    setShowProductsModal(false);
    await startLoadingProducts();
  }

  const handleDeleteProduct = async (rowData) => {
    await startDeletingProduct(rowData);
    await startLoadingProducts();
  }

  const header = () => {
    return (
      <div className="datatable-header">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Filter" />
        </IconField>
        <Button type="button" icon="pi pi-plus" label="New" outlined onClick={showModalAddProduct} />
      </div>
    );
  };

  const actions = (rowData) => {
    return (
      <>
        <Button icon="pi pi-pencil"
          className="p-button-rounded p-button-text"
          onClick={() => showModalEditProduct(rowData)} 
          tooltip="Edit Product" tooltipOptions={{ position: 'bottom' }}/>
        <Button icon="pi pi-trash" severity="danger"
          className="p-button-rounded p-button-text"
          onClick={() => handleDeleteProduct(rowData)} 
          tooltip="Delete Product" tooltipOptions={{ position: 'bottom' }}/>
      </>
    );
  };

  return (
    <>
      <Card className="card-products">
        <DataTable header={header} value={products} size="small"
          emptyMessage="No products found."
          paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}
          filters={filters} globalFilterFields={['name', 'barcode', 'price', 'categoryName']}>
          {columns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} />
          ))}
          <Column body={actions} style={{ textAlign: 'right' }} />
        </DataTable>
      </Card>
      <ProductModal
        product={product}
        showModal={showProductsModal}
        setShowModal={setShowProductsModal}
        handleAddProduct={handleAddProduct}
      />
    </>
  )
}
