interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="text-sm text-gray-500 mb-4">
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            <a href={item.href} className="hover:text-emerald-600 transition">
              {item.label}
            </a>
          ) : (
            <span className="text-emerald-600 font-medium">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="mx-2">›</span>}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;