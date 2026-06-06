// here register endpoints

export const base_url = `${process.env.NEXT_PUBLIC_API_URL}`;

export const endpoint = {
    registration: `${base_url}/auth/register`,
    authorization: `${base_url}/auth/login`,
    logout: `${base_url}/auth/logout`,
    courses: `${base_url}/courses`,
    me: `${base_url}/auth/me`,
    myEnrollments: `${base_url}/enrollments/my`,
    enrollments: `${base_url}/enrollments`,
    attendance: `${base_url}/attendance`,
    verifyCode: `${base_url}/auth/register/verify`
};