import { Link } from "react-router-dom";

const Card = ({ title, number, icon, link }) => {
  return (
    <Link
      to={link}
      className="flex items-center p-6 bg-white rounded-lg shadow-sm"
    >
      <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{number}</p>
      </div>
    </Link>
  );
};

export default Card;
