# Notes CLI

A simple command-line and web-based notes management tool built with Node.js and Express. Easily create, tag, and view notes from the terminal or a web browser.

## Features
- Add, list, and tag notes from the CLI
- View all notes in a web browser
- Notes stored in a local JSON file
- EJS templating for web views

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm

### Installation
1. Clone the repository or download the source code.
2. Install dependencies:
   ```sh
   npm install
   ```

### CLI Usage
- Add a new note:
  ```sh
  notes new "Your note text" --tags tag1,tag2 --timeline 1
  ```
- List notes by tag:
  ```sh
  notes tag tagname
  ```

### Web Server Usage
- Start the server:
  ```sh
  node notes-server.js
  ```
- Open your browser and go to [http://localhost:3000](http://localhost:3000) to view all notes.

## Project Structure
- `notes.js` - CLI logic and note management
- `db.json` - Local database file for notes
- `notes-server.js` - Express server for web interface
- `views/notes-view.ejs` - EJS template for displaying notes

## License
ISC

## Author
Utkarsh Rai (utkarshrai5678@gmail.com)
