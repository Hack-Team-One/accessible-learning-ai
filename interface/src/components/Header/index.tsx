import useDynamicStyling from '../../hooks/useDynamicStyling';
import Image from 'next/image';

function Header() {
  const {
    textFont,
    contentScaling,
    fontSize,
    lineHeight,
    letterSpacing,
  } = useDynamicStyling();

  return (
    <header className="flex items-end justify-center mt-10">
        <p className="text-3xl font-bold text-center mr-4" style= {{ fontSize: `${fontSize.text_5xl}px`, lineHeight: `${lineHeight.text_5xl}px` }}>Accessible Learning</p> {/* Added margin-right */}
        <Image
          src="/images/accessible-learning-ai-logo.png"
          alt="Accessible Learning AI Logo"
          width={lineHeight.text_7xl}
          height={lineHeight.text_7xl}
        />
      {/* <p className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-200 via-amber-400 to-orange-500 text-transparent bg-clip-text">using AI</p> */}
    </header>
  );
}

export default Header;
