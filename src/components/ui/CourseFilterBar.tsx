interface Props {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  level: string;
  setLevel: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
}

export function CourseFilterBar(props: Props) {
  return (
    <div className="flex gap-4">
      <input
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
        placeholder="Tìm khoá học..."
        className="border px-3 py-2 rounded"
      />

      <select
        value={props.category}
        onChange={(e) => props.setCategory(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="">Tất cả </option>
        <option value="lập trình">Lập trình</option>
        <option value="marketing">Marketing</option>
        <option value="nhiếp ảnh">Nhiếp ảnh</option>
        <option value="thiết kế">Thiết kế</option>
        <option value="kinh doanh">Kinh doanh</option>
        <option value="ngoại ngữ">Ngoại ngữ</option>
      </select>
     <select
        value={props.level}
        onChange={(e) => props.setLevel(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="">Tất cả Level</option>
        <option value="Cơ Bản">Cơ Bản</option>
        <option value="Trung Bình">Trung Bình</option>
        <option value="Nâng Cao">Nâng Cao</option>
      </select>

      <select
        value={props.sort}
        onChange={(e) => props.setSort(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="">Sắp xếp</option>
        <option value="price-asc">Giá tăng dần</option>
        <option value="price-desc">Giá giảm dần</option>
      </select>
    </div>
  );
}
