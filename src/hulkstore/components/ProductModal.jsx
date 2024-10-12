import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Toolbar } from 'primereact/toolbar';

import { Input } from '../../components/Input/Input';
import { useCategoriesStore } from '../../hooks';

import './styles.css';

export const ProductModal = (props) => {
    const {
        product = null,
        showModal = false,
        setShowModal,
        handleAddProduct,
    } = props;
    const [form, setForm] = useState({});
    const [category, setCategory] = useState(null);
    const { categories, startLoadingCategories } = useCategoriesStore();

    const itemCategory = useMemo(() => {
        return categories?.find((item) => {
            return item.id === product?.categoryId;
        });
    }, [categories, product]);

    useEffect(() => {
        if (showModal) {
            startLoadingCategories();
            setCategory(itemCategory);
            setForm({ ...form, ...product });
        } else {
            setForm({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showModal]);

    const handleChangeCategory = (e) => {
        setCategory(e.value);
        setForm({ ...form, categoryId: e.value.id });
    }

    const header = () => {
        return (
            <Toolbar style={{ backgroundColor: '#f9fafb' }}
                start={(<b>{product ? 'Edit Product' : 'New Product'}</b>)}
            />
        );
    }

    return (
        <Dialog
            modal
            header={header}
            closable={false}
            visible={showModal}
            style={{ width: '40rem' }}
            className='product-modal'>
            <Card>
                <div className='flex flex-column px-4 gap-4'>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Name *"
                        value={form.name}
                        onChange={({ target }) => setForm({ ...form, name: target.value })}
                    />
                    <Input
                        name="barcode"
                        type="text"
                        placeholder="Barcode *"
                        value={form.barcode}
                        onChange={({ target }) => setForm({ ...form, barcode: target.value })}
                    />
                    <Input
                        name="price"
                        type="number"
                        placeholder="Price *"
                        value={form.price}
                        onChange={({ target }) => setForm({ ...form, price: target.value })}
                    />
                    <Input
                        name="stock"
                        type="number"
                        placeholder="Stock *"
                        value={form.quantity}
                        onChange={({ target }) => setForm({ ...form, quantity: target.value })}
                    />
                    <Dropdown
                        value={category}
                        options={categories}
                        optionLabel="name"
                        placeholder="Category *"
                        onChange={handleChangeCategory} />
                </div>
                <div className='flex px-4 pt-4 gap-4'>
                    <Button label="Cancel" severity='secondary' onClick={() => setShowModal(false)} text raised />
                    <Button label="Agree" severity='secondary' onClick={() => handleAddProduct(form)} text raised />
                </div>
            </Card>
        </Dialog>
    )
}

ProductModal.propTypes = {
    product: PropTypes.object,
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func.isRequired,
    handleAddProduct: PropTypes.func.isRequired,
}
