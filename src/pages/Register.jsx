import { useState } from "react";
import { useParams } from "react-router-dom";
import { z } from "zod";

//схема Zod для валідації форми
// описує правила для кожного поля
const schema = z.object({
  name: z.string().min(1, "Enter name"),
  email: z.string().email("Invalid email"),
  birthDate: z.string().refine((date) => {
    // перевірка, щоб користувач був старше 18 років
    const today = new Date();
    const birth = new Date(date);
    const age = today.getFullYear() - birth.getFullYear();
    return age >= 18;
  }, "You must be 18+"),
  source: z.string().min(1, "Choose option"),
});

export default function Register() {
  //отримуємо eventId з url (/register/:eventId)
  const { eventId } = useParams();

  //state для керованої форми (controlled inputs)
  const [form, setForm] = useState({
    name: "",
    email: "",
    birthDate: "",
    source: "",
  });

  //state для помилок валідації
  const [errors, setErrors] = useState({});

  //універсальний handler для оновлення input
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault(); //щоб форма не перезавантажувала сторінку

    //перевірка даних через Zod
    const result = schema.safeParse(form);

    //якщо є помилки, то фрмуємо об'єкт errors
    if (!result.success) {
      const err = {};
      result.error.issues.forEach((er) => {
        err[er.path[0]] = er.message;
      });
      setErrors(err);
      return;
    }

    // POST-запит (fake API)
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    alert("Registered to event " + eventId);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Event registration</h2>

        <input name="name" placeholder="Full name" onChange={handleChange} />
        <p>{errors.name}</p>

        <input name="email" placeholder="Email" onChange={handleChange} />
        <p>{errors.email}</p>

        <input name="birthDate" type="date" onChange={handleChange} />
        <p>{errors.birthDate}</p>

        <label>
          <input
            type="radio"
            name="source"
            value="social"
            onChange={handleChange}
          />
          Social media
        </label>

        <label>
          <input
            type="radio"
            name="source"
            value="friends"
            onChange={handleChange}
          />
          Friends
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
}
