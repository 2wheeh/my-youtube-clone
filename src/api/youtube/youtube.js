export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getMostPopularVideos(videoCategoryId) {
    const params = {
      part: 'snippet,statistics,contentDetails', // %2C = URL-encoded comma
      chart: 'mostPopular',
      regionCode: 'KR',
      maxResults: 25,
      videoCategoryId: videoCategoryId,
    };

    return this.apiClient //
      .videos({ params })
      .then(res => res.data.items);
  }

  async getCategories() {
    const params = {
      part: 'snippet',
      hl: `ko`,
      regionCode: 'KR',
    };

    return this.apiClient //
      .videoCategories({ params })
      .then(res => res.data.items);
  }

  async getChannel(channelId) {
    const params = {
      part: 'snippet,statistics,contentDetails', // %2C = URL-encoded comma
      id: channelId,
    };

    return this.apiClient //
      .channels({ params })
      .then(res => res.data.items[0]);
  }
}
