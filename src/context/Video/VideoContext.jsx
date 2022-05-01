import { createContext, useContext, useReducer, useEffect } from "react";
import useAxios from "../../utils/useAxios";
import { VideoReducer } from "./VideoReducer";

const VideoContext = createContext();

const useVideo = () => useContext(VideoContext);

const VideoProvider = ({ children }) => {
  const [videoState, videoDispatch] = useReducer(VideoReducer, {
    videolist: [],
  });
  const { isLoading, responseData, errorFlag } = useAxios("/api/videos");

  useEffect(() => {
    videoDispatch({ type: "GET_VIDEOS", payload: responseData?.videos });
  }, [isLoading]);

  return (
    <VideoContext.Provider
      value={{ isLoading, videoState, videoDispatch, errorFlag }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { useVideo, VideoProvider };
