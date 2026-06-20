import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import noteService from '../services/noteService.jsx';
import FormCard from '../components/FormCard.jsx';
import Loader from '../components/Loader.jsx';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('recent');

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await noteService.getNotes({ search, filter });
      setNotes(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [search, filter]);

  const resetForm = () => {
    setForm({ title: '', description: '' });
    setEditingNoteId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error('Please add note title and description');
      return;
    }

    try {
      if (editingNoteId) {
        await noteService.updateNote(editingNoteId, form);
        toast.success('Note updated');
      } else {
        await noteService.createNote(form);
        toast.success('Note created');
      }
      resetForm();
      fetchNotes();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to save note');
    }
  };

  const handleEdit = (note) => {
    setForm({ title: note.title, description: note.description });
    setEditingNoteId(note._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) {
      return;
    }
    try {
      await noteService.deleteNote(id);
      toast.success('Note deleted');
      fetchNotes();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to delete note');
    }
  };

  const filteredNotes = useMemo(() => notes, [notes]);

  return (
    <div className="list-gap">
      <FormCard title={editingNoteId ? 'Edit Note' : 'Create a new note'}>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows="5" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <button type="submit">{editingNoteId ? 'Update note' : 'Create note'}</button>
          {editingNoteId && (
            <button type="button" className="secondary" onClick={resetForm}>Cancel edit</button>
          )}
        </form>
      </FormCard>

      <FormCard title="Search & Filter notes">
        <div className="form-grid">
          <div className="input-group">
            <label htmlFor="search">Search</label>
            <input id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or description" />
          </div>
          <div className="input-group">
            <label htmlFor="filter">Filter</label>
            <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="recent">Most recent</option>
              <option value="updated">Latest updated</option>
            </select>
          </div>
        </div>
      </FormCard>

      <FormCard title="Your notes">
        {loading ? (
          <Loader />
        ) : filteredNotes.length === 0 ? (
          <p>No notes found. Create your first note!</p>
        ) : (
          <div className="list-gap">
            {filteredNotes.map((note) => (
              <div key={note._id} className="note-card">
                <h3>{note.title}</h3>
                <p>{note.description}</p>
                <div className="note-meta">
                  <span>{new Date(note.updatedAt || note.createdAt).toLocaleString()}</span>
                  <span>
                    <button type="button" className="secondary" onClick={() => handleEdit(note)}>
                      Edit
                    </button>
                    <button type="button" className="danger" onClick={() => handleDelete(note._id)}>
                      Delete
                    </button>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </FormCard>
    </div>
  );
};

export default NotesPage;
