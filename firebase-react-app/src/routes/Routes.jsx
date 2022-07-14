import React from "react";
import { Route, Routes } from "react-router-dom";

const TheRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GetDocs />} />
      <Route path="/get-doc/:id" element={<GetOneDoc />} />
      <Route path="/create-doc" element={<CreateDoc />} />
      <Route path="/update-doc/:id" element={<UpdateDoc />} />
    </Routes>
  );
};

export default TheRoutes;
