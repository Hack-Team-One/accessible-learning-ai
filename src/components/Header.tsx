import { useRecoilState } from 'recoil';
import {
  textColorPrimaryState,
  textFontPrimaryState,
  textSizePrimaryState,
} from '../states/textState';
import Link from 'next/link';

function Header() {
  const [textColorPrimary, setTextColorPrimary] = useRecoilState(textColorPrimaryState);
  const [textFontPrimary, setTextFontPrimary] = useRecoilState(textFontPrimaryState);
  const [textSizePrimary, setTextSizePrimary] = useRecoilState(textSizePrimaryState);

  return (
    <div className="container mx-auto">
      <header className="flex items-center">
        <h1 className="text-blue-900 font-bold p-4 ml-2.5">Accessible Learning AI</h1>
        <Link href="/learn">
          <p className="p-2">Learn</p>
        </Link>
      </header>
    </div>
  );
}

export default Header;
