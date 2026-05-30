"use client";
import React from "react";
import RelatedProducts from "@/components/_modules/relatedProducts";
import BlogContent from "@/components/_templates/blog/content";
import RelatedPost from "@/components/_templates/blog/relatedPost";
import PrimaryLoading from "@/components/_templates/loading/primaryLoading";
import { useParams } from "next/navigation";
import { useFetch } from "@/configs/HTTPService";

export default function BlogDetails() {
  const params = useParams();
  const { id } = params;
  const { data, isLoading } = useFetch<any>(`/api/v1/blog/${id}`);

  return (
    <>
      {!isLoading ? (
        <>
          {/* banner  */}

          {/* <PageBanner
            imgUrl={data?.image ?? ""}
            subTitle={data?.sub_title ?? ""}
            title={data?.title ?? ""}
            isBlackText={false}
          /> */}

          <div
            className="BlogDetails_banner_ads_mobile lg:BlogDetails_banner_ads_desk mb-10 flex items-center lg:mb-[60px] mt-20 md:mt-14 h-[360px] md:h-[550px] 2xl:h-[650px] 3xl:h-[950px]"
            style={{
              background: `linear-gradient(-90deg, #000000 0%, rgba(0, 0, 0, 0) 51.5%), url('${data?.post?.image_1}')`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="mx-auto w-[91.12%] lg:w-[91.67%] 4xl:w-[85%]">
              <h1 className="font-peyda-900 text-2xl text-white lg:font-peyda-600 lg:text-[58px]">
                {data?.post?.title_1}
              </h1>

              <span
                className="block mt-6  font-peyda-600 text-lg text-white lg:text-xl"
                dangerouslySetInnerHTML={{ __html: data?.post?.summary }}
              ></span>
            </div>
          </div>
          {/* banner  */}

          <div className="mx-auto w-[91.12%] lg:w-[91.67%] 4xl:w-[85%] pb-10">
            <BlogContent data={data?.post?.body} />

            {data?.related_posts.length ? (
              <RelatedPost RelatedPostData={data?.related_posts} />
            ) : null}

            {data?.RelatedProducts?.length ? (
              <RelatedProducts
                RelatedProductsData={data?.RelatedProducts}
                className="hidden w-full lg:block"
              />
            ) : null}
          </div>
        </>
      ) : (
        <PrimaryLoading />
      )}
    </>
  );
}
