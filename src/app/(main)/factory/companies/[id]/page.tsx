import Blogs from "@/components/companyProfile/Blogs";
import Content from "@/components/companyProfile/Content";
import Filter from "@/components/companyProfile/Filter";
import Footer from "@/components/companyProfile/Footer";
import Gallery from "@/components/companyProfile/Gallery";
import Header from "@/components/companyProfile/Header";
import CompanyContextProvider from "@/contexts/CompanyContext";
import Map from "@/components/companyProfile/Map";
import axios from "axios";
import ShareModal from "@/components/companyProfile/ShareModal";

const fetchCompany = async (company: string) => {
  const response = await fetch(
    `http://localhost:3000/api/company-item?id=${company}`,
    {
      cache: "no-store",
      // next: { revalidate: 5 },
    }
  );
  const data = await response.json();

  return data?.companySetting;
};

export default async function Page({ params }: { params: { id: string } }) {
  const company = params.id;
  // fetchCompanyProfile
  const fetchBlog = async () => {
    const response = await axios.get("http://localhost:3000/api/blogs");
    return response?.data?.blogSetting;
  };

  const blogs = await fetchBlog();
  const companyData = await fetchCompany(company);

  return (
    <CompanyContextProvider companyData={companyData}>
      {companyData ? (
        <>
          <meta name="keywords" content={companyData?.seo?.th?.join()} />
          <meta
            name="description"
            content={companyData?.details?.fullDescription}
          />

          <Header companyData={companyData} />

          <Content companyData={companyData} />
          <Gallery companyData={companyData} />
          <Filter companyData={companyData} />
          <Blogs blogList={blogs} />
          <Footer companyData={companyData} blogList={blogs} />
          <Map companyData={companyData} />
          
        </>
      ) : (
        <div className="flex  h-[100vh]">
          <h1 className="m-auto font-bold text-4xl">Page Not Found</h1>
        </div>
      )}
    </CompanyContextProvider>
  );
}
