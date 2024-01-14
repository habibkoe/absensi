import AppLayout from "@/components/AppLayout";
import { siteConfig } from "@/libs/config";
import Head from "next/head";
import React from "react";

const ReportPage = () => {
  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Report`}</title>
      </Head>
    </>
  );
};

ReportPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Report">{content}</AppLayout>;
};

export default ReportPage;
