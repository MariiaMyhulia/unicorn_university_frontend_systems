import { useMemo, useState } from "react";
import type { Item } from "../pages/dummyData";
import s from "../pages/listDetail/list.module.scss";
import { Row, Section, cls } from "./uiComponents";

type Filter = "all" | "open" | "done";

export default function Items({
                                  items, canEdit, onAdd, onToggle, onDelete, onEdit,
                              }: {
    items: Item[]; canEdit: boolean;
    onAdd: (title: string) => void; onToggle: (id: string) => void;
    onDelete: (id: string) => void; onEdit: (id: string, title: string) => void;
}) {
    const [title, setTitle] = useState("");
    const [filter, setFilter] = useState<Filter>("all");

    const filtered = useMemo(() => {
        if (filter === "open") return items.filter((i) => !i.checked);
        if (filter === "done") return items.filter((i) => i.checked);
        return items;
    }, [filter, items]);

    const openCount = items.filter((i) => !i.checked).length;
    const doneCount = items.length - openCount;

    function submit() {
        const v = title.trim();
        if (!v) return;
        onAdd(v);
        setTitle("");
    }

    return (
        <Section title="Items">
            {canEdit && (
                <div className={s.itemsBar}>
                    <input
                        className={s.input}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add new item…"
                        onKeyDown={(e) => e.key === "Enter" && submit()}
                    />
                    <button className={cls.primary} onClick={submit}>Add</button>
                </div>
            )}

            <div className={s.itemsBar}>
                <label htmlFor="filter" style={{ alignSelf: "center" }}>Filter:</label>
                <select
                    id="filter"
                    className={s.input}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as Filter)}
                >
                    <option value="all">All ({items.length})</option>
                    <option value="open">Unresolved ({openCount})</option>
                    <option value="done">Resolved ({doneCount})</option>
                </select>
            </div>

            <div className={s.grid}>
                {filtered.length === 0 ? (
                    <div style={{ color: "#888", padding: "8px 4px" }}>No items to show.</div>
                ) : (
                    filtered.map((item) => (
                        <ItemRow
                            key={item.id}
                            item={item}
                            canEdit={canEdit}
                            onToggle={() => onToggle(item.id)}
                            onDelete={() => onDelete(item.id)}
                            onEdit={(t) => onEdit(item.id, t)}
                        />
                    ))
                )}
            </div>
        </Section>
    );
}

function ItemRow({
                     item, canEdit, onToggle, onDelete, onEdit,
                 }: {
    item: Item;
    canEdit: boolean;
    onToggle: () => void;
    onDelete: () => void;
    onEdit: (title: string) => void;
}) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(item.title);

    return (
        <Row>
            <input type="checkbox" checked={!!item.checked} onChange={onToggle} disabled={!canEdit} />
            {editing ? (
                <>
                    <input className={s.input} value={draft} onChange={(e) => setDraft(e.target.value)} style={{ flex: 1 }} />
                    <button className={cls.primary} onClick={() => { const t = draft.trim(); if (t) onEdit(t); setEditing(false); }}>
                        Save
                    </button>
                    <button className={cls.ghost} onClick={() => setEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <div style={{ flex: 1 }} className={item.checked ? s.lineThrough : undefined}>{item.title}</div>
                    {canEdit && (
                        <>
                            <button className={cls.ghost} onClick={() => setEditing(true)}>Edit</button>
                            <button className={cls.danger} onClick={onDelete}>Delete</button>
                        </>
                    )}
                </>
            )}
        </Row>
    );
}