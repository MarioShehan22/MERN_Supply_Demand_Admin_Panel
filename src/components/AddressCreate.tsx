import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {useState} from "react";
import {Address} from "@/pages/AddressPage";
import {useGetAddress} from "@/api/AddressService";
import AxiosInstance from "@/config/AxiosInstance";

const AddressCreate = () => {
    const [data, setData] = useState<Address>({
        addressLine:'',
        district:'',
        city:'',
        user: '',
        optional:''
    });
    const{refetch} =useGetAddress();
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
        console.log(data);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AxiosInstance.post('/address/create', data);
            console.log("Created");
            setData({
                addressLine:'',
                district:'',
                city:'',
                user: '',
                optional:''
            });
            refetch
        } catch (error) {
            console.error('Error creating Address:', error);
        }
    }
    return(
      <>
          <form onSubmit={handleSubmit}>
              <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
                  <div className="min-h-[50px] rounded-lg">
                      <Label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="addressLine">Address Line</Label>
                      <Input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-8 p-2"
                          name="addressLine"
                          value={data.addressLine}
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
                          value={data.district}
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
                          value={data.city}
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
                          value={data.user}
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
                          value={data.optional}
                          onChange={handleInputChange}
                          placeholder="Optional"
                      />
                  </div>
                  <div className="min-h-[50px] rounded-lg flex items-end">
                      <div className="sm:col-span-3 flex-1">
                          <Button
                              className=" flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                              type="submit"
                          >Create
                          </Button>
                      </div>
                  </div>
              </div>
          </form>
      </>
  );
}
export default AddressCreate;
