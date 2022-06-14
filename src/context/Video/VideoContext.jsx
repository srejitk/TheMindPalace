import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import useAxios from "../../utils/useAxios";
import {
  compose,
  filterByCategory,
  searchByTitle,
  sortByLatest,
  sortByOldest,
} from "./Utils";
import { VideoReducer } from "./VideoReducer";

const VideoContext = createContext();

const useVideo = () => useContext(VideoContext);

const VideoProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [videoState, videoDispatch] = useReducer(VideoReducer, {
    videolist: [],
    category: "All",
    sortBy: "",
    searchBy: "",
  });

  const { isLoading, responseData, errorFlag } = useAxios("/api/videos");

  useEffect(() => {
    videoDispatch({ type: "GET_VIDEOS", payload: responseData?.videos });
  }, [isLoading]);

  const { videolist } = videoState;

  const filteredVideos = compose(
    videoState,
    filterByCategory,
    sortByLatest,
    sortByOldest,
    searchByTitle
  )(videolist);
  return (
    <VideoContext.Provider
      value={{
        isLoading,
        videoState,
        videoDispatch,
        errorFlag,
        showModal,
        setShowModal,
        dislike,
        setDislike,
        filteredVideos,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { useVideo, VideoProvider };
