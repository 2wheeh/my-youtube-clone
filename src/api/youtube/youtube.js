export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async mostPopularVideos(videoCategoryId) {
    return this.apiClient
      .videos({
        params: {
          part: 'snippet,statistics,contentDetails', // %2C = URL-encoded comma
          chart: 'mostPopular',
          regionCode: 'KR',
          maxResults: 25,
          videoCategoryId: videoCategoryId,
        },
      })
      .then(res => res.data.items);
  }
}
