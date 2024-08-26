import classes from './Header.module.css';

export default function Header({title, perex}) {
    return (
        <header className={classes.header}>
            <h3>{title}</h3>
            <span>{perex}</span>
        </header>
    )
}