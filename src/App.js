import {Routes,Route} from 'react-router-dom';
import Navigation from './components/routes/navigation/navigation-component';
import Authentication from './components/routes/authentication-page-component/authentication-page';
import Home  from './components/routes/home/home-component';
import Shop  from './components/routes/shop-component/shop';
import Checkout  from './components/routes/checkout/checkout-component';
function App() {
 
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