"use client";
import BounceLoader from "react-spinners/BounceLoader";

import _, { divide } from "lodash";
import { useState, useEffect, useContext } from "react";
import Search from "@/components/webpanel/Search/Search";
import Table from "@/components/webpanel/Table/Table";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { HiStatusOnline, HiStatusOffline } from "react-icons/hi";
import { RiFilterOffLine } from "react-icons/ri";
import { ImBin } from "react-icons/im";
import { FaClipboardList } from "react-icons/fa";
import { FilterContext } from "@/contexts/FilterContext";
import { MdCreateNewFolder } from "react-icons/md";
import DropDown from "@/components/webpanel/DropDown/DropDown";
export default function CompanyProfile() {
  const { filtersState }: any = useContext(FilterContext);
  const [typeState, setTypeState] = useState("ALL TYPE");
  const [showDeleted, setShowDeleted] = useState(false);
  const [companyList, setCompanyList] = useState([] as any);
  const [searchState, setSearchState] = useState("");
  const [loading, setLoading] = useState(true);
  const [showOnline, setShowOnline] = useState("all");
  const [initialCompanyList, setInitialCompanyList] = useState([] as any);
  //  Categories Array
  const uniqueFilterCategories = new Set(
    filtersState.map((i: any) => i?.filterCategory)
  );
  const filterCategories = Array.from(uniqueFilterCategories);
  filterCategories.unshift("ALL TYPE");

  const fetchCompany = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/company-setting`
    );

    setInitialCompanyList(
      response.data.companySetting
        .sort((a: any, b: any) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB.getTime() - dateA.getTime();
        })
        .filter((i: any) => i?.deleted === false)
    );
  };
  const fetchDeletedCompany = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/company-setting`
    );

    setInitialCompanyList(
      response.data.companySetting
        .sort((a: any, b: any) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB.getTime() - dateA.getTime();
        })
        .filter((i: any) => i?.deleted)
    );
  };

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

    showOnline === "all"
      ? setCompanyList(filteredList)
      : showOnline === "online"
      ? setCompanyList(filteredList.filter((i: any) => i.status))
      : showOnline === "offline"
      ? setCompanyList(filteredList.filter((i: any) => !i.status))
      : "";
  };
  // change company status
  const onChangeStatus = async (id: string, newStatus: boolean) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/company-setting`,
        {
          // filterCat: "_id",
          filterValue: id,
          // updatingField: "status",
          newValue: newStatus,
          type: "status",
        }
      );
    } catch (err) {
      err;
    }
  };

  const onMoveItemToRecycleBin = async (id: string, newStatus: boolean) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/company-setting`,
        {
          // filterCat: "_id",
          filterValue: id,
          // updatingField: "status",
          newValue: newStatus,
          type: "delete",
        }
      );
    } catch (err) {
      err;
    }
  };

  const onSoftDelete = (id: string, newStatus: boolean, isRestore: boolean) => {
    if (!isRestore) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#64748B",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          onMoveItemToRecycleBin(id, newStatus);
          Swal.fire("Deleted!", "Item has been removed.", "success");
        }
      });
    } else {
      onMoveItemToRecycleBin(id, newStatus);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item Restored, Please refresh the page",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    setShowOnline("all");
    showDeleted ? fetchDeletedCompany() : fetchCompany();
  }, [showDeleted]);
  useEffect(() => {
    !showDeleted ? fetchCompany() : fetchDeletedCompany();
    setTypeState("");
  }, [showOnline]);
  useEffect(() => {
    searchState.length === 0 && !showDeleted
      ? fetchCompany()
      : searchState.length === 0 && showDeleted
      ? fetchDeletedCompany()
      : "";
    searchState.length === 0 && !showDeleted && setShowOnline("all");
  }, [searchState]);
  useEffect(() => {
    fetchCompany();
    setLoading(false);
  }, []);
  useEffect(() => {
    showOnline === "all"
      ? setCompanyList(initialCompanyList)
      : showOnline === "online"
      ? setCompanyList(initialCompanyList?.filter((i: any) => i.status))
      : showOnline === "offline"
      ? setCompanyList(initialCompanyList?.filter((i: any) => !i.status))
      : "";
  }, [initialCompanyList]);
  useEffect(() => {
    if (typeState !== "ALL TYPE") {
      showOnline === "online"
        ? setCompanyList(
            initialCompanyList?.filter(
              (i: any) => i?.generalInfo?.industry === typeState && i?.status
            )
          )
        : showOnline === "all"
        ? setCompanyList(
            initialCompanyList?.filter(
              (i: any) => i?.generalInfo?.industry === typeState
            )
          )
        : showOnline === "offline"
        ? setCompanyList(
            initialCompanyList?.filter(
              (i: any) => i?.generalInfo?.industry === typeState && !i?.status
            )
          )
        : "";
    } else {
      showOnline === "online"
        ? setCompanyList(initialCompanyList?.filter((i: any) => i?.status))
        : showOnline === "all"
        ? setCompanyList(initialCompanyList)
        : showOnline === "offline"
        ? setCompanyList(initialCompanyList?.filter((i: any) => !i?.status))
        : "";
    }
  }, [typeState]);
  return (
    <div className="bg-white rounded-xl min-h-[100vh] ">
      {/* container */}
      <div className="max-w-[1440px]  px-4 py-6  mx-auto">
        <h1
          className={`${
            showDeleted ? "text-red-400" : "text-slate-500"
          } uppercase flex items-center  gap-2 justify-center  font-semibold text-4xl mb-4  `}
        >
          {showDeleted ? <ImBin size={40} /> : <FaClipboardList size={40} />}

          {!showDeleted
            ? `${process.env.NEXT_PUBLIC_APP_KEY_WORD} List`
            : "Recycle Bin"}
          {showOnline === "online" ? (
            <span className="text-green-400">online:</span>
          ) : showOnline === "offline" ? (
            <span className="text-red-400">offline:</span>
          ) : (
            <span className="text-slate-300">all:</span>
          )}
          {companyList.length > 0 && (
            <span
              className={`${
                showOnline === "online"
                  ? "text-green-400"
                  : showOnline === "offline" || showDeleted
                  ? "text-red-400"
                  : "text-slate-300"
              }`}
            >
              ({companyList.length})
            </span>
          )}
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

        <div className="w-full bg-slate-100/40 py-4 rounded-xl   flex justify-between">
          <Link href="/webpanel/company/new">
            <button
              type="button"
              className="shadow-lg gap-2 items-center rounded-md flex  border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
            >
              <MdCreateNewFolder size={20} />
              Create New {process.env.NEXT_PUBLIC_APP_KEY_WORD}
            </button>
          </Link>
          <div className="flex gap-[2px]">
            <DropDown
              filterList={filterCategories}
              title={typeState || "ALL TYPE"}
              checkBox={false}
              type="dropdown"
              onChange={setTypeState}
              selected={undefined}
              edit={undefined}
              category={undefined}
            />
            {!showDeleted && (
              <div className="flex gap-[2px]">
                <button
                  onClick={() => {
                    showOnline !== "all" && setShowOnline("all");
                  }}
                  className={`${
                    showOnline === "all" ? "bg-green-300" : "bg-slate-500"
                  } flex items-center gap-1 rounded-md bg-green-300 text-white font-semibold px-4 py-2 transition-all shadow-md`}
                >
                  <RiFilterOffLine size={20} /> <h1>SHOW ALL</h1>
                </button>
                <button
                  onClick={() => {
                    showOnline !== "online"
                      ? setShowOnline("online")
                      : setShowOnline("all");
                  }}
                  className={`${
                    showOnline === "online" ? "bg-green-300" : "bg-slate-500"
                  } flex items-center gap-1 rounded-md bg-green-300 text-white font-semibold px-4 py-2 transition-all shadow-md`}
                >
                  <HiStatusOnline size={20} /> <h1>ONLINE</h1>
                </button>
                <button
                  onClick={() => {
                    showOnline !== "offline"
                      ? setShowOnline("offline")
                      : setShowOnline("all");
                  }}
                  className={`${
                    showOnline === "offline" ? "bg-green-300" : "bg-slate-500"
                  } flex items-center gap-1 rounded-md bg-green-300 text-white font-semibold px-4 py-2 transition-all shadow-md`}
                >
                  <HiStatusOffline size={20} /> <h1>OFFLINE</h1>
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setShowDeleted(!showDeleted);
              }}
              className={`${
                showDeleted ? "bg-red-300" : "bg-slate-500"
              } rounded-md flex items-center gap-1 text-white font-semibold px-4 py-2 transition-all shadow-md`}
            >
              <ImBin size={20} /> <h1>Recycle Bin</h1>
            </button>
          </div>
        </div>
        {!loading && !showDeleted ? (
          <Table
            recycle={false}
            list={companyList}
            type="company"
            col2={process.env.NEXT_PUBLIC_APP_KEY_WORD}
            col3="Type"
            col4="Last Edited"
            col5="Actions"
            onChange={onChangeStatus}
            onDelete={onSoftDelete}
          />
        ) : !loading && showDeleted ? (
          <Table
            recycle={true}
            list={companyList}
            type="company"
            col2={process.env.NEXT_PUBLIC_APP_KEY_WORD}
            col3="Type"
            col4="Last Edited"
            col5="Actions"
            onChange={onChangeStatus}
            onDelete={onSoftDelete}
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
