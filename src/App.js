import './App.css';
import self from './img/self.png';
import github_icon from './img/github-icon.webp';

export default function App() {
  return (
    // background / main container
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <NavBar />
      <IntroHeader />
    </div>
  );
}

const NavBar = () => {
  return (
    <div className='min-w-full bg-gray-700 h-12 flex flex-row justify-end'>
      <NavButton text='SMth else' />
      <NavButton text='GitHub' path='https://github.com/ejomalley' icon={github_icon} />
    </div>
  );
}

const NavButton = (props) => {
  const handleClick = () => { window.location.assign(props.path) }
  return (
    <button onClick={handleClick} className='self-stretch bg-gray-400 px-5 mr-5 hover:bg-white w-28 flex flex-row justify-evenly'>
      <p className='self-center'>{props.text}</p>{props.icon ? <img src={github_icon} alt='GitHub Icon' className='w-6 pl-2 self-center' /> : null}
    </button>
  );
}

const IntroHeader = () => {
  return (
    <div className="min-w-full h-32 bg-gray-300 flex items-center flex-row justify-between">
      <ImgSelf />
      <p className="text-base">Hello, I am me. Nice to meet you.</p>
      <ImgSelf />
    </div>
  );
}

const ImgSelf = () => {
  return (
    <img
        src={self} 
        alt="this is me, squatting in front of a graffiti mispelling billie eillish's name while i eat a banana"
        className='h-32 rounded-full'
        title='King Evan performs Divination Rite'
    />
  );
}
