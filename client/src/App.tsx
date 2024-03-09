import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Navigation from './components/navigation';
import { logo, logowhite } from './assets/images';
import InputPrimaryForm from './components/input/primaryform';
import SearchIcon from './assets/svgs/Search';
import { FormEvent, useState } from 'react';

function App() {
  const location = useLocation();
  
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
        <InputPrimaryForm
          onSubmit={onSearch}
          icon={<SearchIcon/>}
          value={keyword} onChange={e => setKeyword(e.target.value)}
          type="text" placeholder="Search or Enter Reading Id..."
        />
      </div>
    )
  }

  const RightNav = () => {
    return (
      <Link to="/"><div className="right_navigation_logo">
        <img src={location.pathname === "/reading" ? logowhite : logo} alt="thoraread.online" />
      </div></Link>
    )
  }

  return (
    <div>
      <Navigation
        center={location.pathname === "/reading" ? <CenterNav />: undefined}
        right={<RightNav />}
      />
      <Outlet />
    </div>
  )
}

export default App
