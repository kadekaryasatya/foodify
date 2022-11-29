import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { getUserLogged, putAccessToken } from './utils/api';

import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import About from './pages/About';
import MyRecipes from './pages/MyRecipes';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
    };
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  render() {
    if (this.state.initializing) {
      return null;
    }
    if (this.state.authedUser === null) {
      return (
        <Routes>
          <Route path='/*' element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/about' element={<About />} />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/myrecipes' element={<MyRecipes />} />
        <Route path='/add' element={<AddPage />} />
      </Routes>
    );
  }
}

export default App;
