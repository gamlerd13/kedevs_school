import React from "react";

function TitlePage({ title }: { title: string }) {
  return (
    <div className="py-4 text-gray-600">
      <h1 className="text-xl font-medium">{title}</h1>
    </div>
  );
}

export default TitlePage;
