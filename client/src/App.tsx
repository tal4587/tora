import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Navigation from './components/navigation';
import { logo, logowhite, orglogoblue, orglogowhite } from './assets/images';
import InputPrimaryForm from './components/input/primaryform';
import SearchIcon from './assets/svgs/Search';
import { FormEvent, useState } from 'react';

function App() {
  const location = useLocation();

  const LeftNav = () => {
    return (
      <div className="left_navigation_logo">
        <Link to="/">
          <img src={location.pathname === "/reading" ? logowhite : logo} alt="thoraread.online" />
        </Link>
        {/* <div className="center_navigation_mobile">
          <Link to="/reading/search">
            <SearchIcon/>
          </Link>
        </div> */}
      </div>
    )
  }
  
  const CenterNav = () => {

    const [keyword, setKeyword] = useState<string>("");
    
    const navigate = useNavigate();
    const onSearch = (e: FormEvent) => {
      e.preventDefault();
      if(keyword.length > 0) {
        navigate(`/reading/search?keyword=${keyword}`)
      }
    }

    return (
      <div className='center_navigation_body'>
        <div className="center_navigation_desktop">
          <InputPrimaryForm
            variant='glass'
            onSubmit={onSearch}
            icon={<SearchIcon/>}
            value={keyword} onChange={e => setKeyword(e.target.value)}
            type="text" placeholder="חיפוש / חפש שם קריאה קיימת"
          />
        </div>
      </div>
    )
  }

  const RightNav = () => {
    return (
      <div className='right_navigation_body'>
        <div className='right_navigation_image_container'>
          { location.pathname === "/reading" ? (
            <Link to="/"><img className="right_navigation_orglogo_home" src={orglogowhite} alt="organization" /></Link>
          ): (
            <Link to="/"><img className='right_navigation_orglogo_other' src={orglogoblue} alt="organization" /></Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navigation
        left={<LeftNav/>}
        center={location.pathname === "/reading" ? <CenterNav />: undefined}
        right={<RightNav/>}
        solid={ location.pathname !== "/reading"}
      />
      <Outlet />
    </div>
  )
}

export default App
