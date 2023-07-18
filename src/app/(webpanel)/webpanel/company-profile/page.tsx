"use client";
import BounceLoader from "react-spinners/BounceLoader";

import _, { divide } from "lodash";
import { useState, useEffect } from "react";
import Search from "@/components/webpanel/Search/Search";
import Table from "@/components/webpanel/Table/Table";
import axios from "axios";
import Link from "next/link";
export default function CompanyProfile() {
  const [companyList, setCompanyList] = useState([] as any);
  const [searchState, setSearchState] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchCompany = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/company-setting"
    );

    setCompanyList(response.data.companySetting);
    return response.data.companySetting;
  };

  // const companyList = await fetchCompany();
  const onClickSearch = () => {
    const filteredList = _.filter(companyList, (i: any) => {
      return (
        i?.generalInfo?.companyNameTh
          ?.toLowerCase()
          .includes(searchState.toLowerCase()) ||
        i?.generalInfo?.companyNameEn
          ?.toLowerCase()
          .includes(searchState.toLowerCase())
      );
    });

    searchState ? setCompanyList(filteredList) : fetchCompany();
  };
  // change company status
  const onChangeStatus = async (id: string, newStatus: boolean) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/company-setting",
        {
          // filterCat: "_id",
          filterValue: id,
          // updatingField: "status",
          newValue: newStatus,
          type: "status",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCompany();
  }, [searchState]);
  useEffect(() => {
    fetchCompany();
    setLoading(false);
  }, []);
  return (
    <div className="bg-white rounded-xl min-h-[100vh] ">
      {/* container */}
      <div className="max-w-[1440px]  px-4 py-6  mx-auto">
        <h1 className="text-center font-semibold text-xl mb-4  ">
          Company List{" "}
          {companyList.length > 0 && <span>({companyList.length})</span>}
        </h1>

        <div className="w-full ">
          <div className="w-[30%] mx-auto ">
            <Search
              searchState={searchState}
              setSearchState={setSearchState}
              onClick={onClickSearch}
            />
          </div>
          {/* Create new company profile */}
        </div>
        <Link href="/webpanel/company/new">
          <button
            type="button"
            className="inline-block rounded-full border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
          >
            Create New Profile
          </button>
        </Link>
        {!loading ? (
          <Table
            list={companyList}
            type="company"
            col2="company"
            col3=""
            col4="Last Edited"
            col5="Actions"
            onChange={onChangeStatus}
          />
        ) : (
          <div className=" absolute top-[40%] left-[50%] translate-x-[-50%] ">
            <BounceLoader
              color="rgb(87,12,248)"
              size={100}
              speedMultiplier={3}
            />
          </div>
        )}
      </div>
    </div>
  );
}
