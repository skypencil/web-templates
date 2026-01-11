import { useMemo, useState } from "react";

type Item = {
    id: string;
    text: string;
};

export default function App() {
    const [items, setItems] = useState<Item[]>([
        { id: crypto.randomUUID(), text: "Understand the TS build flow" },
        { id: crypto.randomUUID(), text: "Understand tsconfig responsibilities" }
    ]);
    const [text, setText] = useState<string>("");

    const countLabel = useMemo(() => `${items.length} item(s)`, [items.length]);

    function addItem(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const v = text.trim();
        if (!v) return;

        setItems((prev) => [{ id: crypto.randomUUID(), text: v }, ...prev]);
        setText("");
    }

    function removeItem(id: string) {
        setItems((prev) => prev.filter((x) => x.id !== id));
    }

    return (
        <main className="container">
            <section className="card">
                <h1>Vite + React + TS + CSS</h1>
                <p className="muted">
                    TS is for correctness. Vite is for dev server + bundling.
                </p>

                <form className="row" onSubmit={addItem}>
                    <input
                        className="input"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add a note..."
                        aria-label="New item"
                    />
                    <button className="btn" type="submit">Add</button>
                    <span className="badge" aria-live="polite">{countLabel}</span>
                </form>

                <ul className="list">
                    {items.map((x) => (
                        <li key={x.id} className="list-item">
                            <span>{x.text}</span>
                            <button className="btn btn-ghost" type="button" onClick={() => removeItem(x.id)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
