import React from "react";

export default function page({ params }: { params: { id: string } }) {
  return <div className="p-3">{params.id}</div>;
}
