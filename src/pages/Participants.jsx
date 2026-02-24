import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
  fetchParticipants,
  selectFilteredParticipants,
} from "../store/participantsSlice";

export default function Participants() {
  // eventId з url
  const { eventId } = useParams();

  const dispatch = useDispatch();

  // локальний state тільки для пошуку, самі дані лежать у Redux
  const [search, setSearch] = useState("");

  // selector фільтрації
  const participants = useSelector((state) =>
    selectFilteredParticipants(state, search),
  );

  // UI states з Redux
  const loading = useSelector((s) => s.participants.loading);
  const error = useSelector((s) => s.participants.error);

  // при зміні eventId запускається asyncThunk
  useEffect(() => {
    dispatch(fetchParticipants(eventId));
  }, [dispatch, eventId]);

  // UI feedback
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Participants {eventId}</h1>

      {}
      <input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* список учасників */}
      {participants.map((p) => (
        <div key={p.id}>
          <b>{p.name}</b>
          <p>{p.email}</p>
        </div>
      ))}
    </div>
  );
}
