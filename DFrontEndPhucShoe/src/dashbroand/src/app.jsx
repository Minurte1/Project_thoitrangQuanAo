import "./global.css";

import { useScrollToTop } from "./hooks/use-scroll-to-top";
import { useState, useEffect } from "react";
import Router from "./routes/sections";
import ThemeProvider from "./theme";
import Loading from "../../components/ComponentLoading/CompnentLoading.tsx";
import axios from "axios";
import { useLocation } from "react-router-dom";
// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </>
  );
}
