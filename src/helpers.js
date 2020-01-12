export const getTokenConfig = vue => {
    const token = vue.$cookies.get('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };
    return config;
}