import axios from "axios";

const authUrl = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${authUrl}/login`, { username, password })
    const { authToken } = data
    if (authToken) {
      return { success: true, ...data }
    }
    return data
  } catch(error) {
    console.log('[Login Failed]: ', error)
  }
}

export const register = async ({ username, email, password }) => {
  try {
    const { data } = await axios.post(`${authUrl}/register`, {
      username,
      email,
      password,
    });
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.log('[Register Failed]: ', error);
  }
};

export const checkPremission = async (authToken) => {
  try {
    const res = await axios.get(`${authUrl}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken
      }
    })
    return res.data.success
  } catch(error) {
    console.log(['Check Premission Failed: ', error])
  }
} 