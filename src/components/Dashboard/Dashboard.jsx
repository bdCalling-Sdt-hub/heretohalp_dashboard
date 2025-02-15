import { useAllUserDataQuery } from "../../page/redux/api/userApi";
import { EarningGrowth } from "./EarningGrowth";
import { NewInquire } from "./NewInquire";
import { UserGrowth } from "./UserGrowth";

const Dashboard = () => {
  const{data:totalUser} = useAllUserDataQuery()
  console.log(totalUser)
  return (
    <div className="p-2 min-h-screen">
      <div className="bg-white grid grid-cols-2 text-center py-3">
        <div className="border-r border-slate-300 py-6">
          <h1 className="text-3xl font-bold">{totalUser?.data?.length}</h1>
          <p className="text-[#2E4CB9] mt-3 text-sm">Total User</p>
        </div>
        <div className="border-r border-slate-300 py-6">
          <h1 className="text-3xl font-bold">9</h1>
          <p className="text-[#2E4CB9] mt-3 text-sm">Total Services</p>
        </div>
        
      </div>
      <div className=" gap-5 mt-5">
        <div className="bg-white">
         
        </div>
        <div className="bg-white">
          <EarningGrowth></EarningGrowth>
        </div>
      </div>
      <div className="bg-white mt-5">
        <NewInquire></NewInquire>
      </div>
    </div>
  );
};

export default Dashboard;
