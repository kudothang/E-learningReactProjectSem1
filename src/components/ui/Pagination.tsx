interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50  bg-green-400 text-white font-bold hover:bg-green-500 cursor-pointer"
      >
        Prev
      </button>

     <button
        disabled
        className="px-3 py-1 border rounded bg-gray-100"
      >
        {page} / {totalPages}
      </button>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50 bg-green-400 text-white font-bold hover:bg-green-500 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
