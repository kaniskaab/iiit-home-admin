import React from 'react'
import NoticesPage from './Notices'
import TendersPage from './Tenders'
import NewsPage from './News'
import PlacementPage from './PlacementHighlights'
import ResearchHighlightsPage from './ResearchHighlights'
import StoriesPage from './Stories'
import PlacementElement from './Company'

export default function Home() {
  return (
    <div>
 <NoticesPage/>
 <TendersPage/>
 <NewsPage/>
 <PlacementPage/>
 <ResearchHighlightsPage/>
 <StoriesPage/>
 <PlacementElement/>
    </div>
  )
}
