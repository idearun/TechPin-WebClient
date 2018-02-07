import React from 'react'
import StartupPaper from '../sharedComponents/StartupPaper'

const SearchResults = ({ results }) => (
  <div id="search-results" className={results.length > 0 ? 'active' : 'inactive'}>
    <div className="search-content">
      {results.map((result, i) => (
        <StartupPaper WrapperClassName="all-entries-item" key={i} product={result} />
      ))}
    </div>
    <div className="overlay" />
  </div>
)

export default SearchResults
