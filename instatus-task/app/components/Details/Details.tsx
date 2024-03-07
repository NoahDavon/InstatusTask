import React from 'react'

type Props = {
  onClose : ()=> void;

}

export default function Details({onClose}: Props) {
  return (
    <div className=" w-10/12 p-8 m-auto h-72 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-white border-2 rounded-xl border-gray-400 text-black">
        <table className='w-full text-left table-auto'>
        <tr className='text-[#929292]'>
            <th colSpan={2} className=' pb-2'>ACTOR</th>
            <th colSpan={2} className=' pb-2'>ACTION</th>
            <th colSpan={2} className=' pb-2'>DATE</th>
            <button className='p-2 rounded-xl bg-slate-100 hover:bg-slate-200' onClick={onClose}>Close</button>
          </tr>
          <tr className='text-[#929292]'>
            <td className=' pb-2'>Name</td>
            <td className='text-black pb-2'>Baraa Ahmed</td>
            <td className=' pb-2'>Name</td>
            <td className='text-black pb-2'>incident.create_succeeded</td>
            <td className=' pb-2'>Readable</td>
            <td className='text-black pb-2'>Aug 7, 4:48 PM</td>
          </tr>
          <tr className='text-[#929292]'>
            <td className=' pb-2'>Email</td>
            <td className='text-black pb-2'>baraa@instatus.com</td>
            <td className=' pb-2'>Object</td>
            <td className='text-black pb-2'>event_action</td>
          </tr>
          <tr className='text-[#929292]'>
            <th colSpan={2} className='pt-4'>META</th>
            <th colSpan={2} className='pt-4'>TARGET</th>
          </tr>

        </table>
    </div>
  )
}