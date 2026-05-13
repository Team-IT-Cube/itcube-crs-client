// here register endpoints

export const base_url = `http://localhost:8000/api`;

export const endpoint = {
    registration: `${base_url}/auth/register`,
    authorization: `${base_url}/auth/login`,
    logout: `${base_url}/auth/logout`,
    courses: `${base_url}/courses`,
    me: `${base_url}/auth/me`,
};