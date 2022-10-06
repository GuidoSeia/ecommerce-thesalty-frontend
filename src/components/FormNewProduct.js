import React from 'react'
import {  useRef } from "react"
import {useGetNewProductMutation} from "../features/productsApi"
import '../styles//FormNewProduct.css'


export default function FormNewProduct() {
    const formRef = useRef();
const [newProd] = useGetNewProductMutation()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const newProduct = {
            brand:formData.get("brand"),
            model:formData.get("model"),
            description:formData.get("description"),
            price:formData.get("price"),
            type:formData.get("type"),
            stock:formData.get("stock"),
            photo:[formData.get("photo")],
        }
        console.log(newProduct)

        try {
               const response = await  newProd(newProduct)

        }
        catch(error){
            console.log(error);
            }
        
    }

  return (
    <div>

<div>
    <form ref={formRef}  className="">
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="sideBar">
      <h1 className="text-5xl font-bold">New Product</h1>
      <figure><img src="/relojes-hombre-abaco.webp" alt="Shoes" /></figure>
    </div>
    <div className="">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Brand</span>
          </label>
          <input type="text" name="brand" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Model</span>
          </label>
          <input type="text" name="model" className="input input-bordered" />
        
        </div>
        <div className="form-control">
<label className="label">
  <span className="label-text">Description</span>
</label>
<textarea type="text" name="description" className="input input-bordered decription" />
</div>
<div className="form-control">
<label className="label">
  <span className="label-text">Price</span>
</label>
<input type="number" name="price" className="input input-bordered" />
</div>
<div className="form-control">
<label className="label">
  <span className="label-text">Type</span>
</label>
<input type="text" name="type" className="input input-bordered" />
</div>
<div className="form-control">
<label className="label">
  <span className="label-text">Stock</span>
</label>
<input type="number" name="stock" className="input input-bordered" />
</div>
<div className="form-control">
<label className="label">
  <span className="label-text">Photos-URL</span>
</label>
<input type="text" name="photo" className="input input-bordered" />
</div>



        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={handleSubmit}>Create</button>
          
        </div>
        <div className="flex justify-center align-items-center mt-6">
        </div>
      </div>
    </div>
  </div>
</div>
    </form>
  </div>
    </div>
  )
}
