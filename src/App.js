import './App.css';
import self from './img/self.png';
import github_icon from './img/github-icon.webp';

export default function App() {
  return (
    // background / main container
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <NavBar />
      <IntroHeader />
      <div className='flex flex-row flex-wrap py-20 justify-evenly'>
        <Blurb 
          title='About Me' 
          body="Hi! My name is Evan O'Malley, and I'm using this website 
          mainly as a way to learn different kinds of front-end programming, 
          as it's one of my weaker points as a backend developer. I'm a software 
          developer currently attending the University of Massachusetts Lowell,
          and I would much rather do backend work than frontend, but with this website
          I hope to be versed in both!"
        />
        <Blurb 
          title='Languages'
          body={
            <div className='flex flex-row justify-around'>
              <p className='self-center mx-6'>These are the programming languages with which I am most confident in my skills.</p>
              <ul className='text-md font-mono bg-gray-100'>
                <li>C</li>
                <li>C++</li>
                <li>C#</li>
                <li>JavaScript</li>
                <li>Python</li>
                <li>Lua</li>
                <li>OCaml</li>
                <li>HTML</li>
                <li>Java</li>
                <li>GDScript</li>
              </ul>
            </div>
          }
        />
      </div>
    </div>
  );
}

const NavBar = () => {
  return (
    <div className='min-w-full bg-gray-700 h-12 flex flex-row justify-end'>
      <NavButton text='SMth else' path='/' />
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
        className='h-32 w-32 rounded-full'
        title='King Evan performs Divination Rite'
    />
  );
}

const Blurb = (props) => {
  return (
    <div className='w-96 bg-gray-50 h-auto flex flex-col rounded-lg my-10 mx-10'>
      <h1 className='text-xl font-semibold self-center my-3'>{props.title}</h1>
      <p className='text-lg font-sans font-extralight self-center mx-5 px-2 py-0.5 mb-5 bg-light-blue-50 rounded-lg'>{props.body}</p>
    </div>
  );
}
