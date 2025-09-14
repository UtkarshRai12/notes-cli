import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import {
  newNote,
  getAllNotes,
  findNotesByKeywords as findNotes,
  findNotesByTags,
  findNotesByTimeline,
  removeNote,
  removeAllNotes,
  getAllTags,
} from './notes.js';
import { listNotes } from './utils.js';
import { serve } from './notes-server.js';

yargs(hideBin(process.argv))
  .command(
    'new <note>',
    'create a new note',
    (yargs) => {
      return yargs.positional('note', {
        describe: 'The content of the note you want to create',
        type: 'string',
      });
    },
    async (argv) => {
      console.log('argv', argv.tags);
      const tags = argv.tags ? argv.tags.split(' ') : [];
      console.log('tags', tags);
      const timeline = argv.timeline ? argv.timeline : 0;
      const note = await newNote(argv.note, tags, timeline);
      console.log('Note added!', note.id);
    }
  )
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note',
  })
  .option('timeline', {
    alias: 'l',
    type: 'number',
    description: 'timeline for the note',
  })
  .command(
    'all',
    'get all notes',
    () => {},
    async (argv) => {
      const notes = await getAllNotes();
      listNotes(notes);
    }
  )
  .command(
    'tags <filter>',
    'get matching notes by tags',
    (yargs) => {
      return yargs.positional('filter', {
        describe: 'The tag to filter notes by',
        type: 'string',
      });
    },
    async (argv) => {
      const notes = await findNotesByTags(argv.filter);
      listNotes(notes);
    }
  )
  .command(
    'timeline <filter>',
    'get matching notes by timeline',
    (yargs) => {
      return yargs.positional('filter', {
        describe: 'The timeline to filter notes by',
        type: 'number',
      });
    },
    async (argv) => {
      const notes = await findNotesByTimeline(argv.filter);
      listNotes(notes);
    }
  )
  .command(
    'find <filter>',
    'get matching notes by content',
    (yargs) => {
      return yargs.positional('filter', {
        describe:
          'The search term to filter notes by, will be applied to note.content',
        type: 'string',
      });
    },
    async (argv) => {
      const notes = await findNotes(argv.filter);
      listNotes(notes);
    }
  )
  .command(
    'get-tags',
    'get all unique tags',
    () => {},
    async (argv) => {
      const tags = await getAllTags();
      console.log('Unique tags:', tags);
    }
  )
  .command(
    'remove <id>',
    'remove a note by id',
    (yargs) => {
      return yargs.positional('id', {
        type: 'number',
        description: 'The id of the note you want to remove',
      });
    },
    async (argv) => {
      const id = await removeNote(argv.id);
      if (id) {
        console.log('Note removed: ', id);
      } else {
        console.log('Note not found');
      }
    }
  )
  .command(
    'web [port]',
    'launch website to see notes',
    (yargs) => {
      return yargs.positional('port', {
        describe: 'port to bind on',
        default: 5000,
        type: 'number',
      });
    },
    async (argv) => {
      console.log(`Starting web server on port ${argv.port}`);
      serve(argv.port);
    }
  )
  .command(
    'clean',
    'remove all notes',
    () => {},
    async (argv) => {
      await removeAllNotes();
      console.log('All notes removed');
    }
  )
  .demandCommand(1)
  .parse();
