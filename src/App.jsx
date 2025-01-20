import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./library/firebase";
import { useUserStore } from "./library/userStore";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Video from "./components/videoRoom/Video";
import Body from "./components/Body";

const App = () => {
  const { isLoading, fetchUserInfo } = useUserStore();

  const appRouter = [
    {
      path: "/",
      element: <Body />,
    },
    {
      path: `/video-call/:selectedUserId`,
      element: <Video />,
    },
  ];

  // Create a Routes component using the object configuration
  const AppRoutes = () => {
    return useRoutes(appRouter);
  };

  useEffect(() => {
    // When using real time data then its important to use cleaup function
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => unSub;
  }, [fetchUserInfo]);

  if (isLoading)
    return (
      <div className="p-[50px] mt-[35vh] text-4xl rounded-lg bg-[#111928e6] ">
        Loading...
      </div>
    );

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
};

export default App;
