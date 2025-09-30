const getToken = async () => {
    const [token, refreshToken] = await Promise.all([
        localStorage.getItem('token'),
        localStorage.getItem('refreshToken')
    ]);
    return {token, refreshToken};
}

const setToken = (token, refreshToken) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
}

const removeToken = async () => {
        localStorage.removeItem('token');
        // localStorage.removeItem('refreshToken')
}

export {
    getToken,
    setToken,
    removeToken,
}