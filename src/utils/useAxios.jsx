import axios from "axios";
import React, { useState, useEffect } from "react";

const useAxios = (pathname) => {
  const [isLoading, setIsloading] = useState(false);
  const [responseData, setResponseData] = useState();
  const [errorFlag, setErrorFlag] = useState(false);
  const apiCall = async () => {
    setIsloading(true);
    try {
      const response = await axios.get(pathname);
      if (response.status === 200) {
        setResponseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong", error);
      setErrorFlag(true);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    apiCall();
  }, []);
  return { isLoading, responseData, errorFlag };
};

export default useAxios;
