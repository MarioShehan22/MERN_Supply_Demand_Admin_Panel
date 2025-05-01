import {Routes,Route} from 'react-router-dom';
import DashboardLayout from "@/layout/DashboardLayout";
import TourPage from "@/pages/TourPage.tsx";
import GuideDetailPage from "@/pages/GuideDetailPage.tsx";
import UserDetailsPage from "@/pages/UserDetailsPage";
import ReviewDetailPage from "@/pages/ReviewDetailPage";
import LoginPage from "@/pages/LoginPage";
import TouristPage from "@/pages/TouristPage.tsx";
import LocationDetailPage from "@/pages/LocationDetailPage.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import BookingDetailsPage from "@/pages/BookingDetailsPage.tsx";

const AppRouters = () => {
    return(
        <>
            <Routes>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/tour' element={<DashboardLayout><TourPage/></DashboardLayout>} />
                {/*<Route path='/review' element={<DashboardLayout><TourPage/></DashboardLayout>} />*/}
                <Route path='/guide' element={<DashboardLayout><GuideDetailPage/></DashboardLayout>} />
                <Route path='/booking' element={<DashboardLayout><BookingDetailsPage/></DashboardLayout>} />
                <Route path='/user-Details' element={<DashboardLayout><UserDetailsPage/></DashboardLayout>} />
                <Route path='/income-Details' element={<DashboardLayout><Dashboard/></DashboardLayout>} />
                <Route path='/review-Details' element={<DashboardLayout><ReviewDetailPage/></DashboardLayout>} />
                <Route path='/tourist' element={<DashboardLayout><TouristPage/></DashboardLayout>} />
                <Route path='/supplier' element={<DashboardLayout><LocationDetailPage/></DashboardLayout>} />
            </Routes>
        </>
    );
}
export default AppRouters;
