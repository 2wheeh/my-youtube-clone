import { createContext, useContext } from 'react';
import FakeYoutubeClient from '../api/youtube/fakeYoutubeClient';
import Youtube from '../api/youtube/youtube';
import YoutubeClient from '../api/youtube/youtubeClient';

const YoutubeApiContext = createContext();

// const client = new FakeYoutubeClient();
const client = new YoutubeClient();
const youtube = new Youtube(client);

export const YoutubeApiProvider = ({ children }) => {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
};

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}
