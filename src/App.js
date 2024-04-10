
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

class App extends React.Component {


  render() {
    return (
      <div className="App">
        <div className='header-container'>
          <Header />
        </div>
        <div className='main-container'>
          <div className='sideNav-container'>
          </div>
          <div className='app-content'>
            <Outlet /></div>
        </div>
        <div className='footer-container'>
          <Footer />
        </div>
      </div>
    )
  };

}




// const App = () => {
//   // const count = useSelector(state => state.counter.count);
//   // const dispatch = useDispatch();

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <div>Count = {count}</div>
//         <button onClick={() => dispatch(increaseCounter())}>Increase</button>
//         <button onClick={() => dispatch(decreaseCounter())}>Decrease</button>
//       </header>
//     </div>
//   );
// }

export default App;
