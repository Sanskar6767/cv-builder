import reactLogo from "../assets/react.svg";
import "../styles/header.css";

export default function Header() {
  return (
    <header>
      <img className="logo react" src={reactLogo} alt="React Logo" />
      <div className="center">
        <h1>CV Application Builder</h1>
      </div>
    </header>
  );
}
