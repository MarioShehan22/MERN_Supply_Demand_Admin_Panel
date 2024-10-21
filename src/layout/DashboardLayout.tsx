import ReactSideBar from "@/components/ReactSideBar";

const DashboardLayout = ({children}) => {
    return(
        <>
            <div className="h-screen w-screen flex">
                <ReactSideBar/>
                <div className="w-screen p-1">
                    <div className="flex-grow m-5">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
export default DashboardLayout;
