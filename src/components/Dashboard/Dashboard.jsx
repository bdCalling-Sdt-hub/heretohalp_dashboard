import { EarningGrowth } from "./EarningGrowth";
import { NewInquire } from "./NewInquire";
import { UserGrowth } from "./UserGrowth";

const Dashboard = () => {
  return (
    <div className="p-2 min-h-screen">
      <div className="bg-white grid grid-cols-3 text-center py-3">
        <div className="border-r border-slate-300 py-6">
          <h1 className="text-3xl font-bold">18.5k</h1>
          <p className="text-[#2E4CB9] mt-3 text-sm">Total User</p>
        </div>
        <div className="border-r border-slate-300 py-6">
          <h1 className="text-3xl font-bold">18.5k</h1>
          <p className="text-[#2E4CB9] mt-3 text-sm">Total User</p>
        </div>
        <div className=" py-6">
          <h1 className="text-3xl font-bold">18.5k</h1>
          <p className="text-[#2E4CB9] mt-3 text-sm">Total User</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        <div className="bg-white">
          <UserGrowth></UserGrowth>
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
