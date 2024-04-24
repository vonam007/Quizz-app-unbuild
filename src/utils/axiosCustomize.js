import axios from 'axios';
import NProgress from 'nprogress';
import { store } from '../redux/store'
import axiosRetry from 'axios-retry';
import { postLogout, postRefreshToken } from '../services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { doExpired, doLogout } from '../redux/action/userAction';




NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const instance = axios.create({
    baseURL: 'http://localhost:8081/'
});
axiosRetry(instance, { retries: 3 });


// Quản lý việc làm mới token để tránh tình trạng tranh chấp
let isRefreshing = false;
let refreshSubscribers = [];

// Thêm vào một yêu cầu mới sau khi token được làm mới
function onRefreshed(token) {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
    refreshSubscribers.push(callback);
}



// Add a request interceptor
instance.interceptors.request.use(function (config) {
    const access_token = store?.getState()?.user?.account?.access_token;
    if (access_token) {
        config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    NProgress.start();
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// Add a response interceptor
instance.interceptors.response.use((response) => {

    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
}, async (error) => {

    //token expired
    if (error.response.data && error.response.data.EC === -999) {
        const account = store?.getState()?.user?.account;
        // Kiểm tra xem đã có một quy trình làm mới đang chạy không
        if (!isRefreshing) {
            isRefreshing = true;
            const refreshPromise = await postRefreshToken(account.email, account.refresh_token);

            try {
                const res = refreshPromise;

                if (res.EC === 0) {
                    const newToken = res.DT;
                    store.dispatch(doExpired(newToken));
                    isRefreshing = false;

                    // Gửi các yêu cầu bị trì hoãn
                    onRefreshed(newToken);
                    return instance.request(error.config);
                } else {
                    // Đăng xuất nếu không thể làm mới token
                    store.dispatch(doLogout());
                    await postLogout({
                        data: { email: account.email, refresh_token: account.refresh_token },
                    });
                    isRefreshing = false;
                    return Promise.reject(error);
                }
            } catch (e) {
                store.dispatch(doLogout());
                await postLogout({
                    data: { email: account.email, refresh_token: account.refresh_token },
                });
                isRefreshing = false;
                return Promise.reject(error);
            }
        } else {
            // Đăng ký vào danh sách chờ làm mới token
            return new Promise((resolve) => {
                addRefreshSubscriber((newToken) => {
                    error.config.headers.Authorization = `Bearer ${newToken}`;
                    resolve(instance.request(error.config));
                });
            });
        }
    }

    // Promise.resolve(postRefreshToken(account.email, account.refresh_token))
    //     .then(res => {
    //         if (res && res.EC === 0) {
    //             dispatch(doExpired(res.DT));
    //             return instance.request(error.config);
    //         }
    //         else {
    //             dispatch(doLogout());
    //             postLogout({ data: { email: account.email, refresh_token: account.refresh_token } });
    //             return Promise.reject(error);
    //         }
    //     })
    //     .catch(err => {
    //         dispatch(doLogout());
    //         postLogout({ data: { email: account.email, refresh_token: account.refresh_token } });
    //         return Promise.reject(error);
    //     });

    NProgress.done();

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
        ? error.response.data
        : Promise.reject(error);
});
export default instance;