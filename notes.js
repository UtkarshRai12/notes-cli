import { readDB, writeDB, filterDB } from './db.js';

export const newNote = async (note, tags, timeline) => {
  const data = {
    tags,
    timeline,
    content: note,
    id: Date.now(),
  };
  const notes = await readDB('notes');
  notes.push(data);
  await writeDB(notes, 'notes');
  return data;
};
export const getAllNotes = async () => {
  const notes = await readDB('notes');
  return notes;
};

export const findNotesByKeywords = async (filter) => {
  const notes = await filterDB('notes', (note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
  return notes;
};

export const findNotesByTags = async (filter) => {
  const notes = await filterDB('notes', (note) =>
    note.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase()))
  );
  return notes;
};

export const findNotesByTimeline = async (filter) => {
  const notes = await filterDB('notes', (note) => note.timeline === filter);
  return notes;
};

export const removeNote = async (id) => {
  const notes = await getAllNotes();
  const match = notes.find((note) => note.id === id);

  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await writeDB(newNotes, 'notes');
    return id;
  } else {
    console.log('No note found with the given id');
  }
};

export const getAllTags = async () => {
  const notes = await getAllNotes();
  const tags = new Set();
  notes.forEach((note) => {
    note.tags.forEach((tag) => {
      tags.add(tag.toLowerCase());
    });
  });
  return Array.from(tags);
};

export const removeAllNotes = async () => {
  await writeDB([], 'notes', {
    override: true,
  });
};
