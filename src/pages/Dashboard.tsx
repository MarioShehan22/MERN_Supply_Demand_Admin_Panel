import { useState, useEffect } from "react";
import AxiosInstance from "@/config/AxiosInstance.ts";

// @ts-ignore
const Dashboard = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch dashboard data (initial load and every 60 seconds)
    useEffect(() => {
        let isMounted = true;

        const fetchDashboard = async () => {
            setLoading(true);
            try {
                // Replace '' with your actual dashboard API endpoint
                const response = await AxiosInstance.get('/admin/stats');
                setData(response.data)
                // Axios does not have response.ok, check status instead
                if (response.status !== 200) {
                    throw new Error("Failed to fetch dashboard data");
                }

                if (isMounted) {
                    setData(response.data);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || "Unknown error");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchDashboard();
        const interval = setInterval(fetchDashboard, 60000); // Refresh every 60 seconds

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    if (loading) return <div>Loading dashboard...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    if (!data) return null;

    //const { dashboardData, tourStats, bookingStats, popularTours, topGuides } = data;
  // @ts-ignore
    return (
        <div className="dashboard-wrapper p-6 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-bold flex items-center">
                    Welcome <span className="ml-2">👋</span>
                </h1>
                <p className="text-gray-600">
                    Track activity trends and popular destinations in real time.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Users" value={data.userStats.totalUsers} />
                <StatCard title="Total Tours" value={data.tourStats.totalTours} />
                <StatCard title="Total Bookings" value={data.bookingStats.totalBookings} />
            </div>

            <div className="mb-8">
                <StatCard title="Total Revenue" value={`$${data.totalRevenue}`} />
            </div>

            <div className="mb-8 bg-white rounded shadow p-4">
                <h2 className="text-xl font-semibold mb-2">Bookings & Revenue Overview</h2>
                <div className="h-40 flex items-center justify-center text-gray-400">
                    <span>Chart coming soon</span>
                </div>
            </div>
            <div className="bg-white rounded shadow p-4">
                <h2 className="text-xl font-semibold mb-4">Popular Tours</h2>
                <ToursTable tours={data.popularTours || []} />
            </div>
        </div>
    );
};
// @ts-ignore
const StatCard = ({ title, value }) => (
    <div className="bg-white rounded shadow p-6 flex flex-col items-center">
        <span className="text-gray-500 text-sm">{title}</span>
        <span className="text-2xl font-bold">{value}</span>
    </div>
);
// interface Tour {
//     _id: string;
//     title: string;
//     location: string;
//     startDate: string;
//     endDate: string;
//     price: number;
//     bookingCount: number;
//     status: string;
// }
//
// interface ToursTableProps {
//     tours: Tour[];
// }

// @ts-ignore
const ToursTable = ({ tours }) => {
    if (!Array.isArray(tours) || tours.length === 0) {
        return <div>No tours available.</div>;
    }

    return (
        <table className="w-full text-left">
            <thead>
            <tr>
                <th className="py-2">Title</th>
                <th className="py-2">Location</th>
                <th className="py-2">Start Date</th>
                <th className="py-2">End Date</th>
                <th className="py-2">Price</th>
                <th className="py-2">Bookings</th>
                <th className="py-2">Status</th>
            </tr>
            </thead>
            <tbody>
            {tours.map((tour) => (
                <tr key={tour._id} className="border-t">
                    <td className="py-2">{tour.title}</td>
                    <td className="py-2">{tour.location}</td>
                    <td className="py-2">{new Date(tour.startDate).toLocaleDateString()}</td>
                    <td className="py-2">{new Date(tour.endDate).toLocaleDateString()}</td>
                    <td className="py-2">${tour.price}</td>
                    <td className="py-2">{tour.bookingCount}</td>
                    <td className="py-2">{tour.status}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};


export default Dashboard;
