import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { toast } from "react-toastify";
import { AiOutlinePlusCircle, AiOutlineDelete } from "react-icons/ai";
import Spinner from "../Spinner";
import { server } from "../../server";
import axios from "axios";
import CustomModal from "../CustomModal";
import AdminHeader from "../Layout/AdminHeader";
import AdminSideBar from "./Layout/AdminSidebar";

const editProductSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  tags: yup.string().required("Tags is required"),
  originalPrice: yup.string().required("Original Price is required"),
  discountPrice: yup.number().required("Discount Price is required"),
  stock: yup.number().required("Stock is required"),
  // condition: yup.number().required("Condition is required"),
});

const AdminEditProduct = () => {
  const { productId } = useParams();

  const [images, setImages] = useState([]);
  const [currentImages, setcurrentImages] = useState([]);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(0); // Selected image index
  const [modalOpen, setModalOpen] = useState(false);
  const [index, setIndex] = useState("");
  const [image, setImage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      tags: "",
      originalPrice: "",
      discountPrice: "",
      stock: "",
      condition: "",
      images: "",
    },
    validationSchema: editProductSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const name = values.name;
        const description = values.description;
        const category = values.category;
        const tags = values.tags;
        const originalPrice = values.originalPrice;
        const discountPrice = values.discountPrice;
        const stock = values.stock;
        // condition: values.condition,

        const newForm = new FormData();

        images.forEach((image) => {
          newForm.append("images", image);
        });
        newForm.append("name", name);
        newForm.append("description", description);
        newForm.append("category", category);
        newForm.append("tags", tags);
        newForm.append("originalPrice", originalPrice);
        newForm.append("discountPrice", discountPrice);
        newForm.append("stock", stock);

        await axios.put(`${server}/product/update-product/${productId}`, {
          name,
          description,
          category,
          tags,
          originalPrice,
          discountPrice,
          stock,
          images,
        });

        setLoading(false);
        toast.success("Product updated!");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${server}/category/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          `${server}/product/get-product/${productId}`
        );

        const productData = response.data.product;

        formik.setValues({
          name: productData.name,
          description: productData.description,
          category: productData.category,
          tags: productData.tags,
          originalPrice: productData.originalPrice,
          discountPrice: productData.discountPrice,
          stock: productData.stock,
          condition: productData.condition,
        });

        setcurrentImages(productData.images);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // if (reader.readyState >= 1) {
        setImages((old) => [...old, reader.result]);
        // }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleImageChange2 = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setcurrentImages((prevImages) => [...prevImages, ...files]);
  };

  const deleteImage = async (index, image) => {
    try {
      await axios.put(`${server}/product/delete-image/${productId}`, { image });
      const updatedImages = [...currentImages];
      updatedImages.splice(index, 1);
      setcurrentImages(updatedImages);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteImage2 = async (index, image) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };
  const setOperations = async (index, image) => {
    setModalOpen(true);
    setIndex(index);
    setImage(image);
  };

  return (
    <div>
      <AdminHeader />
      <div className="flex items-stretch">
        {modalOpen && (
          <CustomModal
            message={"Are you sure you want to delete this image?"}
            ok={" Yes, I'm sure"}
            cancel={"No, cancel"}
            setModalOpen={setModalOpen}
            performAction={() => deleteImage(index, image)}
            closeModel={() => setModalOpen(false)}
          />
        )}
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={5} />
        </div>
        <div className="w-[90%] 800px:w-[50%] bg-white shadow mx-auto rounded p-6">
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter product name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <ReactQuill
                id="description"
                name="description"
                value={formik.values.description}
                onChange={(value) => formik.setFieldValue("description", value)}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.description}
                </p>
              )}
            </div>
            {/* Rest of the form fields */}
            <div>
              <label className="pb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full mt-2 border h-[35px] rounded-[5px]"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
                name="category"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="text-red-500">
                {formik.touched.category && formik.errors.category}
              </div>
            </div>
            <br />
            <div>
              <label className="pb-2">Tags</label>
              <input
                type="text"
                name="tags"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tags}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product tags..."
              />
              <div className="text-red-500">
                {formik.touched.tags && formik.errors.tags}
              </div>
            </div>
            <br />

            <br />
            <div>
              <label className="pb-2">Original Price</label>
              <input
                type="text"
                name="originalPrice"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.originalPrice}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product price..."
              />
              <div className="text-red-500">
                {formik.touched.originalPrice && formik.errors.originalPrice}
              </div>
            </div>
            <br />
            <div>
              <label className="pb-2">
                Price (With Discount) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="discountPrice"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.discountPrice}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product price with discount..."
              />
              <div className="text-red-500">
                {formik.touched.discountPrice && formik.errors.discountPrice}
              </div>
            </div>
            <br />
            <div>
              <label className="pb-2">
                Product Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="stock"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product stock..."
              />
              <div className="text-red-500">
                {formik.touched.stock && formik.errors.stock}
              </div>
            </div>
            <br />
            <div>
              <label className="pb-2">Current Images</label>
              <input
                type="text"
                name=""
                id=""
                className="hidden"
                multiple
                onChange={handleImageChange2}
              />
              <div className="w-full flex items-center flex-wrap">
                <label htmlFor="upload"></label>
                {currentImages &&
                  currentImages.map((image, index) => (
                    <>
                      <div
                        className={`${
                          select === index ? "border" : null
                        } cursor-pointer`}
                        key={index}
                      >
                        <img
                          src={`${image.url}`}
                          alt=""
                          className="h-[120px] w-[120px] object-cover m-2"
                        />
                        <div
                          className="text-red-500 cursor-pointer"
                          onClick={() => setOperations(index, image)}
                        >
                          <AiOutlineDelete size={20} />
                        </div>
                      </div>
                    </>
                  ))}
              </div>
              <br />
            </div>
            <div>
              <label className="pb-2">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name=""
                id="upload"
                className="hidden"
                multiple
                onChange={handleImageChange}
              />
              <div className="w-full flex items-center flex-wrap">
                <label htmlFor="upload">
                  <AiOutlinePlusCircle
                    size={30}
                    className="mt-3"
                    color="#555"
                  />
                </label>
                {images &&
                  images.map((image, index) => (
                    <div
                      className={`${
                        select === index ? "border" : null
                      } cursor-pointer`}
                      key={index}
                    >
                      <img
                        src={image}
                        alt=""
                        className="h-[120px] w-[120px] object-cover m-2"
                      />
                      <div
                        className="text-red-500 cursor-pointer"
                        onClick={() => deleteImage2(index, image)}
                      >
                        <AiOutlineDelete size={20} />
                      </div>
                    </div>
                  ))}
              </div>
              <br />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <p className="flex">
                  <Spinner /> Updating...
                </p>
              ) : (
                <p className="">Update Product</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
