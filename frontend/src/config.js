// export let apiUrl = 'http://localhost:8000';
export let apiUrl;

if (process.env.REACT_APP_API_URL) {
    apiUrl = process.env.REACT_APP_API_URL;
} else {
    apiUrl = 'http://172.29.177.94:8000';
}