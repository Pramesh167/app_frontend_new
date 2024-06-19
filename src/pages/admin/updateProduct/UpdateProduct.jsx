import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSingleProductApi, updateProductApi } from '../../../api/api';

const UpdateProduct = () => {
  // Get the id from the URL
  const { id } = useParams('id');

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState(null);

  const [oldImage, setOldImage] = useState(null);
  const [previewNewImage, setPreviewNewImage] = useState(null);

  useEffect(() => {
    // Fetch the product details from the API
    getSingleProductApi(id)
      .then((res) => {
        console.log(res.data.product);
        setProductName(res.data.product.productName);
        setProductDescription(res.data.product.productDescription);
        setProductPrice(res.data.product.productPrice);
        setProductCategory(res.data.product.productCategory);
        setOldImage(res.data.product.productImage);
      })
      .catch((err) => {
        console.log(err);
      });
    // set the product details to the state
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setProductImage(file);
    setPreviewNewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productDescription', productDescription);
    formData.append('productPrice', productPrice);
    formData.append('productCategory', productCategory);
    if (productImage) {
      formData.append('productImage', productImage);
    }

    // Call the updateProductApi function from the API
    updateProductApi(id, formData)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          toast.error(err.response.data.message);
        } else if (err.response.status === 400) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Something went wrong');
        }
      });
  };
  return (
    <>
      <div className='container'>
        <div>
          <h2 className='text-center mb-4'>Update Product For {productName}</h2>
        </div>
        <div className='row'>
          <div className='col-4'>
            <form>
              <div className='mb-3'>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label'>
                  Product Name
                </label>
                <input
                  className='form-control'
                  placeholder='Product Name'
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                />
              </div>
              <div className='mb-3'>
                <label
                  htmlFor='productDescription'
                  className='form-label'>
                  Product Description
                </label>
                <textarea
                  className='form-control'
                  onChange={(e) => setProductDescription(e.target.value)}
                  rows='3'
                  value={productDescription}></textarea>
              </div>
              <div className='mb-3'>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label'>
                  Product Price
                </label>
                <input
                  className='form-control'
                  placeholder='Product Price'
                  onChange={(e) => setProductPrice(e.target.value)}
                  value={productPrice}
                />
              </div>
              <div className='mb-3'>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label'>
                  Product Category
                </label>
                <select
                  className='form-control'
                  onChange={(e) => setProductCategory(e.target.value)}
                  defaultValue={productCategory}>
                  <option value='1'>Flower</option>
                  <option value='2'>Category 2</option>
                  <option value='3'>Category 3</option>
                </select>
              </div>
              <div className='mb-3'>
                <label
                  htmlFor='exampleFormControlInput1'
                  className='form-label'
                  onChange={(e) => setProductImage(e.target.value)}>
                  Product Image
                </label>
                <input
                  onChange={handleImageChange}
                  className='form-control'
                  type='file'
                />
              </div>
              <div className=''>
                <button
                  onClick={handleSubmit}
                  className='btn btn-danger btn-block w-100 '>
                  Update Product
                </button>
              </div>
            </form>
          </div>
          <div className='col-8'>
            {!previewNewImage ? (
              <div className='mb-2'>
                <img
                  src={`http://localhost:5000/products/${oldImage}`}
                  className='img-fluid rounded w-100 h-50'
                  alt='product'
                />
              </div>
            ) : (
              <>
                <div className='mb-2'>
                  <img
                    src={previewNewImage}
                    className='img-fluid rounded w-100 h-50'
                    alt='product'
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;