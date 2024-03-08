'use client'
import Image from "next/image";
import Avatar from "./components/Avatar/Avatar";
import Details from "./components/Details/Details";
import { useEffect, useState } from "react";
import useSWR, {preload} from "swr";

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
  occured_at: string;
  metadata:    string;
}

export interface Action {
  id:     string;
  object: string;
  name:   string;
}

const filters = ["name", "email", "actor", "id"];
const fetcher = (url : string) => fetch(url).then((res) => res.json())
 
preload('/api/events', fetcher)
export default function Home() {
  const [queryURL, setQueryURL] = useState("/api/events?page=1");
  const {isLoading, data} = useSWR(queryURL, fetcher)
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [filter, setFilter] = useState("name");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [filterIndex, setFilterIndex] = useState(0);
  const [lastSearch, setLastSearch] = useState("name")
  const [events, setEvents] = useState<Event[]>([]);
  const onClose = () => {
    setSelectedEvent(undefined);
  }
  const refetch = (newPage : number, q: string = "")=> {
    let URL = "/api/events?";
    URL+= q;
    URL += `page=${newPage}`;
    setQueryURL(URL);
  }
  const nextPage = ()=> {
    refetch(page+1);
    setPage(page+1);
    
  }
  const search = () => {
    if(!query) return;
    if(lastSearch != filter + query){
      setLastSearch(filter + query);
      setPage(1);
      refetch(1, `type=${filter}&&query=${query}&&`);
    }
  }
  useEffect(()=> {
    if(data&& page == 1){
      setEvents(data.events)
    }
    else if (data) {
      setEvents([...events,...data.events])
    }
  }, [data])
  return (
    <div className=" w-full z-0">
      <table className="table-auto w-3/4 m-auto text-left border-separate border border-spacing-0 overflow-hidden border-opacity-0 rounded-xl">
        <thead className=" bg-[#F5F5F5] text-[#616161]">
          <tr>
            <td colSpan={4}>
            <div className='flex p-2 m-2 rounded-xl border border-[#E0E0DF]'>
              <input type='text' placeholder={`Search ${filter}`} className='w-full bg-transparent' onChange={e => setQuery(e.target.value)}/>
              <button className=" hover:bg-slate-300 p-2 rounded-md" onClick={search}>Search</button>
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
          {events?.map((e: Event) => 
            <tr key={e.id} className=" bg-white hover:bg-[#FBFBFB] text-black" onClick={ () => setSelectedEvent(e)}>
              {/* TODO: Extract */}
              <td className=" p-4 pr-0 flex gap-3"><Avatar Name={e.target_name.toUpperCase()}/>{e.target_name}</td>
              <td className=" p-4 pr-0">{e.action.name}</td>
              <td className=" p-4 pr-0">{(new Date(e.occured_at)).toLocaleString("en-US", {dateStyle: "short", timeStyle: "short"})}</td>
              <td><Image src={"/assets/Vector (Stroke).svg"} alt="See more" width={9} height={14}/></td>
            </tr>
            )}
          <tr className=" bg-[#F5F5F5] text-[#616161]">
            <th colSpan={6} className="text-center p-4"><button className=" disabled: text-[#9e9d9d]" onClick={nextPage} disabled={isLoading || !data.nextPageExists}>{isLoading? "loading..." : !data.nextPageExists? "" : "Load More"}</button></th>
          </tr>
      </table>
      {selectedEvent && <Details event={selectedEvent} onClose={onClose}/>}
      </div>
  );
}
