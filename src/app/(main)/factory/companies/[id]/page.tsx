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
import TopBarItemPage from "@/components/companyProfile/TopBarItemPage";

const fetchCompany = async (company: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/company-item?id=${company}`,

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
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/blogs`
    );
    return response?.data?.blogSetting?.filter(
      (i: any) => i?.status && !i?.deleted
    );
  };

  const blogs = await fetchBlog();
  const companyData = await fetchCompany(company);

  return (
    <CompanyContextProvider companyData={companyData}>
      {companyData && !companyData?.deleted ? (
        <>
          <meta name="keywords" content={companyData?.seo?.th?.join()} />
          <meta
            name="description"
            content={companyData?.details?.fullDescription}
          />
          <TopBarItemPage />

          <Header companyData={companyData} />

          <Content companyData={companyData} />
          <Gallery companyData={companyData} />
          <Filter companyData={companyData} />
          <Blogs blogList={blogs} companyData={companyData} />
          <Map companyData={companyData} />
          <Footer companyData={companyData} blogList={blogs} />
        </>
      ) : (
        <div className="flex  h-[100vh]">
          <h1 className="m-auto font-bold text-4xl">Page Not Found</h1>
        </div>
      )}
    </CompanyContextProvider>
  );
}
