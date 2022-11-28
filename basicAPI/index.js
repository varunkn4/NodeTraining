const express = require('express')
const app = express()

app.use(express.json())

let genres = [
  {
    id: 1669622008817,
    title: 'Comedy',
    date: new Date().toLocaleString(),
  },
  {
    id: 1669622086384,
    title: 'Horror',
    date: new Date().toLocaleString(),
  },
  {
    id: 1669622099598,
    title: 'Romance',
    date: new Date().toLocaleString(),
  },
  {
    id: 1669622107429,
    title: 'Fantasy',
    date: new Date().toLocaleString(),
  },
  {
    id: 1669622120322,
    title: 'Action',
    date: new Date().toLocaleString(),
  },
  {
    id: 1669622128860,
    title: 'Drama',
    date: new Date().toLocaleString(),
  },
]

// List All Genres
app.get('/genre', (request, response) => {
  response.send(genres)
})
// Get Genre by ID
app.get('/genre/:id', (request, response) => {
  let selectedID = request?.params?.id ? parseInt(request.params.id) : null
  let selectedGenre = genres?.filter((item) => item.id === selectedID)
  if (!selectedGenre) response.status(404).send('Genre Not Found')
  response.send(selectedGenre?.length ? selectedGenre[0] : null)
})
// Add New Genres
app.post('/genre/add', (request, response) => {
  let newGenre = {
    id: parseInt(new Date().getTime()),
    title: request?.body?.name,
    date: new Date().toLocaleString(),
  }
  if (genres?.length) genres.push(newGenre)
  response.send('Genre Added Successfully')
})
// Update Existing Genre
app.put('/genre/:id', (request, response) => {
  let selectedID = request?.params?.id ? parseInt(request.params.id) : null
  let newGenre = request?.body?.name
  let selectedGenreIndex = genres?.findIndex((item) => item.id === selectedID)
  if (!selectedGenreIndex || selectedGenreIndex === -1)
    response.status(404).send('Genre Not Found')
  else {
    genres[selectedGenreIndex].title = newGenre
    genres[selectedGenreIndex].date = new Date().toLocaleString()
    response.send('Genre Updated Successfully')
  }
})
// Delete Genre
app.delete('/genre/:id', (request, response) => {
  let selectedID = request?.params?.id ? parseInt(request.params.id) : null
  var toDeleteIndex = genres?.map((item) => item.id)?.indexOf(selectedID)
  if (toDeleteIndex && toDeleteIndex >= 0) genres?.splice(toDeleteIndex, 1)
  response.send('Genre Removed Successfully')
})

app.listen(3000, () => console.log('listening on 3000...'))
