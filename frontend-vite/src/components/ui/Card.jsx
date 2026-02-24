export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm border border-gray-100
        hover:shadow-md transition-shadow duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
