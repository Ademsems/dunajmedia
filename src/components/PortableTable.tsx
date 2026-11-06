interface TableRowValue {
  _key?: string;
  cells?: (string | null)[];
}

interface TableValue {
  rows?: TableRowValue[];
}

export default function PortableTable({ value }: { value: TableValue }) {
  const rows = (value?.rows ?? []).filter((row) => row?.cells?.length);
  if (!rows.length) return null;

  const [head, ...body] = rows;
  const columns = Math.max(...rows.map((row) => row.cells!.length));

  return (
    <div
      className="my-8 overflow-x-auto rounded-xl border border-[#1E293B] bg-[#0B1224] focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua/50"
      tabIndex={0}
    >
      <table
        className="w-full border-collapse text-left text-sm font-body"
        style={{ minWidth: `${columns * 7}rem` }}
      >
        <thead>
          <tr className="border-b border-[#1E293B]">
            {head.cells!.map((cell, i) => (
              <th key={i} scope="col" className="px-4 py-3 align-top font-semibold text-white">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        {body.length > 0 && (
          <tbody>
            {body.map((row, rowIndex) => (
              <tr key={row._key ?? rowIndex} className="border-t border-[#1E293B] first:border-t-0">
                {row.cells!.map((cell, i) => (
                  <td key={i} className="px-4 py-3 align-top leading-relaxed text-[#94A3B8]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
