import {Routes,Route} from 'react-router-dom';
import DashboardLayout from "@/layout/DashboardLayout";
import ProductPage from "@/pages/ProductPage";
import OrderDetailPage from "@/pages/OrderDetailPage";
import UserDetailsPage from "@/pages/UserDetailsPage";
import ReviewDetailPage from "@/pages/ReviewDetailPage";
import IncomeDetailsPage from "@/pages/IncomeDetailsPage";
import LoginPage from "@/pages/LoginPage";
import AddressPage from "@/pages/AddressPage";
import SupplyDetailPage from "@/pages/SupplyDetailPage";

const AppRouters = () => {
    return(
        <>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/product' element={<DashboardLayout><ProductPage/></DashboardLayout>} />
                <Route path='/review' element={<DashboardLayout><ProductPage/></DashboardLayout>} />
                <Route path='/order-Details' element={<DashboardLayout><OrderDetailPage/></DashboardLayout>} />
                <Route path='/user-Details' element={<DashboardLayout><UserDetailsPage/></DashboardLayout>} />
                <Route path='/income-Details' element={<DashboardLayout><IncomeDetailsPage/></DashboardLayout>} />
                <Route path='/review-Details' element={<DashboardLayout><ReviewDetailPage/></DashboardLayout>} />
                <Route path='/address' element={<DashboardLayout><AddressPage/></DashboardLayout>} />
                <Route path='/supplier' element={<DashboardLayout><SupplyDetailPage/></DashboardLayout>} />
            </Routes>
        </>
    );
}
export default AppRouters;
