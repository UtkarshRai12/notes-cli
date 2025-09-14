import express from 'express';
import { getAllNotes } from './notes.js';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const notes = await getAllNotes();
  console.log(notes);
  res.render('notes-view', {
    notes,
  });
});

export function serve(port = PORT) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
