import { useEffect, useState } from "react";
import { Card } from 'primereact/card';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';


import { Input } from "../../../components/Input/Input"; 
import { useProductsStore, useShoppingStore } from '../../../hooks';

import './styles.css';

export const ShoppingPage = () => {
  const { products, startLoadingStockProducts } = useProductsStore();
  const { paymentTypes, startLoadingPaymentTypes } = useShoppingStore();

  const [paymentType, setPaymentType] = useState(null);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(null);

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
    startLoadingStockProducts();
    startLoadingPaymentTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const handleChangePayment = (e) => {
    setPaymentType(e.value);
  }

  const headerAvailableProducts = () => {
    return (
      <div className="datatable-header">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Filter" />
        </IconField>
      </div>
    );
  };

  const headerSelectedProducts = () => {
    return (
      <div className="datatable-header">
        <Dropdown
          value={paymentType}
          options={paymentTypes}
          optionLabel="description"
          placeholder="Payment Type *"
          onChange={handleChangePayment} />
        &nbsp; &nbsp; &nbsp;
        <Button
          icon="pi pi-shopping-cart"
          tooltip="Purchase"
          severity="success"
          tooltipOptions={{ position: 'bottom' }}
          onClick={() => { }} rounded text />
      </div >
    );
  };

  const selectedQuantity = (rowData) => {
    return (
      <Input
        name="quantity"
        type="number"
        placeholder="Quantity *"
        value={null}
        onChange={() => console.log('rowDatarowData', rowData)}
      />
    );
  }

  return (
    <div className="flex gap-4">
      <Card className="card-shopping">
        <DataTable header={headerAvailableProducts} value={products} size="small"
          emptyMessage="No products found."
          paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}
          filters={filters} globalFilterFields={['name', 'barcode', 'price', 'categoryName']}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}>
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
          {columns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} />
          ))}
        </DataTable>
      </Card>

      <Card className="card-shopping">
        <DataTable header={headerSelectedProducts} value={selectedProducts} size="small"
          emptyMessage="No products found."
          paginator rows={6} rowsPerPageOptions={[6, 12, 30, 56]}>
          {columns.map((col) => (
            <Column key={col.field} field={col.field} header={col.header} />
          ))}
          <Column body={selectedQuantity} style={{ textAlign: 'right' }} />
        </DataTable>
      </Card>
    </div>
  )
}
