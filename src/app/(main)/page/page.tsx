"use client";
import { useEffect, useState, useContext } from "react";
import Header from "../../../components/index/Header/Header";
import Banner from "../../../components/index/Banner/Banner";
import Core from "../../../components/index/Core/Core";
import Blog from "../../../components/index/Blog/Blog";
import AdSection from "@/components/index/AdSection/AdSection";
import TopBar from "@/components/index/TopBar/TopBar";
import { CompanyContext } from "@/contexts/CompanyContext";

export default function About() {
  const { companyData }: any = useContext(CompanyContext);
  const [search, setSearch] = useState("");
  const [categoryState, setCategoryState] = useState("");
  const [clearFilter, setClearFilter] = useState(false);
  const [filtersConfirmed, setFiltersConfirmed] = useState({} as any);
  const [filtersApplied, setFiltersApplied] = useState([] as any);
  const addFilter = (id: string, type: string, title: string) => {
    !filtersApplied.some((i: any) => i?.id === id)
      ? setFiltersApplied([...filtersApplied, { id, type, title }])
      : setFiltersApplied(filtersApplied.filter((i: any) => i?.id !== id));
  };
  const onClearFilterByType = (type: any) => {
    setFiltersApplied((prev: any) => prev.filter((i: any) => i?.type !== type));
  };
  const onResetFilter = () => {
    setClearFilter(!clearFilter);
    setFiltersApplied([]);
    setSearch("");
  };
  const onSearchClick = () => {
    !search
      ? setFiltersConfirmed({
          ...filtersConfirmed,
          search: search,
          category: categoryState,
          filters: filtersApplied.map((i: any) => i?.id),
        })
      : setFiltersConfirmed({
          ...filtersConfirmed,
          search: search,
          category: categoryState,
          filters: filtersApplied.map((i: any) => i?.id),
        });
  };
  useEffect(() => {
    setFiltersConfirmed({});
  }, [clearFilter]);
  useEffect(() => {
    setFiltersApplied([]);
  }, [categoryState]);

  return (
    <div className="mt-12">
      <TopBar />
      <Header
        category="factory"
        filtersApplied={filtersApplied}
        setFiltersApplied={addFilter}
        onClickReset={onResetFilter}
        clearFilterTrigger={clearFilter}
        onSearchClick={onSearchClick}
        categoryState={categoryState}
        setCategoryState={setCategoryState}
        search={search}
        setSearch={setSearch}
        onMiniClear={onClearFilterByType}
      />
      <Banner category="factory" />
      <Core category="factory" filters={filtersConfirmed} />
      <AdSection />
      <Blog category="factory" companyData={companyData} />
    </div>
  );
}
