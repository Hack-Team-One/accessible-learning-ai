import { useRecoilState } from 'recoil';
import {
  textColorPrimaryState,
  textFontPrimaryState,
  textSizePrimaryState,
} from '../states/textState';
import Link from 'next/link';
import SelectList from './SelectList';

function Header() {
  const [textColorPrimary, setTextColorPrimary] = useRecoilState(textColorPrimaryState);
  const [textFontPrimary, setTextFontPrimary] = useRecoilState(textFontPrimaryState);
  const [textSizePrimary, setTextSizePrimary] = useRecoilState(textSizePrimaryState);

  return (
    <div className="relative">
      <header className="absolute inset-x-0 top-0">
        {/* <SelectList /> */}
        <h1 className="text-blue-900 font-bold p-4 ml-2.5">Accessible Learning AI</h1>
        {/* <Link href="/learn">
          <p className="p-2">Learn</p>
        </Link> */}
      </header>
    </div>
  );
}

export default Header;

/*
Task:  
Update the Header component to show the project title and links/buttons per the Figma design.

Can add MUI component drop down selector buttons, to test out the global updating of the text color, font, or size. Use tailwind classes (see accessibility classes). Once the selector is changed, this should update the global state for text (use Recoil state for this).

Refer to the Figma task/issue for designs and more info.

Code:  
Update the component in /components folder.

Info to Reference for buttons:  
When first entering the website, the user will be asked questions about whether they have a disability and what type. This will teach them how to use the website and the features they can access to enhance their accessible learning with the AI prompts & responses.

1.) What disability do you have? (we will include a SKIP button at the bottom)  
a.) Color Blind

Show color pallet options  
Show an arrow to feature (or highlight feature)  
b.) Visual

Show how to resize text  
Show how to change the font  
Show an arrow to feature/s (or highlight feature)

After the survey and explanations of how the website works, a chatGPT like interface will be shown

There will be drop down, sliders, or other type features located at the header or side of the screen

Notes:  
Color Blind:  
black white option (safest)  
Red, blue, yellow, and orange are safe-ish  
Do not mix red & green, green & brown  
Our website should have black lines around titles and/or logos
*/