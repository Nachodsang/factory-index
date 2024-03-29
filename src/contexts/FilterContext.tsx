"use client";
import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

export const FilterContext = createContext({});
const URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/filter-setting`;
const FilterContextProvider = ({ children, filtersFromMain }: any) => {
  const [filtersState, setFiltersState] = useState([]);
  const onCheckFilter = async (filterSet: any) => {
    const response = await axios.put(URL, filterSet);
  };

  const fetchFilter = async () => {
    const response = await axios.get(URL);
    const data = await response.data.filters;

    setFiltersState(data);

    return data;
  };

  //   Add Filter
  const addFilter = async (type: any, title: any, category: any) => {
    try {
      const response = await axios.post(URL, {
        filterType: type,
        filterTitle: title,
        filterCategory: category,
      });

      fetchFilter();
    } catch (err) {}
  };

  useEffect(() => {
    fetchFilter();
  }, []);

  return (
    <FilterContext.Provider
      value={{
        filtersState,
        onCheckFilter,
        addFilter,
        filtersFromMain,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
export default FilterContextProvider;
