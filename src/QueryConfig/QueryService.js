const generalQueryConfig = {
    staleTime: 10000,
    cacheTime: 10000,
    refetchOnWindowFocus: false,
    refetchInterval: 600000,
    retry: false,
    onError: (err) => {
    }
}

let queryServices = {};

queryServices._fetch = (url, option) => {
    return fetch(url, generalQueryConfig)
    .then((res) => {
        if (res.status !== 401) {
            return res.text()
        }
        return Promise.reject();
    }).then((response) => {
        return Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        return Promise.reject(error);
    })
}

export default queryServices;