import React from 'react'

const Search = (props) => {
    return (
      <form>
        <div>
          query: <input onChange={props.handleQuery} />
        </div>
      </form>
    )
  }

export default Search
  