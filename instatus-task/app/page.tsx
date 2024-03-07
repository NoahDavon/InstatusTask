import Image from "next/image";

export default function Home() {
  return (
    <div>
      <table className=" table-auto">
        <thead>
          <tr>
            <td colSpan={4}>
              {/* search bar here */}
            </td>
          </tr>
          <tr>
            <th>ACTOR</th>
            <th>ACTION</th>
            <th colSpan={2}>DATE</th>
          </tr>
        </thead>
        
      </table>
    </div>
  );
}
