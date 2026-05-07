import React from "react";

export default function BlogContent({ data }: { data: any }) {
  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: data }}
        className=" text-editor text-right  "
      ></div>
    </>
  );
}
