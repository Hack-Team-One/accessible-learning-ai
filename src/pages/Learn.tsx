import React from 'react';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../states/authState';

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState); // we may not use this state, just an example

  return (
    <div>
      {/* We could display the chatGPT UI here */}
    </div>
  );
};

export default Home;
