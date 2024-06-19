import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createProductApi,
  deleteProductAPi,
  getAllProductsApi,
} from '../../../api/api';

const AdminDashboard = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);

  const [productNameError, setProductNameError] = useState('');
  const [productDescriptionError, setProductDescriptionError] = useState('');
  const [productPriceError, setProductPriceError] = useState('');
  const [productCategoryError, setProductCategoryError] = useState('');
  const [productImageError, setProductImageError] = useState('');

  const [products, setProducts] = useState([]);

  // Get token
  const token = localStorage.getItem('token');

  // Set the token to the header

  useEffect(() => {
    
    // get all products
    getAllProductsApi()
      .then((res) => {
        if (res.status === 201) {
          setProducts(res.data.products);
        }
        console.log(products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  var validate = () => {
    if (productName.trim() === '') {
      setProductNameError('Product Name is required');
      return false;
    }
    if (productDescription.trim() === '') {
      setProductDescriptionError('Product Description is required');
      return false;
    }
    if (productPrice.trim() === '') {
      setProductPriceError('Product Price is required');
      return false;
    }
    if (productCategory.trim() === '') {
      setProductCategoryError('Product Category is required');
      return false;
    }
    if (productImage === '') {
      setProductImageError('Product Image is required');
      return false;
    }
    return true;
  };

  // Handle SUbmit
  const handleSubmit = (e) => {
    e.preventDefault();

    // validate the form
    // if (!validate()) {
    //   return;
    // }

    // make a form data (txt, file)
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productDescription', productDescription);
    formData.append('productPrice', productPrice);
    formData.append('productCategory', productCategory);
    formData.append('productImage', productImage);

    // call the api
    createProductApi(formData)
      .then((res) => {
        // For successful api
        if (res.status === 201) {
          toast.success(res.data.message);
          window.location.reload();
        }
      })
      .catch((err) => {
        // For error status code
        if (err.response) {
          if (err.response.status === 400) {
            toast.warning(err.response.data.message);
          } else if (err.response.status === 500) {
            toast.error(err.response.data.message);
          } else {
            toast.error('Something went wrong');
          }
        } else {
          toast.error('Something went wrong');
        }
      });
  };

  // handle delete
  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete?');
    if (confirm) {
      deleteProductAPi(id)
        .then((res) => {
          if (res.status === 201) {
            // Add delay of 2 seconds
            toast.success(res.data.message);
            window.location.reload();
          }
        })
        .catch((err) => {
          if (err.response.status === 500) {
            toast.error(err.response.data.message);
          } else {
            toast.error('Something went wrong');
          }
        });
    }
  };

  return (
    <>
      <div className='container-fluid'>
        <div className='d-flex justify-content-between'>
          <div className=''>
            <h1>Admin Dashboard</h1>
          </div>
          <div className=''>
            <button
              type='button'
              className='btn btn-primary'
              data-bs-toggle='modal'
              data-bs-target='#exampleModal'>
              Add Product
            </button>
            <div
              className='modal fade'
              id='exampleModal'
              tabindex='-1'
              aria-labelledby='exampleModalLabel'
              aria-hidden='true'>
              <div className='modal-dialog'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h1
                      className='modal-title fs-5'
                      id='exampleModalLabel'>
                      Modal title
                    </h1>
                    <button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='modal'
                      aria-label='Close'></button>
                  </div>
                  <div className='modal-body'>
                    <form action='/'>
                      <div className='mb-3'>
                        <label
                          for='exampleFormControlInput1'
                          className='form-label'>
                          Product Name
                        </label>
                        <input
                          className='form-control'
                          placeholder='Product Name'
                          onChange={(e) => setProductName(e.target.value)}
                        />
                        {productNameError && (
                          <p className='text-danger'>{productNameError}</p>
                        )}
                      </div>
                      <div className='mb-3'>
                        <label
                          for='productDescription'
                          className='form-label'>
                          Product Description
                        </label>
                        <textarea
                          className='form-control'
                          onChange={(e) =>
                            setProductDescription(e.target.value)
                          }
                          rows='3'></textarea>
                        {productDescriptionError && (
                          <p className='text-danger'>
                            {productDescriptionError}
                          </p>
                        )}
                      </div>
                      <div className='mb-3'>
                        <label
                          for='exampleFormControlInput1'
                          className='form-label'>
                          Product Price
                        </label>
                        <input
                          className='form-control'
                          placeholder='Product Price'
                          onChange={(e) => setProductPrice(e.target.value)}
                        />
                        {productPriceError && (
                          <p className='text-danger'>{productPriceError}</p>
                        )}
                      </div>
                      <div className='mb-3'>
                        <label
                          for='exampleFormControlInput1'
                          className='form-label'>
                          Product Category
                        </label>
                        <select
                          className='form-control'
                          onChange={(e) => setProductCategory(e.target.value)}>
                          <option value='1'>Flower</option>
                          <option value='2'>Category 2</option>
                          <option value='3'>Category 3</option>
                        </select>
                        {productCategoryError && (
                          <p className='text-danger'>{productCategoryError}</p>
                        )}
                      </div>
                      <div className='mb-3'>
                        <label
                          for='exampleFormControlInput1'
                          className='form-label'
                          onChange={(e) => setProductImage(e.target.value)}>
                          Product Image
                        </label>
                        <input
                          onChange={handleImageChange}
                          className='form-control'
                          type='file'
                        />
                        {productImageError && (
                          <p className='text-danger'>{productImageError}</p>
                        )}
                      </div>
                      {previewImage && (
                        <div className='mb-2'>
                          <img
                            src={previewImage}
                            className='img-fluid rounded'
                            alt='product'
                          />
                        </div>
                      )}
                    </form>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-bs-dismiss='modal'>
                      Close
                    </button>
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={handleSubmit}>
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className='table'>
          <thead className='table-dark'>
            <tr>
              <th scope='col'>Product Image</th>
              <th scope='col'>Product Name</th>
              <th scope='col'>Product Price</th>
              <th scope='col'>Product Description</th>
              <th scope='col'>Product Category</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr>
                <td>
                  <img
                    src={`http://localhost:5000/products/${product.productImage}`}
                    alt={product.productName}
                    width='50px'
                  />
                </td>
                <td>{product.productName}</td>
                <td>{product.productPrice}</td>
                <td>{product.productDescription}</td>
                <td>{product.productCategory}</td>
                <td>
                  <Link
                    to={'/admin/update/' + product._id}
                    className='btn btn-primary mx-3'>
                    Edit
                  </Link>

                  <button
                    type='button'
                    class='btn btn-danger'
                    onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;

// Edit product
// Admin Dashboard (Table)
//  Make a route (Admin Edit product)
// Fill all the related information
// edit garna milnu paryo (text,file)
// Make a backend to update product
