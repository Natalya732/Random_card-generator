import React from 'react'

export default function Chip({label, onDelete}) {
  return (
    <div className='chip p-1'>
      <span className="flex px-2">{label}</span>
      <i className='pi pi-times chip mb-2' onClick={onDelete}></i>
    </div>
  )
}
