import './App.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Connect from '../Connect/Connect';
import Account from '../Account/Account';
import NotFound from '../NotFound/NotFound';

import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { actionSetCategories } from '../../actions/actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddSpot from '../Spot/AddSpot';
import FooterTeam from '../Footer/FooterTeam';
import FooterCharter from '../Footer/FooterCharter';
import FooterProject from '../Footer/FooterProject';
import FooterLegalMention from '../Footer/FooterLegalMention';

//import reactUseCookie from 'react-use-cookie';

function App() {
  const dispatch = useDispatch();
  
  /* LOCAL STATE */ 
  const [email, setEmail] = useState('');
  
  const connectedUsername = useSelector((state)=> state.connectedUsername);
  const apiBackUrl = process.env.REACT_APP_SYMFO_CONNECT_APIURL;
  

  useEffect(() => {
    axios.get(`${apiBackUrl}/api/category/list`, {withCredentials: true})
      .then((response) => {
        const categories = response.data.categoryList;
        dispatch(actionSetCategories(categories));
      })
      .catch((error) => {
        console.error("bah alors tu n'arrives pas à récupérer la liste des catégories ?");
      })
  }, []);

  return (
    <div className="App">
      <ToastContainer 
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Connect email={email} setEmail={setEmail} />} />
        <Route path="/account" element={<Account connectedUsername={connectedUsername} email={email} setEmail={setEmail} />} />
        <Route path="/spot" element={<AddSpot />} />
        <Route path="/team" element={<FooterTeam />} />
        <Route path="/project" element={<FooterProject />} />
        <Route path="/charter" element={<FooterCharter />} />
        <Route path="/legal-mention" element={<FooterLegalMention />}/>
        <Route path="*" element={<NotFound /> } />
      </Routes>
      <Footer />

    </div> 
  );
}

export default App;