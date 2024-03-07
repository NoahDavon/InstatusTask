import Image from "next/image";

export default function Home() {
  return (
    <div className=" w-full">
      <table className="table-auto w-full text-left border-separate border border-spacing-0 overflow-hidden border-opacity-0 rounded-lg">
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
      </table>
      </div>
  );
}
