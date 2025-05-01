import AddressCreate from "@/components/AddressCreate";
import GetAddress from "@/components/GetAddress";

export interface Address {
    addressLine: string;
    district: string;
    city: string;
    user: '';
    optional: string;
}
const AddressPage = () => {
  return(
      <>
          <AddressCreate/>
          <GetAddress/>
      </>
  );
}
export default AddressPage;
