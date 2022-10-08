import React from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import {
  useGetProductQuery,
  useGetUpdateProductMutation,
} from "../features/productsApi";
import { useNavigate } from "react-router-dom";

export default function FormEditProduct() {
  const form = useRef();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/products");
  };
  const { id } = useParams();
  let idProduct = id;
  const { data: dataProduct } = useGetProductQuery(idProduct);
  const [updateProduct] = useGetUpdateProductMutation();

  const hanldeUpdate = async (e) => {
    e.preventDefault();
    const dataForm = new FormData(form.current);
    const updateData = {
      id: idProduct,
      brand: dataForm.get("brand"),
      model: dataForm.get("model"),
      description: dataForm.get("description"),
      price: dataForm.get("price"),
      type: dataForm.get("type"),
      stock: dataForm.get("stock"),
      photo: dataForm.get("photo"),
    };
    console.log(updateData);
    try {
      const response = await updateProduct(updateData).unwrap();
      handleNavigate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <form ref={form} className="form-control">
            <div className="hero min-h-screen bg-base-200">
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Brand</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={dataProduct?.response?.brand}
                      name="brand"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Model</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={dataProduct?.response?.model}
                      name="model"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <input
                      type="text"
                      name="description"
                      defaultValue={dataProduct?.response?.description}
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Price</span>
                    </label>
                    <input
                      type="number"
                      defaultValue={dataProduct?.response?.price}
                      name="price"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Type</span>
                    </label>
                    <input
                      type="text"
                      name="type"
                      defaultValue={dataProduct?.response?.type}
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Stock</span>
                    </label>
                    <input
                      type="number"
                      defaultValue={dataProduct?.response?.stock}
                      name="stock"
                      className="input input-bordered"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Photos-URL</span>
                    </label>
                    <input
                      type="text"
                      name="photo"
                      defaultValue={dataProduct?.response?.photo}
                      className="input input-bordered"
                    />
                  </div>

                  <div className="form-control mt-6">
                    <button className="btn btn-primary" onClick={hanldeUpdate}>
                      Edit
                    </button>
                  </div>
                  <div className="flex justify-center align-items-center mt-6"></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
