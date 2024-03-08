'use client'
import Image from "next/image";
import events from "./dummies/events";
import Avatar from "./components/Avatar/Avatar";
import Details from "./components/Details/Details";
import { useState } from "react";



export interface Event {
  id:          string;
  object:      string;
  actor_id:    string;
  actor_name:  string;
  group:       string;
  action:      Action;
  target_id:   string;
  target_name: string;
  location:    string;
  occurred_at: string;
  metadata:    any;
}

export interface Action {
  id:     string;
  object: string;
  name:   string;
}

const filters = ["name", "email", "actor", "id"];
export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [filter, setFilter] = useState("name");
  const [filterIndex, setFilterIndex] = useState(0);
  const onClose = () => {
    setSelectedEvent(undefined);
  }
  return (
    <div className=" w-full z-0">
      <table className="table-auto w-3/4 m-auto text-left border-separate border border-spacing-0 overflow-hidden border-opacity-0 rounded-xl">
        <thead className=" bg-[#F5F5F5] text-[#616161]">
          <tr>
            <td colSpan={4}>
            <div className='flex p-2 m-2 rounded-xl border border-[#E0E0DF]'>
              <input type='text' placeholder={`Search ${filter}`} className='w-full bg-transparent'/>
              <button className=" hover:bg-slate-300 p-2 rounded-md" onClick={() => {
                setFilterIndex((filterIndex + 1)%4);
                setFilter(filters[(filterIndex + 1)%4]);
              }}>
                <Image src={"/assets/Vector.svg"} alt="filter" width={15} height={8.5}/>
              </button>
            </div>
            </td>
          </tr>
          <tr>
            <th className=" p-4 pr-0">ACTOR</th>
            <th className=" p-4 pr-0">ACTION</th>
            <th className=" p-4 pr-0" colSpan={2}>DATE</th>
          </tr>
        </thead>
          {events.map(e => 
            <tr key={e.id} className=" bg-white hover:bg-[#FBFBFB] text-black" onClick={ () => setSelectedEvent(e)}>
              {/* TODO: Extract */}
              <td className=" p-4 pr-0 flex gap-3"><Avatar Name={e.target_name.toUpperCase()}/>{e.target_name}</td>
              <td className=" p-4 pr-0">{e.action.name}</td>
              <td className=" p-4 pr-0">{(new Date(e.occurred_at)).toLocaleString("en-US", {dateStyle: "short", timeStyle: "short"})}</td>
              <td><Image src={"/assets/Vector (Stroke).svg"} alt="See more" width={9} height={14}/></td>
            </tr>
            )}
          <tr className=" bg-[#F5F5F5] text-[#616161]">
            <th colSpan={6} className="text-center p-4"><button>Load more</button></th>
          </tr>
      </table>
      {selectedEvent && <Details event={selectedEvent} onClose={onClose}/>}
      </div>
  );
}
