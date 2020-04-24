import React from 'react';

/**
 * 利用HoC，注入请求方法，并且结合生命周期进行安全的请求，防止在组件未挂载时就加载数据并挂载
 *  实现两个方法：
 *  1. 请求直到请求成功
 *  2. 安全地请求（未挂载时不载入数据）
 */

const withRefetch = WrappedComponent => {
  class HOC extends React.Component {
    componentDidMount() {
      this.fetchQueue = [];
      this.refetchDelay = 1000;
      this.refetchTimerId = null;
      this.mounted = true;

      this.refetchTimerId = setInterval(() => this.refetchQueuedRequests(), this.refetchDelay);
    }

    componentWillUnmount() {
      this.mounted = false;
      clearInterval(this.refetchTimerId);
    }

    refetchQueuedRequests() {
      this.fetchQueue = this.fetchQueue.filter(request => !request.completed);

      this.fetchQueue.forEach(async request => {
        if (request.fetching) return;

        request.fetching = true;
        try {
          const data = await request.fetchFunction();
          request.resolveFunction(data);
          request.completed = true;
        } catch (error) {
          request.fetching = false;
        }
      });
    }

    handleInfiniteFetch = async fetchFunction => {
      let resolveFunction;
      const fetchPromise = new Promise(resolve => (resolveFunction = resolve));

      try {
        const data = await fetchFunction();
        resolveFunction(data);
      } catch (error) {
        this.fetchQueue.push({ fetchFunction, resolveFunction });
      }

      return fetchPromise;
    };

    fetchUntilSuccess = fetchFunction =>
      new Promise(async (resolve, reject) => {
        const data = await this.handleInfiniteFetch(fetchFunction);
        this.mounted && resolve(data)
      });

    fetchSafe = fetchFunction =>
      new Promise(async (resolve, reject) => {
        try {
          const data = await fetchFunction();
          this.mounted && resolve(data)
        } catch (error) {
          reject(error);
        }
      });

    render() {
      const refetch = {
        fetchUntilSuccess: this.fetchUntilSuccess,
        fetchSafe: this.fetchSafe
      };

      return <WrappedComponent {...this.props} refetch={refetch} />;
    }
  }

  return HOC;
};

export default withRefetch;
