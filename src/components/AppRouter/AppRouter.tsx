import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from "../Loading";

const Home = React.lazy(() => import("../../pages/Home"));
const NotFound = React.lazy(() => import("../../pages/NotFound"));
const Success = React.lazy(() => import("../../pages/Success"));

export enum APP_ROUTES {
  HOME = "/",
  SUCCESS = "/success",
}

export const AppRouter = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path={APP_ROUTES.HOME} element={<Home />} />
          <Route path={APP_ROUTES.SUCCESS} element={<Success />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
};
