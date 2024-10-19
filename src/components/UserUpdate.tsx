import {useEffect, useState} from "react";
import * as React from "react";
import {User} from "@/pages/UserDetailsPage";
import {Modal} from "react-bootstrap";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Button from "react-bootstrap/Button";
import {useGetUsers} from "@/api/UserService";
import AxiosInstance from "@/config/AxiosInstance";

const UserUpdate = ({data,show,onHide}) => {
    const [updateData, setUpdateData] = useState<User>({
        fistName: '',
        email:'',
        lastName:'',
        phoneNumber:'',
        businessName:'',
        role:'',
        password:'',
        activeState:false
    });
    const{refetch}=useGetUsers();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
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
            await AxiosInstance.put(`/users/update/${data._id}`, updateData);
            console.log("Updated");
            onHide();
            refetch
        } catch (error) {
            console.error('Error creating User:', error);
        }
    }
    const handleClick=(e)=>{
        setUpdateData({...data,role:e.target.value});
        console.log({...data,role:e.target.value});
    }

  return(
      <>
          <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
              <form onSubmit={handleSubmit}>
                  <Modal.Title id="contained-modal-title-vcenter" className="p-3">
                      Update User Details
                  </Modal.Title>
                  <Modal.Body>
                      <div className="flex items-center justify-center grid md:grid-cols-1">
                          <div className="min-h-[50px] rounded-lg">
                              <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="fistName">fistName</Label>
                              <Input
                                  type="text"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                                  name="fistName"
                                  value={updateData.fistName}
                                  onChange={handleInputChange}
                                  placeholder="fistName"
                              />
                          </div>
                          <div className="min-h-[50px] rounded-lg">
                              <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="email">email</Label>
                              <Input
                                  type="text"
                                  name="email"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                                  value={updateData.email}
                                  onChange={handleInputChange}
                                  placeholder="email"
                              />
                          </div>
                          <div className="min-h-[50px] rounded-lg">
                              <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="lastName">lastName</Label>
                              <Input
                                  type="text"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                                  name="lastName"
                                  value={updateData.lastName}
                                  onChange={handleInputChange}
                                  placeholder="lastName"
                              />
                          </div>
                          <div className="min-h-[50px] rounded-lg">
                              <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="businessName">businessName</Label>
                              <Input
                                  type="text"
                                  name="businessName"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                                  value={updateData.businessName}
                                  onChange={handleInputChange}
                                  placeholder="businessName"
                              />
                          </div>
                          <div className="min-h-[50px] rounded-lg">
                              <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="phoneNumber">phoneNumber</Label>
                              <Input
                                  type="text"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                                  name="phoneNumber"
                                  value={updateData.phoneNumber}
                                  onChange={handleInputChange}
                                  placeholder="phoneNumber"
                              />
                          </div>
                          <div className="my-2 min-h-[50px] rounded-lg">
                              <Label className="block my-2 text-sm font-medium text-gray-900" htmlFor="role">role</Label>
                              <form id="dateFilterForm" className='min-h-[40px] text-gray-900 rounded-lg flex focus:ring-transparent'>
                                  <select id="dateFilterSelect" name="role" onClick={handleClick}>
                                      <option value="Customer" className="text-gray-900">Customer</option>
                                      <option value="Supplier" className="text-gray-900">Supplier</option>
                                      <option value="Admin" className="text-gray-900">Admin</option>
                                      <option value="Manager" className="text-gray-900">Manager</option>
                                  </select>
                              </form>
                          </div>
                          <div className="min-h-[50px] rounded-lg">
                              <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="ActiveState">Active State</Label>
                              <Input
                                  type="checkbox"
                                  name="activeState"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                                  checked={data.activeState}
                                  onChange={handleInputChange}
                                  placeholder="activeState"
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
export default UserUpdate;
