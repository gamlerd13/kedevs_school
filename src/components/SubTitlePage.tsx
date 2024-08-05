import React from "react";

function SubTitlePage({ subTitle }: { subTitle: string }) {
  return (
    <div className="py-4 text-gray-600">
      <h1 className="text-xl font-medium">{subTitle}</h1>
    </div>
  );
}

export default SubTitlePage;
