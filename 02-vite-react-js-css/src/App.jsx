import { useMemo, useState } from "react";

export default function App() {
    const [items, setItems] = useState(["Vite in the mix", "Pure JS"]);
    const [text, setText] = useState("");

    const count = useMemo(() => items.length, [items]);

    function addItem(e) {
        e.preventDefault();
        const v = text.trim();
        if (!v) return;
        setItems((prev) => [v, ...prev]);
        setText("");
    }

    return (
        <main className="container">
            <section className="card">
                <h1>Vite + React + JS + CSS</h1>
                <p className="muted">
                    JSX works here because Vite transforms it before the browser executes it.
                </p>

                <form className="row" onSubmit={addItem}>
                    <input
                        className="input"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add a note..."
                    />
                    <button className="btn" type="submit">
                        Add
                    </button>
                    <span className="badge">{count} item(s)</span>
                </form>

                <ul className="list">
                    {items.map((x, i) => (
                        <li key={`${x}-${i}`} className="list-item">
                            <span>{x}</span>
                            <button className="btn btn-ghost" onClick={() => setItems((p) => p.filter((_, idx) => idx !== i))}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
