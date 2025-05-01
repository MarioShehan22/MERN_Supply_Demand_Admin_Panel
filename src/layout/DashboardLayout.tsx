import ReactSideBar from "@/components/ReactSideBar";
import {Toaster} from "@/components/ui/toaster";
// @ts-ignore
const DashboardLayout = ({children}) => {
    return(
        <>
            <div className="h-screen w-screen flex overflow-hidden">
                <ReactSideBar/>
                <div className="w-screen p-1">
                    <div className="flex-grow m-2 h-[calc(100vh-2rem)] overflow-y-auto">
                        {children}
                    </div>
                    <Toaster/>
                </div>
            </div>
        </>
    );
}

export default DashboardLayout;
