import { Link } from 'react-router-dom';

type CustomLinkType = {
  to: string;
  children: React.ReactNode;
};

const CustomLink = ({ to, children }: CustomLinkType) => {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      {children}
    </Link>
  );
};

export default CustomLink;
