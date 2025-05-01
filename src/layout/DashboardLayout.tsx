import ReactSideBar from "@/components/ReactSideBar";
import {Toaster} from "@/components/ui/toaster";

const DashboardLayout = ({children}) => {
    return(
        <>
            <div className="h-screen w-screen flex">
                <ReactSideBar/>
                <div className="w-screen p-1">
                    <div className="flex-grow m-5">
                        {children}
                    </div>
                    <Toaster />
                </div>
            </div>
        </>
    );
}
export default DashboardLayout;
