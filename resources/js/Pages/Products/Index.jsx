// import React
import React from 'react';

//import layout
import Layout from '../../Layouts/Default';
import { Link } from '@inertiajs/inertia-react';

//import Link
// import { Link } from '@inertiajs/react';
// import { Inertia } from '@inertiajs/inertia';

export default function ProductsIndex({ products, session }) {

    // const deleteProduct = async (id) => {
    //     Inertia.delete(`/products/${id}`);
    // }
  return (
    <Layout>
        <div style={{ marginTop: '100px' }}>

            <Link href="/products/create" className="btn btn-success btn-md mb-3">Add Product</Link>

            {session.success && (
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Success!</strong> Your operation was completed successfully.
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>

            )}

            <div className="card border-0 rounded shadow-sm">
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Category</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Image</th>
                                <th scope="col">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                        { products.map((product, index) => (
                            <tr key={ index }>
                                <td>{ product.name }</td>
                                <td>{ product.price }</td>
                                <td>{ product.category }</td>
                                <td>{ product.qty }</td>
                                <td><img src={`/storage/${product.image}`} alt="" width="150px" /></td>
                                {/* <td className="text-center">
                                <Link href={`/products/${product.id}/edit`} className="btn btn-sm btn-primary me-2">EDIT</Link>
                                <button onClick={()=>deleteProduct(product.id)} className='btn btn-danger'>Delete</button>
                                </td> */}
                            </tr>
                        )) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Layout>
  )
}
