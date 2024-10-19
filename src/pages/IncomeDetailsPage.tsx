import IncomeChart from "@/components/IncomeChart";
import Expense from "@/components/Expense";
import SupplyBarGraph from "@/components/SupplyBarGraph";
import DemandBarGraph from "@/components/DemandBarGraph";
import TodaySupplyPieChart from "@/components/TodaySupplyPieChart";

const IncomeDetailsPage = () => {
    return(
        <div className="border border-black">
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

    );
}
export default IncomeDetailsPage;
