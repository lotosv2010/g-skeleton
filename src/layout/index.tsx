import { Outlet, NavLink } from 'react-router'
import './layout.scss'

function Layout () {
  return (
    <div className='layout'>
      <div className='layout-nav'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <main className='layout-main'>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout