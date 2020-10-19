import React from 'react';
import  { useState} from 'react'; // State: data that changes
import { CSSTransition } from 'react-transition-group'
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as MessengerIcon } from './icons/messenger.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as ChevronIcon } from './icons/chevron.svg';
import { ReactComponent as ArrowIcon } from './icons/arrow.svg';
import { ReactComponent as BoltIcon } from './icons/bolt.svg';

//Composition: write small reusable components
function App() {  //Component --> Based on the Capital LETTER.
  return (       //returns JSX --> syntax for HTML in JS
    <Navbar>
      <NavItem icon= {<PlusIcon />} />
      <NavItem icon={<BellIcon />}  />
      <NavItem icon={<MessengerIcon />} />

      <NavItem icon={<CaretIcon/>}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return(
    <nav className="navbar">
      <ul className="navbar-nav"> { props.children }</ul>
    </nav>
  );
}
//In HTML we use class=.... in react we use className=....
// Props: pass data from parent to child
//onClick == event, setOpen == handler
function NavItem(props) {
  const [open, setOpen] = useState(false); //first state tells us if the value is opened or closed, the second value is used to change the state

  return(  
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}> 
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu(){

  const [activeMenu, setActiveMenu] = useState('main'); //settings, animals
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props){
    return(
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>

        {props.children}

        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  return(
    <div className="dropdown" style={{ height: menuHeight }}>
        <CSSTransition 
          in={activeMenu === 'main'} 
          unmountOnExit 
          timeout={500} 
          classNames="menu-primary"
          onEnter={calcHeight}
        >
          <div className="menu">
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem 
              leftIcon={<CogIcon/>} 
              rightIcon={<ChevronIcon />}
              goToMenu ="settings"
              >
                Settings
            </DropdownItem>
          </div>
        </CSSTransition>

        <CSSTransition 
          in={activeMenu === 'settings'} 
          unmountOnExit 
          timeout={500} 
          classNames="menu-secondary"
        >
          <div className="menu">
            <DropdownItem leftIcon={<ArrowIcon />} goToMenu="main" />
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>1</DropdownItem>
            <DropdownItem>2</DropdownItem>
            <DropdownItem>3</DropdownItem>
            <DropdownItem>4</DropdownItem>
            <DropdownItem>5</DropdownItem>
            <DropdownItem>6</DropdownItem>
            <DropdownItem>7</DropdownItem>
            <DropdownItem>8</DropdownItem>
            <DropdownItem>9</DropdownItem>
            <DropdownItem>10</DropdownItem>
          </div>
        </CSSTransition>
    </div>
  );
}
export default App;
