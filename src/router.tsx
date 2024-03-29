import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";
import GithubConfirm from "./routes/GithubConfirm";
import KakaoConfirm from "./routes/KakaoConfirm";
import UploadRoom from "./routes/UploadRoom";
import UploadPhotos from "./routes/UploadRoomPhotos";
import NaverConfirm from "./routes/NaverConfirm";
import Experiences from "./routes/Experiences";
import ExperienceDetail from "./routes/ExperienceDetail";
import UploadExperience from "./routes/UploadExperience";
import UploadExperiencePhotos from "./routes/UploadExperiencePhotos";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "rooms/upload",
        element: <UploadRoom />,
      },
      {
        path: "rooms/:roomPk",
        element: <RoomDetail />,
      },
      {
        path: "rooms/:roomPk/photos",
        element: <UploadPhotos />,
      },
      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GithubConfirm />,
          },
          {
            path: "kakao",
            element: <KakaoConfirm />,
          },
          {
            path: "naver",
            element: <NaverConfirm />,
          },
        ],
      },
      {
        path: "experiences",
        element: <Experiences />,
      },
      {
        path: "experiences/:experiencePk",
        element: <ExperienceDetail />,
      },
      {
        path: "experiences/upload",
        element: <UploadExperience />,
      },
      {
        path: "experiences/:experiencePk/photos",
        element: <UploadExperiencePhotos />,
      },
    ],
  },
]);

export default router;
