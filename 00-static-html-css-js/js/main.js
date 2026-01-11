import { createStore } from "./state.js";
import { qs, el } from "./dom.js";

const store = createStore({
    theme: "dark",
    items: [
        { id: crypto.randomUUID(), text: "Refresh HTML semantics" },
        { id: crypto.randomUUID(), text: "Review CSS layout + a11y" },
    ],
});

const $year = qs("#year");
const $toggleTheme = qs("#btn-toggle-theme");
const $addItem = qs("#btn-add-item");
const $form = qs("#demo-form");
const $input = qs("#demo-input");
const $list = qs("#demo-list");
const $count = qs("#demo-count");
const $clear = qs("#btn-clear");

$year.textContent = String(new Date().getFullYear());

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme === "light" ? "light" : "";
}

function render(state) {
    applyTheme(state.theme);

    $count.textContent = `${state.items.length} item(s)`;
    $list.replaceChildren(
        ...state.items.map((item, idx) =>
            el("li", { class: "list-item" }, [
                el("div", {}, [
                    el("div", {}, [document.createTextNode(item.text)]),
                    el("span", { class: "badge" }, [document.createTextNode(`#${idx + 1}`)]),
                ]),
                el("button", {
                    class: "btn btn-ghost",
                    type: "button",
                    onClick: () => removeItem(item.id),
                    "aria-label": `Remove ${item.text}`,
                }, [document.createTextNode("Remove")]),
            ])
        )
    );
}

function addItem(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    store.setState((s) => ({
        ...s,
        items: [{ id: crypto.randomUUID(), text: trimmed }, ...s.items],
    }));
}

function removeItem(id) {
    store.setState((s) => ({
        ...s,
        items: s.items.filter((x) => x.id !== id),
    }));
}

function clearItems() {
    store.setState((s) => ({ ...s, items: [] }));
}

$toggleTheme.addEventListener("click", () => {
    store.setState((s) => ({
        ...s,
        theme: s.theme === "dark" ? "light" : "dark",
    }));
});

$addItem.addEventListener("click", () => addItem("New demo item"));

$form.addEventListener("submit", (e) => {
    e.preventDefault();
    addItem($input.value);
    $input.value = "";
    $input.focus();
});

$clear.addEventListener("click", clearItems);

store.subscribe(render);
render(store.getState());
