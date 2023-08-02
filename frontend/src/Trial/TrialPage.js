import React from "react";

const TrialPage = () => {
  return (
    <div>
      TrialPage
      <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-slate-200 h-10 w-10 animate-pulse"></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-slate-200 rounded animate-pulse"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-slate-200 rounded col-span-2 animate-pulse"></div>
                <div class="h-2 bg-slate-200 rounded col-span-1 animate-pulse"></div>
              </div>
              <div class="h-2 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      two three
      <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div class="animate-bounce">
          <div class="rounded-full bg-slate-200 h-10 w-10"></div>
        </div>
      </div>
      four
      <div class="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div class="relative">
          <div class="h-[50vh] bg-slate-200 rounded animate-stripes"></div>
          <div class="h-3 mt-3 bg-slate-200 rounded animate-stripes"></div>
        </div>
      </div>
    </div>
  );
};

export default TrialPage;
