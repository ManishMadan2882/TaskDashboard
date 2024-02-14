const api = 'http://localhost:8000/api'
const token = localStorage.getItem('token')
const authHeader = { authorization: `bearer ${token}` }
const headers = {
    'Content-Type': 'application/json'
}

export const register = async (payload) => {
    console.log(payload);
    if (payload.name === '' || payload.email === '' || payload.password === '')
        return false;
    const response = await fetch(api + '/auth/register', {
        method: 'post',
        headers,
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json();
        if (!data.success)
            return false;
        const { token } = data;
        token && localStorage.setItem('token', token)
        return true
    }
    return false;
}
export const login = async (payload) => {
    const response = await fetch(api + '/auth/login', {
        method: 'post',
        headers,
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (!data.success)
            return false
        const { token } = data;
        token && localStorage.setItem('token', token)
        return true
    }
    return false;
}
export const fetchUser = async () => {
    const response = await fetch(api + '/auth/user', { method: 'get', headers: authHeader })
    if (response.status === 403 || response.status === 401) {
        return {
            success: false
        }
    }
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
    }
}
export const fetchAssignments = async () => {
    try {
        const response = await fetch(api + '/assignment', { method: 'get', headers: authHeader });
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(err){
        return []
    }
}