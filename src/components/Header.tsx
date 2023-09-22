import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../states/authState';
import Link from 'next/link';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState); // we may not use this state, just an example

  return (
    <header className="flex items-center">
      <h1 className="text-blue-900 font-bold p-4 ml-2.5">Accessible Learning AI</h1>
      <Link href="/learn">
        <a className="p-2">Learn</a>
      </Link>
    </header>
  );
}

export default Header;
