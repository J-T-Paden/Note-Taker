const router = require('express').Router();
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const { v4: uuidv4 } = require('uuid');
const getNotes = () => {
   return readFile('db/db.json', 'utf-8').then(data => [].concat(JSON.parse(data)))
}
router.get('/', (req, res)=> {
getNotes().then(notes => res.json(notes)).catch(err => res.json(err))
})
router.post('/', (req, res) => {
    getNotes().then(oldNotes => {
        const {title, text} = req.body
        const newNotes = [...oldNotes, {title, text, id:uuidv4()}]
        writeFile('db/db.json', JSON.stringify(newNotes))
        .then(()=>res.json({msg:'OK'})).catch(err => res.json(err))
    })
})

router.delete('/:id', (req, res) => {
    getNotes().then(notes => {
        console.log(notes)
        console.log(req.params.id)
        const filteredNotes = notes.filter(note => note.id !== req.params.id)
        console.log(filteredNotes)
        writeFile('db/db.json', JSON.stringify(filteredNotes))
        .then(()=>res.json({msg:'OK'})).catch(err => res.json(err))
    })
})
module.exports = router