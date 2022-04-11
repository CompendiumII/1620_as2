const notes = [
  { 
    title: "first note", 
    noteBody: "this is an example note",
    id: 1 
  }
]

const baseTemp = `
<textarea id = 'textBox' rows="50" cols="85" placeholder = "Enter Note..."></textarea>
<button class="Save">Save</button>
<button class="Delete">Delete</button>
`

function emptyNote(template){
  const noteDisplayArea = document.querySelector('.write-note-area')
  noteDisplayArea.innerHTML = template                                          
}

function clearWrite(){
  const writeArea = document.querySelector('.write-note-area')
  writeArea.innerHTML = ''
}

function createNote (){
  emptyNote(baseTemp)
  delBtn = document.querySelector('.Delete')
  delBtn.addEventListener('click', clearWrite)
}

function enableAddButton(){
  const addButton = document.querySelector('.icons')
  addButton.addEventListener('click', createNote)
}

function initPage(){
  enableAddButton()
}

initPage()