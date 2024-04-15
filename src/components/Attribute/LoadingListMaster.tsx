import React from "react";

const LoadingListMaster = () => {
  return (
    <div
      role="status"
      className="w-full space-y-4 shadow animate-pulse md:py-2"
    >
      <div className="flex gap-2 items-center mb-4">
        <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-6"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-36"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="basis-1/12 text-2xl border rounded-full border-gray-400 p-2">
            <div className="h-9 bg-gray-300 rounded-full dark:bg-gray-700 w-9"></div>
          </div>
          <div className="flex flex-col">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-36 mb-2.5"></div>
              <div className="w-28 h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
          </div>
        </div>
        <div>
          <div className="h-8 bg-[#4f5052] rounded-full dark:bg-gray-700 w-8"></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="basis-1/12 text-2xl border rounded-full border-gray-400 p-2">
            <div className="h-9 bg-gray-300 rounded-full dark:bg-gray-700 w-9"></div>
          </div>
          <div className="flex flex-col">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-36 mb-2.5"></div>
              <div className="w-28 h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
          </div>
        </div>
        <div>
          <div className="h-8 bg-[#4f5052] rounded-full dark:bg-gray-700 w-8"></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="basis-1/12 text-2xl border rounded-full border-gray-400 p-2">
            <div className="h-9 bg-gray-300 rounded-full dark:bg-gray-700 w-9"></div>
          </div>
          <div className="flex flex-col">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-36 mb-2.5"></div>
              <div className="w-28 h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
          </div>
        </div>
        <div>
          <div className="h-8 bg-[#4f5052] rounded-full dark:bg-gray-700 w-8"></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="basis-1/12 text-2xl border rounded-full border-gray-400 p-2">
            <div className="h-9 bg-gray-300 rounded-full dark:bg-gray-700 w-9"></div>
          </div>
          <div className="flex flex-col">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-36 mb-2.5"></div>
              <div className="w-28 h-2 bg-gray-400 rounded-full dark:bg-gray-700 mb-2.5"></div>
            </div>
          </div>
        </div>
        <div>
          <div className="h-8 bg-[#4f5052] rounded-full dark:bg-gray-700 w-8"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingListMaster;
