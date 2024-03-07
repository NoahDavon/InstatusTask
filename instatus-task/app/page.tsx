'use client'
import Image from "next/image";
import events from "./dummies/events";
import Avatar from "./components/Avatar/Avatar";
import Details from "./components/Details/Details";
import { useState } from "react";

export default function Home() {
  const [modal, setModal] = useState(true);
  const onClose = () => {
    setModal(false);
  }
  return (
    <div className=" w-full z-0">
      <table className="table-auto w-3/4 m-auto text-left border-separate border border-spacing-0 overflow-hidden border-opacity-0 rounded-xl">
        <thead className=" bg-[#F5F5F5] text-[#616161]">
          <tr>
            <td colSpan={4}>
              {/* search bar here */}
            </td>
          </tr>
          <tr>
            <th className=" p-4 pr-0">ACTOR</th>
            <th className=" p-4 pr-0">ACTION</th>
            <th className=" p-4 pr-0" colSpan={2}>DATE</th>
          </tr>
        </thead>
          {events.map(e => 
            <tr key={e.id} className=" bg-white hover:bg-[#FBFBFB] text-black">
              {/* TODO: Icon */}
              {/* TODO: Extract */}
              <td className=" p-4 pr-0 flex gap-3"><Avatar Name={e.target_name.toUpperCase()}/>{e.target_name}</td>
              <td className=" p-4 pr-0">{e.action.name}</td>
              <td className=" p-4 pr-0">{(new Date(e.occurred_at)).toLocaleString("en-US", {dateStyle: "short", timeStyle: "short"})}</td>
              <td><Image src={"/assets/Vector (Stroke).svg"} alt="See more" width={9} height={14}/></td>
            </tr>
            )}
      </table>
      {modal && <Details onClose={onClose}/>}
      </div>
  );
}
