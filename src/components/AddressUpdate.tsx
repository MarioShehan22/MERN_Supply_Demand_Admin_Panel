import {useEffect, useState} from "react";
import {Address} from "@/pages/AddressPage";
import * as React from "react";
import {Modal} from "react-bootstrap";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useGetAddress} from "@/api/AddressService";
import AxiosInstance from "@/config/AxiosInstance";

const AddressUpdate = ({ data, show, onHide }) => {
    const [updateData, setUpdateData] = useState<Address>({
        addressLine:'',
        district:'',
        city:'',
        user:'',
        optional:''
    });
    const{refetch} =useGetAddress();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setUpdateData((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        if (data) {
            setUpdateData((prevData) => ({ ...prevData, ...data }));
        }
    }, [data]); // Only run when data changes
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AxiosInstance.put(`/address/update/${data._id}`, updateData);
            console.log("Updated");
            onHide();
            refetch
        } catch (error) {
            console.error('Error creating Address:', error);
        }
    }
  return(
      <>
          <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
              <form onSubmit={handleSubmit}>
                  <Modal.Title id="contained-modal-title-vcenter" className="p-3">
                      Update Address Details
                  </Modal.Title>
                  <Modal.Body>
                      <div className="flex items-center justify-center grid md:grid-cols-1">
                          <div className="min-h-[50px] rounded-lg">
                              <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="addressLine">Address Line</Label>
                              <Input
                                  type="text"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                                  name="addressLine"
                                  value={updateData.addressLine}
                                  onChange={handleInputChange}
                                  placeholder="Address Line"
                              />
                          </div>
                          <div className="min-h-[50px] rounded-lg">
                              <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="district">District</Label>
                              <Input
                                  type="text"
                                  name="district"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                                  value={updateData.district}
                                  onChange={handleInputChange}
                                  placeholder="District"
                              />
                          </div>
                          <div className="min-h-[50px] rounded-lg">
                              <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="city">City</Label>
                              <Input
                                  type="text"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                                  name="city"
                                  value={updateData.city}
                                  onChange={handleInputChange}
                                  placeholder="City"
                              />
                          </div>
                          <div className="min-h-[50px] rounded-lg">
                              <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="user">User</Label>
                              <Input
                                  type="text"
                                  name="user"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                                  value={updateData.user}
                                  onChange={handleInputChange}
                                  placeholder="User"
                              />
                          </div>
                          <div className="min-h-[50px] rounded-lg">
                              <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="optional">Optional</Label>
                              <Input
                                  type="text"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                                  name="optional"
                                  value={updateData.optional}
                                  onChange={handleInputChange}
                                  placeholder="Optional"
                              />
                          </div>
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button onClick={onHide}>Close</Button>
                      <Button type="submit">Submit</Button>
                  </Modal.Footer>
              </form>
          </Modal>
      </>
  );
}
export default AddressUpdate;
