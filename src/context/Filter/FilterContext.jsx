import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import useAxios from "../../utils/useAxios";

const FilterContext = createContext();

const useFilter = () => useContext(FilterContext);

const FilterProvider = ({ children }) => {
  const { responseData } = useAxios("/api/categories");
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    setcategories(responseData?.categories || []);
  }, [responseData]);

  return (
    <FilterContext.Provider value={{ categories }}>
      {children}
    </FilterContext.Provider>
  );
};

export { useFilter, FilterProvider };
