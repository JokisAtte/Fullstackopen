import React, {useState} from 'react'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
    
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random > 0.5,
      id: notes.lenght +1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteCHange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
          {notesToShow.map((note,i) =>
            <Note key={i} note={note}/>
          )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value = {newNote}
          onChange ={handleNoteCHange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
  }

export default App