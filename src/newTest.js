const text = 'Hello\nYou are\nBald'
const splitText = text.split('\n')
console.log(splitText)
splitText.splice(0, 1)
console.log(splitText)