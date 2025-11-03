import React, { useState, useEffect } from 'react'

export default function JobForm({ initial, onCancel, onSave }) {
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [status, setStatus] = useState('Applied')

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || '')
      setCompany(initial.company || '')
      setStatus(initial.status || 'Applied')
    } else {
      setTitle('')
      setCompany('')
      setStatus('Applied')
    }
  }, [initial])

  function submit(e) {
    e.preventDefault()
    const payload = { ...initial, title: title.trim(), company: company.trim(), status }
    onSave(payload)
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Job Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 w-full border px-3 py-2 rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium">Company</label>
        <input value={company} onChange={e => setCompany(e.target.value)} required className="mt-1 w-full border px-3 py-2 rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium">Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)} className="mt-1 w-full border px-3 py-2 rounded">
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-3 py-1 border rounded">Cancel</button>
        <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded">Save</button>
      </div>
    </form>
  )
}
