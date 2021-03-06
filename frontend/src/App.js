import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { Switch, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Item from './pages/Item';
import { logout, setIsLoggedIn, setEmail, setUserType, setUser } from './redux/actions/userActions';
import Cart from './pages/Cart';
import { Nav, Navbar } from 'react-bootstrap';
import Checkout from './pages/Checkout';
import History from './pages/History';
import AddItem from './pages/AddItem';
import { retrieveUser, retrieveType, retrieveEmail } from './cookies';


const App = ({ isLoggedIn, dispatch, userType, ws, notification }) => {
  let seller = false;
  React.useEffect(() => {
    const user = retrieveUser()
    if (user) {
      dispatch(setEmail(retrieveEmail()))
      dispatch(setUserType(retrieveType()))
      dispatch(setUser(user))
      dispatch(setIsLoggedIn(true))
    }
  }, [])

  if (userType === 'Seller') { seller = true; }
  return (
    <div className="App">
      <div>{notification}</div>
      <Navbar variant='light' bg='light' expand='sm'>
        <div className='container'>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav>
              <Link to="/" className='nav-link'>Home</Link>
              {userType === 'Buyer' && <Link to='/cart' className='nav-link'>Cart</Link>}
              {isLoggedIn ?
                <Link id="logout" className='nav-link' onClick={() => dispatch(logout())} to='/'>Logout</Link> :
                (<Nav><Link to="/login" className='nav-link'>Login</Link>
                  <Link to="/signup" className='nav-link'>Sign up</Link>
                </Nav>)
              }
              {seller &&
                <Link to="/additem" className='nav-link'>Add item</Link>
              }
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <Switch>
        <Route path="/History" component={History} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path='/item' render={() => <Item ws={ws} />} />
        <Route path='/cart' component={Cart} />
        <Route path='/checkout' component={Checkout} />
        <Route path="/" render={() => <Home ws={ws} />} />
        <Route path="/additem" component={AddItem} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  notification: state.userReducer.notification,
  userType: state.userReducer.userType
})

export default connect(mapStateToProps)(App);