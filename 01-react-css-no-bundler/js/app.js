import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
    const [items, setItems] = useState([
        "Review React Fundamentals",
        "See createElement in action",
        "Style with plain CSS",
    ]);
    const [text, setText] = useState("");

    const count = useMemo(() => items.length, [items]);

    function addItem(e) {
        e.preventDefault();
        const v = text.trim();
        if (!v) return;
        setItems((prev) => [v, ...prev]);
        setText("");
    }

    function removeItem(idx) {
        setItems((prev) => prev.filter((_, i) => i !== idx));
    }

    return React.createElement(
        "div",
        { className: "card" },
        React.createElement("h1", null, "React + CSS (no bundler)"),
        React.createElement(
            "p",
            { className: "muted" },
            "This template proves React fundamentals: state, events, rendering, and clean CSS."
        ),
        React.createElement(
            "form",
            { className: "row", onSubmit: addItem },
            React.createElement("input", {
                className: "input",
                value: text,
                onChange: (e) => setText(e.target.value),
                placeholder: "Add a note…",
                "aria-label": "New item",
            }),
            React.createElement("button", { className: "btn", type: "submit" }, "Add")
        ),
        React.createElement("p", { className: "muted" }, `${count} item(s)`),
        React.createElement(
            "ul",
            null,
            ...items.map((it, idx) =>
                React.createElement(
                    "li",
                    {
                        key: `${it}-${idx}`,
                        className: "row",
                        style: { justifyContent: "space-between" },
                    },
                    React.createElement("span", null, it),
                    React.createElement(
                        "button",
                        { className: "btn", type: "button", onClick: () => removeItem(idx) },
                        "Remove"
                    )
                )
            )
        )
    );
}

createRoot(document.getElementById("root")).render(React.createElement(App));
