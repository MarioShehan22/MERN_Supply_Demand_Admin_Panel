import {Gauge, HandCoins, ListChecks, ShoppingBasket, Star, Users} from "lucide-react";
import {Link} from "react-router-dom";

const NavBar = () => {
    return(
        <>
            <Link to="/" className="lg:w-[200px] md:w-max h-[40px] rounded-lg flex items-center justify-between mb-8 ml-4 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                <span className="flex items-center gap-x-3">
                      <Gauge size={20} strokeWidth={0.75} />
                      Dashboard
                </span>
            </Link>
            <Link to="/product" className="lg:w-[200px] h-[40px] md:w-max  rounded-lg flex items-center justify-between mb-8 ml-4 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                    <span className="flex items-center gap-x-3">
                      <ShoppingBasket size={20} strokeWidth={0.75} />
                      Product
                    </span>
            </Link>
            <Link to="/review" className="lg:w-[200px] h-[40px] md:w-max rounded-lg flex items-center justify-between mb-8 ml-4 text-sm text-gray-500 no-underline hover:bg-sky-700 hover:cursor-pointer hover:text-white">
                    <span className="flex items-center gap-x-3">
                       <Star size={20} strokeWidth={0.75} />
                      Review
                    </span>
            </Link>
            <div className="mb-8 ml-4 text-sm lg:w-[200px] md:w-max h-[40px] flex flex-col justify-center hover:bg-sky-700 hover:cursor-pointer rounded-lg hover:text-white">
                <div className="flex place-content-between content-center">
                        <span className="flex items-center gap-x-3">
                            <HandCoins size={20} strokeWidth={0.75} />
                            Income
                        </span>
                </div>
            </div>
            <div className="mb-8 ml-4 text-sm lg:w-[200px] md:w-max h-[40px] flex flex-col justify-center hover:bg-sky-700 hover:cursor-pointer rounded-lg hover:text-white">
                <div className="flex place-content-between content-center">
                        <span className="flex items-center gap-x-3">
                            <ListChecks size={20} strokeWidth={0.75} />
                            Order Details
                        </span>
                </div>
            </div>
            <div className="ml-4 text-sm lg:w-[200px] md:w-max h-[40px] flex flex-col justify-center hover:bg-sky-700 hover:cursor-pointer rounded-lg hover:text-white">
                <div className="flex place-content-between items-center">
                        <span className="flex items-center gap-x-3">
                            <Users size={20} strokeWidth={0.75} />
                            Users
                        </span>
                </div>
            </div>
        </>
    );
}
export default NavBar;
