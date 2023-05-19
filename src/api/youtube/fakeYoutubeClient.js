import axios from 'axios';

export default class FakeYoutubeClient {
  async videos({ params }) {
    return axios.get(
      `/data/${
        params.videoCategoryId ? `${params.videoCategoryId}-` : ''
      }most-popular-videos.json`
    );
  }

  //   async channels() {
  //     return axios.get('/data/channel.json');
  //   }
}
