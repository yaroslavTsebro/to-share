import style from "./NavLink.module.scss";

interface Props {
  className?: string;
  href: string;
  title: string;
}

export const NavLink: React.FC<Props> = ({ className, href, title }) => {
  const classes = `${style.menuItem} ${className || ""}`;

  return (
    <li className={classes}>
      <a href={href} className={style.menuLink}>
        {title}
      </a>
    </li>
  );
};
