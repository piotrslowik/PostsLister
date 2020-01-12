export const goToLogin = vue => {
    vue.$router.push({name: 'login'});
}

export const getTokenConfig = vue => {
    const token = vue.$cookies.get('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };
    return config;
}

export const setToken = (vue, string) => {
    const token = string.split(' ')[1];
    vue.$cookies.set('token', token, 60);
}