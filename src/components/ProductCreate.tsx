import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {useRef, useState} from "react";
import { Product } from "@/pages/ProductPage";
import {useToast} from "@/components/ui/use-toast";
import * as React from "react";
import AxiosInstance from "@/config/AxiosInstance";

const ProductCreate = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast()
    const [data, setData] = useState<Product>({
        ProductName: '',
        description: '',
        showPrice: 0,
        purchasePrice: 0,
        QuantityInKilos: 0,
        imageUrl: '',
        activeState:false,
    });
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) {
            return; // Handle no file selected (optional)
        }
        const allowedMimeTypes = ['image/jpeg', 'image/png'];
        if (!allowedMimeTypes.includes(selectedFile.type)) {
            toast({
                description: 'Invalid file type. Please select a JPEG or PNG image.',
            });
            return;
        }
        setSelectedFile(selectedFile);
    };

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('ProductName', data.ProductName);
        formData.append('description', data.description);
        formData.append('showPrice', data.showPrice.toString()); // Convert to string
        formData.append('purchasePrice', data.purchasePrice.toString()); // Convert to string
        formData.append('QuantityInKilos', data.QuantityInKilos.toString()); // Convert to string
        formData.append('activeState', data.activeState.toString()); // Convert to boolean

        if (fileInputRef.current?.files?.length > 0) {
            formData.append('imageUrl', fileInputRef.current?.files[0]); // Actual image file
        }
        console.log(formData);
        try {
            const response = await AxiosInstance.post('/products/create', formData);
            if (response.status === 201) {
                toast({
                    description: 'Product created successfully!',
                });
            }
            setData({
                ProductName: '',
                description: '',
                showPrice: 0,
                purchasePrice: 0,
                QuantityInKilos: 0,
                imageUrl: '',
                activeState:false,
            });
        } catch (error) {
            console.error('Error creating product:', error);
            toast({
                description: 'An error occurred. Please try again.',
            });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
                    <div className="min-h-[50px] rounded-lg">
                        <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="ProductName">Product Name</Label>
                        <Input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                            name="ProductName"
                            value={data.ProductName}
                            onChange={handleInputChange}
                            placeholder="Product Name"
                        />
                    </div>
                    <div className="min-h-[50px] rounded-lg">
                        <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="description">Description</Label>
                        <textarea
                            name="description"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                            value={data.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                        />
                    </div>
                    <div className="min-h-[50px] rounded-lg">
                        <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="showPrice">Show Price</Label>
                        <Input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                            name="showPrice"
                            value={data.showPrice}
                            onChange={handleInputChange}
                            placeholder="showPrice"
                        />
                    </div>
                    <div className="min-h-[50px] rounded-lg">
                        <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="purchasePrice">Purchase Price</Label>
                        <Input
                            type="number"
                            name="purchasePrice"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                            value={data.purchasePrice}
                            onChange={handleInputChange}
                            placeholder="Purchase Price"
                        />
                    </div>
                    <div className="min-h-[50px] rounded-lg">
                        <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="QuantityInKilos">Quantity In Kilos</Label>
                        <Input
                            type="number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                            name="QuantityInKilos"
                            value={data.QuantityInKilos}
                            onChange={handleInputChange}
                            placeholder="Quantity In Kilos"
                        />
                    </div>
                    <div className="min-h-[50px] rounded-lg flex items-center">
                        <Input
                            type="checkbox"
                            name="activeState"
                            className="w-4 h-4 border-gray-200 focus:ring-2 focus:ring-blue-300"
                            checked={data.activeState}
                            onChange={handleInputChange}
                            placeholder="activeState"
                        />
                        <Label className="block ms-2 text-sm font-medium text-gray-300" htmlFor="ActiveState">Active State</Label>
                    </div>
                    <div className="min-h-[50px] rounded-lg">
                        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="image">Product Image</label>
                        <input
                            onChange={handleFileChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            name="imageUrl"
                            id="imageUrl"
                        />
                    </div>
                    <div className="min-h-[50px] rounded-lg flex items-end">
                        <div className="sm:col-span-3 flex-1">
                            <Button className=" flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Create</Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
export default ProductCreate;
