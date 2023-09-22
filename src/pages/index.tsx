import React from 'react';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../states/authState';
import Header from '../components/Header';

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState); // we may not use this state, just an example

  return (
    <div>
      <Header />
    </div>
  );
};

export default Home;
