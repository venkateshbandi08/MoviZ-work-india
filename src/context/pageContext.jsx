import { createContext, useState } from "react";

const PageContext = createContext();

const PageContextProvider = ({ children }) => {
  const [topRatedPage, setTopRatedPage] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1);
  console.log(topRatedPage);

  return (
    <PageContext.Provider
      value={{ topRatedPage, setTopRatedPage, upcomingPage, setUpcomingPage }}
    >
      {children}
    </PageContext.Provider>
  );
};

export { PageContext, PageContextProvider };
