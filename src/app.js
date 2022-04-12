const notes = [
  { 
    title: "first note", 
    noteBody: "this is an example note",
    id: 1 
  }
]
const baseTemp = `
<textarea class="textbox" rows="25" cols="50" placeholder = "Enter Note..."></textarea>
<button class="save">Save</button>
<button class="delete">Delete</button>
`
const readTemp = `
  <button class="close">x</button>
  <div>
    <h1 class = "readTitle"></h1>
    <p class = "readBody"></h1>
  </div>
  `
var noteID = 1
var checked = false

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
  var displayedTitle = ''
  var displayedNote = ''
  for (const x of notes){
    if (noteID == x.id){
      displayedTitle = x.title
      displayedNote = x.noteBody
    }
  }
  const noteTitle = document.querySelector('.readTitle')
  const noteBody = document.querySelector('.readBody')
  noteTitle.innerHTML = displayedTitle
  noteBody.innerHTML = displayedNote
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
  createCheck()
  addTitleToNav(notes[0].title)
  lastNoteIntoButton()
}

function darkMode(){
  const page = document.querySelector('.main-container')
  if (checked == false){
    page.classList.replace('light-theme', 'dark-theme')
    checked = true
  } else if (checked == true){
    page.classList.replace('dark-theme', 'light-theme')
    checked = false
  }
}

function createCheck(){
  const checkBox = document.querySelector('.theme-toggle')
  checkBox.addEventListener('click', darkMode)
}

initPage()