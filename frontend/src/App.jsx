import { useEffect, useState } from 'react'
import { api } from './api.js'

// Example feature: Notes (Create, Read, Update, Delete).
// Replace this with your own system, but keep the pattern:
// React component -> api.js -> /api/<file>.php -> MySQL

const isStaging = window.location.hostname.includes('-dev.')

export default function App() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [editing, setEditing] = useState(null)   // { id, title }
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  async function load() {
    try {
      setError('')
      setNotes(await api.get('notes.php'))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])

  async function add(e) {
    e.preventDefault()
    if (!title.trim()) return
    try { await api.post('notes.php', { title }); setTitle(''); load() }
    catch (e) { setError(e.message) }
  }
  async function save(e) {
    e.preventDefault()
    try { await api.put(`notes.php?id=${editing.id}`, { title: editing.title }); setEditing(null); load() }
    catch (e) { setError(e.message) }
  }
  async function remove(id) {
    if (!confirm('Delete this note?')) return
    try { await api.del(`notes.php?id=${id}`); load() }
    catch (e) { setError(e.message) }
  }

  return (
    <main className="wrap">
      {isStaging && <div className="staging">STAGING: this is your dev branch, not the released version</div>}
      <h1>IT304 Project Template</h1>
      <p className="muted">React frontend → PHP API → MySQL. Replace this page with your own system.</p>

      <form onSubmit={add} className="row">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New note…" maxLength={200} />
        <button>Add</button>
      </form>

      {error && <p className="error">⚠ {error}</p>}
      {loading ? <p className="muted">Loading…</p> : (
        <ul className="list">
          {notes.map((n) => (
            <li key={n.id}>
              {editing?.id === n.id ? (
                <form onSubmit={save} className="row">
                  <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} autoFocus />
                  <button>Save</button>
                  <button type="button" className="ghost" onClick={() => setEditing(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <span>{n.title}</span>
                  <span className="actions">
                    <button className="ghost" onClick={() => setEditing({ id: n.id, title: n.title })}>Edit</button>
                    <button className="ghost danger" onClick={() => remove(n.id)}>Delete</button>
                  </span>
                </>
              )}
            </li>
          ))}
          {notes.length === 0 && <li className="muted">No notes yet.</li>}
        </ul>
      )}
    </main>
  )
}
