import axios from "axios";

const authUrl = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${authUrl}/login`, { username, password })
    const { authToken } = data
    if (authToken) {
      return { sucess: true, ...data }
    }
    return data
  } catch(error) {
    console.log('[Login Failed]: ', error)
  }
}