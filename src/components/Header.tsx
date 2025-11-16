import { useState } from "react";
import { cls } from "./uiComponents";
import s from "../pages/listDetail/list.module.scss";
export default function Header({
                                   name, isOwner, onRename,
                               }: { name: string; isOwner: boolean; onRename: (newName: string) => void }) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(name);

    return (
        <div className={s.header}>
            {editing ? (
                <>
                    <input
                        className={s.headerInput}
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                    />
                    <button
                        className={cls.primary}
                        onClick={() => {
                            if (!isOwner) return;
                            const v = draft.trim();
                            if (v) onRename(v);
                            setEditing(false);
                        }}
                        disabled={!isOwner}
                    >
                        Save
                    </button>
                    <button className={cls.ghost} onClick={() => { setDraft(name); setEditing(false); }}>
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <h1 className={s.headerTitle}>{name}</h1>
                    {isOwner && (
                        <button className={cls.ghost} onClick={() => { setDraft(name); setEditing(true); }}>
                            Rename
                        </button>
                    )}
                </>
            )}
        </div>
    );
}