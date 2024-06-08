import {Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import {About} from './pages/About'
import {Store} from './pages/Store'
import {Events} from './pages/Events'
import {Navbar} from './components/Navbar'
import {Footer} from './components/Footer'
import {ShoppingCartProvider} from './context/ShoppingCartContext'

function App() {
  return (
    <ShoppingCartProvider>
    <Navbar/>
    <Container className='mb-4'>
    <Routes>
      <Route path="/" element={<Events/>} />
      <Route path="/Events" element={<Events/>} />
      <Route path="/Store" element={<Store/>} />
      <Route path="/About" element={<About/>} />
    </Routes>
    </Container>
    <Footer/>
    </ShoppingCartProvider>
  )
}

export default App
