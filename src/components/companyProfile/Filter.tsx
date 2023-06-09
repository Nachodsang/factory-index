import { set } from "mongoose";
import { BsCheck2Circle, BsCheckLg } from "react-icons/bs";

export default function Filter({ companyData }: any) {
  const { filters } = companyData;
  const uniqueFilterTypes = Array.from(
    new Set(filters.map((i: any) => i?.filterType))
  );

  return (
    <div className="w-full ">
      {/* container */}
      <div className="max-w-[1440px] mx-auto py-10 flex-col flex gap-6">
        <div className=" flex gap-5 items-center">
          <div className="p-4 rounded-full bg-orange-500 text-white">
            <BsCheck2Circle size={25} className="" />
          </div>
          <h1 className="font-semibold text-2xl">Services</h1>
        </div>
        <div className="flex flex-col gap-3 items-start ">
          <div className="flex items-center gap-2 text-green-600">
            <BsCheckLg size={25} />
            <p className="text-xl font-semibold ">Service in Thailand</p>
          </div>
          {uniqueFilterTypes.map((i: any) => (
            <div className="flex justify-start w-full items-center ">
              <div className="w-[25%] flex items-center  gap-2 text-green-600">
                <BsCheckLg size={25} />
                <span className="text-xl font-semibold">{i}</span>
              </div>
              {filters.map((j: any) => {
                if (j?.filterType === i)
                  return <span>{j?.filterTitle} &nbsp;&nbsp;</span>;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
