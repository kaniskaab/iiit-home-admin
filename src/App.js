import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navbar from './pages/Navbar';
import NewsPage from './pages/News';
import NoticesPage from './pages/Notices';
import PlacementPage from './pages/PlacementHighlights';
import ResearchHighlightsPage from './pages/ResearchHighlights';
import StoriesPage from './pages/Stories';
import TendersPage from './pages/Tenders';
import Home from './pages/Home';
import PlacementElement from './pages/Company';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/notices' element={<NoticesPage/>}/>
        <Route path='/news' element={<NewsPage/>}/>
        <Route path='/placement-highlights' element={<PlacementPage/>}/>
        <Route path='/research-details' element={<ResearchHighlightsPage/>}/>
        <Route path='/tenders' element={<TendersPage/>}/>
        <Route path='/stories' element={<StoriesPage/>}/>
        <Route path='/placement' element={<PlacementElement/>}/>

</Routes>
    </div>
  );
}

export default App;
