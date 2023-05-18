import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login page if user is not authenticated
        props.history.push("/login");
      }
    }, [props.history]);

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
