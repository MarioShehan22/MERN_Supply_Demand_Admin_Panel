import IncomeChart from "@/components/IncomeChart";
import Expense from "@/components/Expense";
import SupplyBarGraph from "@/components/SupplyBarGraph";
import DemandBarGraph from "@/components/DemandBarGraph";
import TodaySupplyPieChart from "@/components/TodaySupplyPieChart";

const IncomeDetailsPage = () => {

    return(
        <>
            <h2>Dashboard Page</h2>
            <div>
                <div className="flex justify-between">
                    <IncomeChart/>
                    <Expense/>
                </div>
                <div className="flex justify-between">
                    <SupplyBarGraph/>
                    <DemandBarGraph/>
                </div>

                {/*<div className="flex justify-between">*/}
                {/*    <TodaySupplyPieChart/>*/}
                {/*</div>*/}
            </div>
        </>
    );
}
export default IncomeDetailsPage;
