import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import RoomsPage from './pages/RoomsPage'
import MarriagePalacePage from './pages/MarriagePalacePage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="marriage-palace" element={<MarriagePalacePage />} />
      </Route>
    </Routes>
  )
}
