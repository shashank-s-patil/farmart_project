import { useLocation } from "react-router-dom";
import { useState } from "react";

export function Authentication(props) {

  const routerlocation = useLocation();

  if (routerlocation.pathname == "/" || routerlocation.pathname == "/login" || routerlocation.pathname == "/signup") {
    return props.children;
  }
  else if (document.cookie != null && document.cookie != "" && document.cookie.split("=")[1] != 'null') {
    return props.children;
  }
  else {
    window.location.pathname = "/login";
  }

}








