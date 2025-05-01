import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {useState} from "react";
import {
    Cable,
    CircleArrowLeft,
    CircleArrowRight,
    FishSymbol,
    HandCoins, LogOut,
    MapPin,
    ShoppingBasket,
    Star,
    User
} from "lucide-react";
import {Link} from "react-router-dom";

const ReactSideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div style={{ display: 'flex', height: '100%', minHeight: '400px' }} className="border xl:600px md:450px">
            <Sidebar collapsed={collapsed} collapsedWidth="70px">
                <main className="p-1 absolute right-0">
                    <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
                        {collapsed?<CircleArrowRight strokeWidth={0.75} className="hover:bg-slate-200 "/>:<CircleArrowLeft strokeWidth={0.75} />}
                    </button>
                </main>
                    {collapsed?<br className="mb-4"/>:<h2 className="text-center mb-8">Dashboard</h2>}

                <Menu>
                    <MenuItem className="mb-6 cursor-none" style={{ background:'none' }}>
                        <Link to="/income-Details" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex justify-between mb-12 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                            <span className="flex items-center gap-x-3">
                                <HandCoins size={20} strokeWidth={0.75}/>
                                Income
                            </span>
                        </Link>
                    </MenuItem>
                    <MenuItem className="mb-6 cursor-none" style={{ background:'none' }}>
                        <Link to="/product" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex justify-between mb-12 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                            <span className="flex items-center gap-x-3">
                                <FishSymbol size={20} strokeWidth={0.75}/>
                                Product
                            </span>
                        </Link>
                    </MenuItem>
                    <MenuItem className="mb-6 cursor-none" style={{ background:'none' }}>
                        <Link to="/order-Details" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex justify-between mb-12 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                            <span className="flex items-center gap-x-3">
                                <ShoppingBasket size={20} strokeWidth={0.75}/>
                                Order Details
                            </span>
                        </Link>
                    </MenuItem>
                    <MenuItem className="mb-6 cursor-none" style={{ background:'none' }}>
                        <Link to="/review-Details" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex justify-between mb-12 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                            <span className="flex items-center gap-x-3">
                                <Star size={20} strokeWidth={0.75}/>
                                Review
                            </span>
                        </Link>
                    </MenuItem>
                    <MenuItem className="mb-6 cursor-none" style={{ background:'none' }}>
                        <Link to="/user-Details" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex justify-between mb-12 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                            <span className="flex items-center gap-x-3">
                                <User size={20} strokeWidth={0.75}/>
                                User
                            </span>
                        </Link>
                    </MenuItem>
                    <MenuItem className="mb-6 cursor-none" style={{ background:'none' }}>
                        <Link to="/address" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex justify-between mb-12 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                            <span className="flex items-center gap-x-3">
                                <MapPin size={20} strokeWidth={0.75}/>
                                Address
                            </span>
                        </Link>
                    </MenuItem>
                    <MenuItem className="mb-6 cursor-none" style={{ background:'none' }}>
                        <Link to="/supplier" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex justify-between mb-12 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                            <span className="flex items-center gap-x-3">
                                <Cable size={20} strokeWidth={0.75}/>
                                Supplier Details
                            </span>
                        </Link>
                    </MenuItem>
                    <MenuItem className="mt-[600px] flex items-end cursor-none" style={{ background:'none' }}>
                        <Link to="/login" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex justify-between text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                            <div className="flex items-center gap-x-8">
                               <LogOut size={20} strokeWidth={0.75}/>
                                Log Out
                            </div>
                        </Link>
                    </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    );
};
export default ReactSideBar;
//<Cable />
