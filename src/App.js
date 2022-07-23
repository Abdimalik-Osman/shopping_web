import {  useEffect } from "react";
import {onAuthStateChangedListener,createUserDocumentFromAuth, getCurrentUser} from './utils/firebase/firebase.utils';
import {Routes,Route} from 'react-router-dom';
import { useDispatch } from "react-redux";
import Navigation from './routes/navigation/navigation-component';
import Authentication from './routes/authentication-page-component/authentication-page';
import Home  from './routes/home/home-component';
import Shop  from './routes/shop-component/shop';
import Checkout  from './routes/checkout/checkout-component';
import {checkUserSession} from './store/user/user-action';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession());
},[]);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;


  // useEffect( () => {
  //   async function fetchData() {
  //     const response = await getRedirectResult(auth);
  //     // if response is not null create user data
  //     if(response){
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   }
  //   fetchData();
  // },[])