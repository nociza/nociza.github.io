import * as React from "react";
import { pageStyles } from "../styles/global";

// directly redirect to /me
const IndexPage = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/me";
  }
  return <div style={pageStyles}>Well you sure have a slow internet...</div>;
};

export default IndexPage;
