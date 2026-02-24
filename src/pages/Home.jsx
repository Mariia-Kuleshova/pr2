import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { eventsSelectors } from "../store/eventsSlice";

export default function Home() {
  // отримуємо список подій з Redux Store через selector
  const events = useSelector(eventsSelectors.selectAll);

  return (
    <div className="container">
      <h1>Курси малювання</h1>

      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.title}</h3>

          <Link to={`/register/${event.id}`}>Register</Link>
          {" | "}
          <Link to={`/participants/${event.id}`}>Participants</Link>
        </div>
      ))}

      <hr />
      <Link to="/analytics">Analytics</Link>
    </div>
  );
}
