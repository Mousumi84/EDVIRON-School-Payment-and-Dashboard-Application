import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { createContext, lazy, Suspense, useEffect, useState } from 'react';
import { Spin } from 'antd';
import { FrontPage } from './Components/FrontPage';
import { Dashboard } from './Components/Dashboard';


let Login = lazy(() => import('./Pages/Auth/Login'));
let Signup = lazy(() => import('./Pages/Auth/Signup'));
let TransactionOverview = lazy(() => import('./Pages/Dashboard/TransactionOverview'));
let TransactionDetailsSchool = lazy(() => import('./Pages/Dashboard/TransactionsDetailsSchool'));
let TransactionStatus = lazy(() => import('./Pages/Dashboard/TransactionStatus'));


export const details = createContext();
export const themeContext = createContext();
const colors = {
   dark: {
      background: "#1f1f1fff",
      color: "white",
   },
   light: {
      background: "#8a8a8a4c",
      color: "black",
   }
}


function App() {
   const [theme, setTheme] = useState("light");
   const [isLogin, setIsLogin] = useState(() => Boolean(localStorage.getItem("Token")));
   let loginData = JSON.parse(localStorage.getItem("User"));

   useEffect(() => {
      Object.assign(document.body.style, colors[theme]);
   }, [theme]);

   return (
      <themeContext.Provider value={{ theme, setTheme, colors }}>
         <details.Provider value={{ isLogin, setIsLogin, loginData }}>
            <div className="App">
               <BrowserRouter>
                  <Routes>
                     <Route path='' Component={FrontPage}>
                        <Route path='/' element={<Suspense fallback={<Spin size="large" />}>
                           <Login />
                        </Suspense>} />
                        <Route path='/signup' element={<Suspense fallback={<Spin size="large" />}>
                           <Signup />
                        </Suspense>} />
                     </Route>
                     <Route path='/dashboard' Component={Dashboard}>
                        <Route path='transactions' element={<Suspense fallback={<Spin size="large" />}>
                           <TransactionOverview />
                        </Suspense>} />
                        <Route path='transactions-school-details' element={<Suspense fallback={<Spin size="large" />}>
                           <TransactionDetailsSchool />
                        </Suspense>} />
                        <Route path='transactions-status' element={<Suspense fallback={<Spin size="large" />}>
                           <TransactionStatus />
                        </Suspense>} />
                     </Route>
                  </Routes>
               </BrowserRouter>
            </div>
         </details.Provider>
      </themeContext.Provider>
   );
}

export default App;