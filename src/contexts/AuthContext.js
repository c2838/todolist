import { createContext, useState, useEffect, useContext } from "react";
import { register, login, checkPremission } from '../api/auth'
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
}

const AuthContext = createContext(defaultAuthContext)
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [payload, setPayload] = useState(null)
  // 取得當前router
  const { pathName } = useLocation()

  // 當pathName變化時，則驗證是否已登入
  useEffect(() => {
    const checkTokenisVaild = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setIsAuthenticated(false)
        setPayload(null)
        return
      }
      const result = await checkPremission(authToken);
      if (result) {
        setIsAuthenticated(true);
        const tempPayload = jwtDecode(authToken)
        setPayload(tempPayload)
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };
    checkTokenisVaild();
  }, [pathName]);

  return(
    <AuthContext.Provider value={{
      isAuthenticated,
      currentMember: payload && {
        id: payload.sub,
        name: payload.name
      },
      register: async (data) => {
        const { success, authToken } = await register({ 
          username: data.username, 
          email: data.email, 
          password: data.password
         });
        const tempPayload = jwtDecode(authToken);
        if (tempPayload) {
          setPayload(tempPayload)
          setIsAuthenticated(true)
          localStorage.setItem('authToken', authToken)
        } else {
          setPayload(null)
          setIsAuthenticated(false)
        }
        return success
      },
      login: async (data) => {
        const { success, authToken } = await login({ 
          username: data.username, 
          password: data.password
        })
        const tempPayload = jwtDecode(authToken);
        if (tempPayload) {
          setPayload(tempPayload);
          setIsAuthenticated(true);
          localStorage.setItem('authToken', authToken);
        } else {
          setPayload(null);
          setIsAuthenticated(false);
        }
        return success;
      },
      logout: () => {
        localStorage.removeItem('authToken')
        setPayload(null);
        setIsAuthenticated(false);
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}
