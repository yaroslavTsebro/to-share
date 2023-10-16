import { useNavigate } from "react-router-dom";
import style from "./NavLink.module.scss";

interface Props {
  className?: string;
  href: string;
  title: string;
}

export const NavLink: React.FC<Props> = ({ className, href, title }) => {
  const navigate = useNavigate();

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    navigate(href);
  }
  const classes = `${style.menuItem} ${className || ""}`;

  return (
    <li className={classes}>
      <button onClick={handleClick} className={style.menuLink}>
        {title}
      </button>
    </li>
  );
};
