import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider, Routes } from "react-router-dom";
import WatchPage from "./components/WatchPage";
import MainContainer from "./components/MainContainer";
import Results from "./components/Results";
import Shorts from "./components/Shorts";
import HistoryPage from "./components/HistoryPage";
import Subscriptions from "./components/Subscriptions";
import YourVideos from "./components/YourVideos";
import YourCourses from "./components/YourCourses";
import WatchLater from "./components/WatchLater";
import PlayList from "./components/PlayList";
import WatchComponent from "./components/WatchComponent";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainContainer />,
      },
      {
        path: "/watch",
        element: <WatchPage />,
      },
      {
        path: "/results",
        element: <Results />,
      },
      {
        path: "/history",
        element: (
          <WatchComponent
            keyWord={"watchHistory"}
            title={"watch history"}
            msg1={"No watch history yet."}
            msg2={"Start watching videos and they’ll appear here."}
          />
        ),
      },
      {
        path: "/shorts",
        element: <Shorts />,
      },
      {
        path: "/subscriptions",
        element: <Subscriptions />,
      },
      {
        path: "/yourVideos",
        element: <YourVideos />,
      },
      {
        path: "/yourCourses",
        element: <YourCourses />,
      },
      {
        path: "/watchLater",
        element: (
          <WatchComponent
            keyWord={"watchLater"}
            title={"watch later"}
            msg1={"😴 Nothing here yet!"}
            msg2={"Add videos to your Watch Later list so you don’t miss out."}
          />
        ),
      },
      {
        path: "/playlists",
        element: <PlayList />,
      },
      {
        path: "/likedVideos",
        element: (
          <WatchComponent
            keyWord={"likedVideos"}
            title={"liked videos"}
            msg1={"💔 No love yet!"}
            msg2={"Like some videos and they’ll show up here."}
          />
        ),
      },
      {
        path: "/playlist",
        element: (
          <WatchComponent
            keyWord={"playlists"}
            title={"playtlist"}
            msg1={"😅 Looks like this playlist is empty."}
            msg2={"Add some videos to see them here!"}
          />
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div className="">
      <Provider store={store}>
        <RouterProvider router={appRouter} />
      </Provider>
    </div>
  );
}

export default App;
