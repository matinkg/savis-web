import Logo from "@/components/_modules/logo";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="m-auto h-fit w-fit">
      <div className="flex flex-col items-center gap-y-4">
        <Logo type="third" className="h-[160px] w-[160px] text-blue-1000" />

        <>
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      </div>
    </div>
  );
}
