import events from "./dummies/events";

export default function Home() {
  return (
    <div className=" w-full">
      <table className="table-auto w-full text-left border-separate border border-spacing-0 overflow-hidden border-opacity-0 rounded-xl">
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
              <td className=" p-4 pr-0">{e.target_name}</td>
              <td className=" p-4 pr-0">{e.action.name}</td>
              <td className=" p-4 pr-0">{(new Date(e.occurred_at)).toLocaleDateString()}</td>
            </tr>
            )}
      </table>
      </div>
  );
}
