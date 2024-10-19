import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {useState} from "react";
import {User} from "@/pages/UserDetailsPage";
import {Button} from "@/components/ui/button";
import AxiosInstance from "@/config/AxiosInstance";

const UserInput = () => {
    const [data, setData] = useState<User>({
        fistName: '',
        email:'',
        lastName:'',
        phoneNumber:'',
        businessName:'',
        role:'',
        password:'',
        activeState:false
    });

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setData({...data,[name]: value});
        console.log(data);
        //onInputChange(data);
    };
    const handleClick=(e)=>{
        setData({...data,role:e.target.value});
        console.log({...data,role:e.target.value});
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try {
            console.log(data);
            await AxiosInstance.post('/users/register', data);
            setData({
                fistName: '',
                email:'',
                lastName:'',
                phoneNumber:'',
                businessName:'',
                role:'',
                password:'',
                activeState:false
            });
        } catch (error) {
            console.error('Error creating User:', error);
        }
    }

  return(
      <>
          <form onSubmit={handleSubmit}>
              <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
                  <div className="min-h-[50px] rounded-lg">
                      <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="fist Name">fistName</Label>
                      <Input
                          type="text"
                          name="fistName"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2 "
                          onChange={handleInputChange}
                          placeholder="fistName"
                          // autoComplete={false}
                      />
                  </div>
                  <div className="min-h-[50px] rounded-lg">
                      <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">email</Label>
                      <Input
                          type="text"
                          name="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                          onChange={handleInputChange}
                          placeholder="email"
                      />
                  </div>
                  <div className="min-h-[50px] rounded-lg">
                      <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="lastName">lastName</Label>
                      <Input
                          type="text"
                          name="lastName"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                          onChange={handleInputChange}
                          placeholder="lastName"
                      />
                  </div>
                  <div className="min-h-[50px] rounded-lg">
                      <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="phoneNumber">phoneNumber</Label>
                      <Input
                          type="text"
                          name="phoneNumber"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                          onChange={handleInputChange}
                          placeholder="phoneNumber"
                      />
                  </div>
                  <div className="min-h-[50px] rounded-lg">
                      <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="businessName">businessName</Label>
                      <Input
                          type="text"
                          name="businessName"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                          onChange={handleInputChange}
                          placeholder="businessName"
                      />
                  </div>
                  <div className="min-h-[50px] rounded-lg">
                      <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="password">Password</Label>
                      <Input
                          type="text"
                          name="password"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                          onChange={handleInputChange}
                          placeholder="password"
                      />
                  </div>
                  <div className="min-h-[50px] rounded-lg">
                      <Label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="role">role</Label>
                      <form id="dateFilterForm" className='min-h-[40px] text-gray-900 rounded-lg flex'>
                          <select id="dateFilterSelect" name="role" onClick={handleClick}>
                              <option value="Customer" className="text-gray-900">Customer</option>
                              <option value="Supplier" className="text-gray-900">Supplier</option>
                              <option value="Admin" className="text-gray-900">Admin</option>
                              <option value="Manager" className="text-gray-900">Manager</option>
                          </select>
                      </form>
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
                  <div className="min-h-[50px] rounded-lg flex items-end">
                      <div className="sm:col-span-3 flex-1">
                          <Button
                              className=" flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                              type="submit"
                          >
                              Create
                          </Button>
                      </div>
                  </div>
              </div>
          </form>
      </>
  );

}
export default UserInput;
// onChange={
// (e)=>{
//     onInputNameChange(e.target.value);
// }
// }
