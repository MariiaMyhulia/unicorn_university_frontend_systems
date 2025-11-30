import { useMemo, useState } from "react";
import s from "../../styles/lists.module.scss";
import AddList from "../../components/AddList.tsx";
import ConfirmDialog from "../../components/ConfirmDialog";
import ListTile from "../../components/ListTile";

import {
    CURRENT_USER,
    INITIAL_LISTS,
    makeNewListMeta,
    type ListMeta,
} from "../../data/dummyData";

export default function ListsOverview() {
    const [lists, setLists] = useState<ListMeta[]>(INITIAL_LISTS);
    const [addOpen, setAddOpen] = useState(false);
    const [confirmId, setConfirmId] = useState<string | null>(null);

    const mine = useMemo(() => lists.filter(l => l.ownerId === CURRENT_USER.id), [lists]);
    const shared = useMemo(() => lists.filter(l => l.ownerId !== CURRENT_USER.id), [lists]);

    function createList(name: string) {
        setLists(prev => [makeNewListMeta(name), ...prev]);
    }
    function requestDelete(id: string) {
        setConfirmId(id);
    }
    function doDelete(id: string) {
        setLists(prev => prev.filter(l => l.id !== id));
    }

    return (
        <div className={s.page}>
            <div className={s.header}>
                <h1 style={{ margin: 0 }}>Shopping Lists</h1>
                <button className={`${s.btn} ${s.btnPrimary}`} onClick={() => setAddOpen(true)}>New list</button>
            </div>

            {mine.length > 0 && (
                <>
                    <h2>My lists</h2>
                    <div className={s.grid}>
                        {mine.map(l => (
                            <ListTile key={l.id} data={l} isOwner onDelete={requestDelete} />
                        ))}
                    </div>
                </>
            )}

            {shared.length > 0 && (
                <>
                    <h2>Shared</h2>
                    <div className={s.grid}>
                        {shared.map(l => (
                            <ListTile key={l.id} data={l} isOwner={false} onDelete={requestDelete} />
                        ))}
                    </div>
                </>
            )}

            {mine.length === 0 && shared.length === 0 && (
                <div className={s.centerEmpty}>No lists. Create your first list.</div>
            )}

            <AddList open={addOpen} onClose={() => setAddOpen(false)} onCreate={createList} />
            <ConfirmDialog
                open={!!confirmId}
                title="Delete this list?"
                message="This will remove the list from your overview."
                confirmText="Delete"
                onConfirm={() => confirmId && doDelete(confirmId)}
                onClose={() => setConfirmId(null)}
            />
        </div>
    );
}