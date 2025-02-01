import React, { useState } from 'react';
import Layout from '../../Layouts/Default';
import { Inertia } from '@inertiajs/inertia';
export default function Create(errors) {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [total, setTotal] = useState(0);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleQty = (e) => {
        var newQty = e.target.value;
        var total = newQty * price;
        setQty(newQty);
        setTotal(total);
    }

    const handlePrice = (e) => {
        var newPrice = e.target.value;
        var total = qty * newPrice;
        setPrice(newPrice);
        setTotal(total);
    }

    const handleimageChange = (e) => {
        var selectedImage = e.target.files[0];
        if (selectedImage) {
            setImage(selectedImage);
            setPreview(URL.createObjectURL(selectedImage));
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('qty', qty);
        if (image) {
         formData.append('image', image);
        }

        Inertia.post('/products', formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onError:(errors) => {
                console.log(errors);
            },
        })
    }
    return (
        <Layout>
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Add New Products</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitForm}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {errors.name && <p className="text-danger">{errors.name}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <input type="text" className="form-control" value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                    {errors.category && <p className="text-danger">{errors.category}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" accept="image/*" className="form-control"
                                        onChange={handleimageChange}
                                    />
                                    {errors.image && <p className="text-danger">{errors.image}</p>}
                                    <img src={preview} style={{ width: '150px', height: '150px' }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input type="number" className="form-control" value={price}
                                        onChange={handlePrice}
                                    />
                                    {errors.price && <p className="text-danger">{errors.price}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Qty</label>
                                    <input type="number" className="form-control" value={qty}
                                        onChange={handleQty}
                                    />
                                    {errors.qty && <p className="text-danger">{errors.qty}</p>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Total</label>
                                    <input type="number" className="form-control" readOnly="true" value={total}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary me-1">save</button>
                                <button type="reset" className="btn btn-warning">reset</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

        </Layout>
    )

}
