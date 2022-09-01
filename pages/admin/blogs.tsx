import ListBlogPosts from "../../components/admin/ListBlogPosts";
import DashSideBar from "../../components/DashSideBar";
import DashHeader from "../../components/DashHeader";
import Head from "next/head";
import React from "react";


const Blog = () => {
  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <main>
        <DashHeader title="Blog" />
        <DashSideBar />
        <ListBlogPosts />
      </main>
    </>
  );
};

export default Blog;