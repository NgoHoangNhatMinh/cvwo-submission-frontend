import './App.css'
import './styles/Global.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
// import Footer from './components/Footer'
import { AuthProvider } from './components/contexts/AuthContext'
import { UserProvider } from './components/contexts/UserContext'
import { ThemeProvider } from './components/contexts/ThemeContext'

// Display the homepage - index most recent posts
function App() {
  return (
    <>
      {/* Display header and foot in all pages */}
      <ThemeProvider>
        <UserProvider>
          <AuthProvider>
            <Header/>
            <main>
              <Outlet/>
            </main>
            {/* <Footer/> */}
          </AuthProvider>
        </UserProvider>
      </ThemeProvider>
    </>
  )
}

export default App
