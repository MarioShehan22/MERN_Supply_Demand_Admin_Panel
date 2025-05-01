import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useState } from "react";
import {
    BookOpenText,
    Car,
    CircleArrowLeft,
    CircleArrowRight, CircleUser,
    LayoutDashboard,
    LogOut,
    MapPin,
    Star,
    User,
    UserRound
} from "lucide-react";
import {Link} from "react-router-dom";

const ReactSideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div style={{ display: 'flex', height: '100%', minHeight: '400px' }} className="border xl:600px md:450px">
            <Sidebar collapsed={collapsed} collapsedWidth="70px">
                <main className="p-1 absolute top-0 right-0">
                    <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
                        {collapsed?<CircleArrowRight strokeWidth={0.75} className="hover:bg-slate-200 "/>:<CircleArrowLeft strokeWidth={0.75} />}
                    </button>
                </main>
                    {collapsed?<br className="mb-4"/>:<h4 className="text-center mb-8">Tour Plan</h4>}

                <Menu>
                    <MenuItem style={{ background:'none',flexShrink:3,cursor:'none' }}/>
                    <MenuItem className="mb-6 cursor-none" style={{ background:'none' }}>
                        <Link to="/income-Details" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex justify-between mb-12 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                            <span className="flex items-center gap-x-3">
                                <LayoutDashboard size={20} strokeWidth={0.75}/>
                                Dashboard
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
                        <Link to="/review-Details" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex justify-between mb-12 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                            <span className="flex items-center gap-x-3">
                                <Star size={20} strokeWidth={0.75}/>
                                Review
                            </span>
                        </Link>
                    </MenuItem>
                    <MenuItem className="mb-6 cursor-none" style={{ background:'none' }}>
                        <Link to="/tour" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex justify-between mb-12 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                            <span className="flex items-center gap-x-3">
                                <Car size={20} strokeWidth={0.75}/>
                                Tour
                            </span>
                        </Link>
                    </MenuItem>
                    <MenuItem className="mb-6 cursor-none" style={{ background:'none' }}>
                        <Link to="/guide" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex justify-between mb-12 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                            <span className="flex items-center gap-x-3">
                                <UserRound size={20} strokeWidth={0.75}/>
                                Guide
                            </span>
                        </Link>
                    </MenuItem>
                    <MenuItem className="mb-6 cursor-none" style={{ background:'none' }}>
                        <Link to="/tourist" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex justify-between mb-12 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                            <span className="flex items-center gap-x-3">
                                <CircleUser size={20} strokeWidth={0.75}/>
                                Tourist
                            </span>
                        </Link>
                    </MenuItem>
                    <MenuItem className="mb-6 cursor-none" style={{ background:'none' }}>
                        <Link to="/booking" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex justify-between mb-12 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                            <span className="flex items-center gap-x-3">
                                <BookOpenText size={20} strokeWidth={0.75}/>
                                Booking
                            </span>
                        </Link>
                    </MenuItem>
                    <MenuItem className="mb-6 cursor-none" style={{ background:'none' }}>
                        <Link to="/supplier" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex justify-between mb-12 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                            <span className="flex items-center gap-x-3">
                                <MapPin size={20} strokeWidth={0.75}/>
                                Location
                            </span>
                        </Link>
                    </MenuItem>
                    <MenuItem style={{ background:'none',flexShrink:3,cursor:'none' }}/>
                    <MenuItem style={{ background:'none',flexShrink:3,cursor:'none' }}/>
                    <MenuItem className="flex items-end cursor-none" style={{ background:'none' }}>
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
