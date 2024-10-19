import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Product } from "@/pages/ProductPage";
import {useGetProduct} from "@/api/ProductService";
import AxiosInstance from "@/config/AxiosInstance";

const ProductUpdate = ({ data, show, onHide }) => {
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const{ refetch}=useGetProduct();
    const [updateData, setUpdateData] = useState<Product>({
        ProductName: '',
        description: '',
        showPrice: 0,
        purchasePrice: 0,
        QuantityInKilos: 0,
        imageUrl: '',
        activeState: false,
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) {
            return; // Handle no file selected (optional)
        }
        const allowedMimeTypes = ['image/jpeg', 'image/png'];
        if (!allowedMimeTypes.includes(selectedFile.type)) {
            return; // Handle invalid file type (optional)
        }
        setSelectedFile(selectedFile);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setUpdateData((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        if (data) {
            setUpdateData((prevData) => ({ ...prevData, ...data }));
        }
    }, [data]); // Only run when data changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('ProductName', updateData.ProductName);
        formData.append('description', updateData.description);
        formData.append('showPrice', updateData.showPrice.toString());
        formData.append('purchasePrice', updateData.purchasePrice.toString());
        formData.append('QuantityInKilos', updateData.QuantityInKilos.toString());
        formData.append('activeState', updateData.activeState);

        if (selectedFile) {
            formData.append('imageUrl', fileInputRef.current?.files[0]);
        }
        console.log(formData);
        try {
            const response = await AxiosInstance.put(
                `/products/update/${data._id}`,
                updateData
            );
            if (response.status === 200) {
                setShowSuccessToast(true); // Set state to true
                onHide();
                refetch();
                return (
                    <>
                        <div className="toast-container position-fixed bottom-0 end-0 p-3">
                            <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                <div className="toast-header">
                                    <strong className="me-auto">Update</strong>
                                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                                </div>
                                <div className="toast-body">
                                    Product Update successfully !!
                                </div>
                            </div>
                        </div>
                    </>
                );
            }
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };
  return(
      <>
          <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
              <form onSubmit={handleSubmit}>
                  <Modal.Title id="contained-modal-title-vcenter" className="p-3">
                      Update Product Details
                  </Modal.Title>
                  <Modal.Body>
                      <div className="flex items-center justify-center grid md:grid-cols-1">
                          <div className="m-2">
                              <Label htmlFor="ProductName">Product Name</Label>
                              <Input
                                  className="p-2"
                                  type="text"
                                  name="ProductName"
                                  defaultValue={updateData.ProductName}
                                  onChange={handleInputChange}
                                  placeholder="Product Name"
                              />
                          </div>
                          <div className="m-2">
                              <Label htmlFor="description">Description</Label>
                              <Input
                                  className="p-2"
                                  type="text"
                                  name="description"
                                  defaultValue={updateData.description}
                                  onChange={handleInputChange}
                                  placeholder="Description"
                              />
                          </div>
                          <div className="m-2 ms:w-1/2">
                              <Label htmlFor="showPrice">Show Price</Label>
                              <Input
                                  className="p-2"
                                  type="text"
                                  name="showPrice"
                                  value={updateData.showPrice}
                                  onChange={handleInputChange}
                                  placeholder="showPrice"
                              />
                          </div>
                          <div className="m-2">
                              <Label htmlFor="purchasePrice">Purchase Price</Label>
                              <Input
                                  className="p-2"
                                  type="number"
                                  name="purchasePrice"
                                  value={updateData.purchasePrice}
                                  onChange={handleInputChange}
                                  placeholder="Purchase Price"
                              />
                          </div>
                          <div className="m-2">
                              <Label htmlFor="QuantityInKilos">Quantity In Kilos</Label>
                              <Input
                                  className="p-2"
                                  type="number"
                                  name="QuantityInKilos"
                                  value={updateData.QuantityInKilos}
                                  onChange={handleInputChange}
                                  placeholder="Quantity In Kilos"
                              />
                          </div>
                          <div className="m-2">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="image">Product Image</label>
                              <input
                                  onChange={handleFileChange}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*"
                                  name="imageUrl"
                                  id="imageUrl"
                              />
                          </div>
                          <div className="m-2">
                              <Label htmlFor="ActiveState">Active State</Label>
                              <Input
                                  className="p-2"
                                  type="checkbox"
                                  name="activeState"
                                  checked={updateData.activeState}
                                  onChange={handleInputChange}
                                  placeholder="Active State"
                              />
                          </div>
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button onClick={onHide}>Close</Button>
                      <Button type="submit" id="liveToastBtn">Submit</Button>
                  </Modal.Footer>
              </form>
          </Modal>
      </>
  );
}
export default ProductUpdate;
