'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

// Simple global queue to track which media items are marked for deletion
const deleteQueue = new Set<string>()
let listeners: (() => void)[] = []
const notify = () => listeners.forEach(l => l())

export function DeleteMediaButton({ rowData }: { rowData: any }) {
  const [queued, setQueued] = useState(false)
  const [queueCount, setQueueCount] = useState(0)

  // Listen to queue changes
  useEffect(() => {
    const handleUpdate = () => {
      setQueued(deleteQueue.has(rowData.id))
      setQueueCount(deleteQueue.size)
    }
    listeners.push(handleUpdate)
    handleUpdate()
    return () => {
      listeners = listeners.filter(l => l !== handleUpdate)
    }
  }, [rowData?.id])

  if (!rowData?.id) return null

  const toggleQueue = () => {
    if (deleteQueue.has(rowData.id)) {
      deleteQueue.delete(rowData.id)
    } else {
      deleteQueue.add(rowData.id)
    }
    notify()
  }

  const handleBulkDelete = async () => {
    // We prevent default to avoid form submission if we're inside the Drawer's form
    if (confirm(`Are you sure you want to permanently delete these ${deleteQueue.size} items?`)) {
      try {
        const promises = Array.from(deleteQueue).map(id => fetch(`/api/media/${id}`, { method: 'DELETE' }))
        await Promise.all(promises)
        deleteQueue.clear()
        notify()
        // Reload to refresh the list once all deletions finish
        window.location.reload()
      } catch (err) {
        console.error(err)
        alert('Error deleting some items. Please check your permissions.')
      }
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          toggleQueue()
        }}
        className={`px-3 py-1.5 text-xs sm:text-sm rounded-md transition-colors font-medium flex items-center justify-center min-w-[70px] ${
          queued 
            ? 'bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 line-through' 
            : 'bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30'
        }`}
      >
        {queued ? 'Unqueue' : 'Delete'}
      </button>

      {queued && queueCount > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            handleBulkDelete()
          }}
          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md shadow-lg transition-all text-xs sm:text-sm flex items-center whitespace-nowrap animate-in fade-in zoom-in-95"
        >
          Confirm Delete All ({queueCount})
        </button>
      )}
    </div>
  )
}
