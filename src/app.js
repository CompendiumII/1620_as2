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
const readTemp = `
  <button class="close">X</button>
  <textarea readonly class = 'readArea' rows="40" cols="80"></textarea>
  `

var noteID = 1

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

function clearRead(){
  const readArea = document.querySelector('.read-note-area')
  readArea.innerHTML = ''
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

function addTitleToNav(title){
  const selectNav = document.querySelector('.notes-list')
  const li = document.createElement('li')
  li.className = noteID
  noteID ++
  li.appendChild(document.createTextNode(title))
  selectNav.appendChild(li)
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
  addTitleToNav(getTitle())
  addToNotes()
  clearWrite()
  lastNoteIntoButton()
}

function createRead(){
  const readArea = document.querySelector('.read-note-area')
  readArea.innerHTML = readTemp
}

function displayReadOnly(noteID){
  createRead()
  clearWrite()
  disableAddButton()
  const closeBtn = document.querySelector('.close')
  closeBtn.addEventListener('click', clearRead)
  var displayedNote = ''
  for (const x of notes){
    if (noteID == x.id){
      displayedNote = x.title + '\n' + x.noteBody
    }
  }
  const readArea = document.querySelector('.readArea')
  readArea.innerHTML = displayedNote
}

function lastNoteIntoButton(){
  const noteList = document.querySelector('.notes-list')
  const lastNote = noteList.lastChild
  lastNote.addEventListener('click', (evt) => {
    const noteID = evt.target.className
    displayReadOnly(noteID)
  })
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
  addTitleToNav(notes[0].title)
  lastNoteIntoButton()
}

initPage()