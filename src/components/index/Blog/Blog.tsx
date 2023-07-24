"use client";
import BlogCard from "../BlogCard/BlogCard";
import { PageSettingContext } from "@/contexts/PageSettingContext";
import { useContext } from "react";
import { CompanyContext } from "@/contexts/CompanyContext";

export default function blog({ category }: { category: string }) {
  const { pageSetting }: any = useContext(PageSettingContext);
  const { blogData }: any = useContext(CompanyContext);

  return (
    <div
      className="w-full py-10  px-6 relative "
      style={{
        background: `linear-gradient(180deg, ${pageSetting?.coreColor}00 0%,  ${pageSetting?.coreColor}50 100%)`,
      }}
    >
      <div className="mx-auto max-w-[1270px] px-4 pt-4  ">
        <div className="">
          <h1 className="text-4xl font-bold mb-5 ">Blog</h1>
        </div>
        {/* Grid Container */}
        <div className="desktop0:grid-cols-4 tablet2:grid-cols-2 tablet2:grid flex flex-col items-center gap-y-4 gap-x-0">
          {blogData.map((i: any, index: any) => (
            <BlogCard key={index} category={category} item={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
