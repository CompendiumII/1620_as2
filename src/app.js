const notes = [
  { 
    title: "first note", 
    noteBody: "this is an example note",
    id: 1 
  }
]

const baseTemp = `
<textarea class="textbox" rows="50" cols="85" placeholder = "Enter Note..."></textarea>
<button class="save">Save</button>
<button class="delete">Delete</button>
`
function enableAddButton(){
  const addButton = document.querySelector('.icons')
  addButton.addEventListener('click', createNote)
}

function disableAddButton(){
  const addButton = document.querySelector('.icons')
  addButton.removeEventListener('click', createNote)
}

function emptyNote(template){
  const noteDisplayArea = document.querySelector('.write-note-area')
  noteDisplayArea.innerHTML = template                                          
}

function clearWrite(){
  const writeArea = document.querySelector('.write-note-area')
  writeArea.innerHTML = ''
  enableAddButton()
}

function getNote(){
  const textBoxArea = document.querySelector('.textbox')
  return textBoxArea.value
}

function splitNote(note){
  const splitContent = note.split('\n')
  return splitContent
}

function getTitle(){
  const noteContent = splitNote(getNote())
  return noteContent[0]                         
}

function addToNotes(){
  var finalNote = ''
  splitContent = splitNote(getNote())
  splitContent.splice(0, 1)
  for (const x of splitContent){
    finalNote += x
    finalNote += '\n'
  }
  notes.push({
    title: getTitle(),
    noteBody: finalNote,
    id: notes.length + 1
  })
}

function saveNote(){
  addToNotes()
  clearWrite()
}

function createNote(){
  emptyNote(baseTemp)
  disableAddButton()
  const savBtn = document.querySelector('.save')
  const delBtn = document.querySelector('.delete')
  savBtn.addEventListener('click', saveNote)
  delBtn.addEventListener('click', clearWrite)
}

function initPage(){
  enableAddButton()
}

initPage()