"use client";
import { useState, useEffect } from "react";

import EditHomePage from "../Editor2/editHomePage";

import Swal from "sweetalert2";
export default function DetailsInfo({ state, setState, edit, content }: any) {
  const defaultDetailsState = { shortDescription: "", fullDescription: "" };
  const [detailsState, setDetailsState] = useState(defaultDetailsState);
  const onHandleSave = () => {
    if (edit) {
      setState({
        ...state,
        details: detailsState,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Details have been updated!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setState({
        ...state,
        details: detailsState,
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Details have been saved!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  useEffect(() => {
    edit && setDetailsState(state?.details);
    ("yyyy");
    state;
  }, [state]);
  detailsState;
  return (
    <div className="w-full bg-white border border-slate-300 shadow-sm rounded-md  flex flex-col p-4">
      <div className="flex justify-start border-b border-slate-300 py-2">
        <div className="font-bold text-2xl text-slate-700">Details</div>
      </div>
      <div className="py-10 mb-4 flex flex-col gap-4">
        <div className="flex flex-col  items-start">
          <label htmlFor="" className="font-semibold text-xl text-slate-700">
            SEO Description (short)
          </label>
          <textarea
            value={detailsState?.shortDescription || ""}
            onChange={(e) => {
              setDetailsState({
                ...detailsState,
                shortDescription: e.target.value,
              });
            }}
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Short Description . . . "
          ></textarea>
        </div>
        <div className="flex flex-col  items-start">
          <label htmlFor="" className="font-semibold text-xl text-slate-700">
            SEO Description (full)
          </label>
          <textarea
            value={detailsState?.fullDescription || ""}
            onChange={(e) => {
              setDetailsState({
                ...detailsState,
                fullDescription: e.target.value,
              });
            }}
            id="message"
            rows={8}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Full Description . . . "
          ></textarea>
        </div>
        {/* <Editor />
         */}
        <div className="w-full flex justify-start ">
          <h1 className="text-slate-600 font-bold text-2xl">
            Content Template
          </h1>
        </div>
        <EditHomePage
          state={detailsState}
          setState={setDetailsState}
          edit={edit}
          content={content}
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={onHandleSave}
          type="button"
          className="inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
        >
          save
        </button>
      </div>
    </div>
  );
}
