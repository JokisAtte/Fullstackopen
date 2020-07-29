import React from 'react'
import PropTypes from 'prop-types'

const blogForm = ({
  handleCreateNew,
  setTitle,
  setUrl,
  setAuthor,
  author,
  title,
  url,
}) => {return(
  <div>
    <h1>Create new</h1>
    <form onSubmit={handleCreateNew}>
      <div>
        Title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          id = 'title'
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          id = 'author'
        />
      </div>
      <div>
        Url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          id = 'url'
        />
      </div>
      <button type="submit" id ='submit'>Create</button>
    </form>
  </div>
)
}

blogForm.propTypes = {
  handleCreateNew : PropTypes.func.isRequired,
  setTitle : PropTypes.func.isRequired,
  setUrl : PropTypes.func.isRequired,
  setAuthor : PropTypes.func.isRequired,
  author : PropTypes.string.isRequired,
  title : PropTypes.string.isRequired,
  url : PropTypes.string.isRequired
}

export default blogForm