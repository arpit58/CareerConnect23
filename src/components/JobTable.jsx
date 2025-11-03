import React from 'react'

export default function JobTable({ jobs, onEdit, onDelete }) {
  return (
    <div className="overflow-auto">
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Job Title</th>
            <th className="px-4 py-2 text-left">Company</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 && (
            <tr>
              <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                No jobs yet — add one!
              </td>
            </tr>
          )}
          {jobs.map(job => (
            <tr key={job.id} className="border-b last:border-0">
              <td className="px-4 py-3">{job.title}</td>
              <td className="px-4 py-3">{job.company}</td>
              <td className="px-4 py-3">{job.status}</td>
              <td className="px-4 py-3 text-right">
                <button onClick={() => onEdit(job)} className="mr-2 text-sm px-2 py-1 bg-yellow-100 rounded">Edit</button>
                <button onClick={() => onDelete(job.id)} className="text-sm px-2 py-1 bg-red-100 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
