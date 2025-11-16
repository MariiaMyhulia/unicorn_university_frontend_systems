import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header";
import Members from "../../components/Members";
import Items from "../../components/Items";
import s from "./list.module.scss";
import { Badge } from "../../components/uiComponents";
import { CURRENT_USER, INITIAL_LIST, type List, type User, type Item } from "../dummyData";

export default function ListDetail() {
    const navigate = useNavigate();

    const [list, setList] = useState<List>(INITIAL_LIST);
    const isOwner = CURRENT_USER.id === list.ownerId;
    const isMember = list.members.some((m) => m.id === CURRENT_USER.id);
    const canEditItems = isOwner || isMember;

    function renameList(newName: string) {
        if (!isOwner) return;
        setList((prev) => ({ ...prev, name: newName }));
    }

    function addMemberByEmail(email: string) {
        if (!isOwner) return;
        const exists = list.members.some((m) => m.email === email) || email === CURRENT_USER.email;
        if (exists) return;
        const newUser: User = { id: "newUser" + Math.random().toString(36).slice(2, 8), name: email.split("@")[0], email };
        setList((p) => ({ ...p, members: [...p.members, newUser] }));
    }
    function removeMember(userId: string) {
        if (!isOwner) return;
        setList((p) => ({ ...p, members: p.members.filter((m) => m.id !== userId) }));
    }
    function leaveList() {
        if (isOwner || !isMember) return;
        setList((p) => ({ ...p, members: p.members.filter((m) => m.id !== CURRENT_USER.id) }));
        navigate("/");
    }

    function addItem(title: string) {
        if (!canEditItems) return;
        const item: Item = {
            id: "item_" + Math.random().toString(36).slice(2, 8),
            title,
            checked: false,
            createdBy: CURRENT_USER.id,
        };
        setList((p) => ({ ...p, items: [item, ...p.items] }));
    }
    function toggleItem(id: string) {
        if (!canEditItems) return;
        setList((p) => ({ ...p, items: p.items.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)) }));
    }
    function deleteItem(id: string) {
        if (!canEditItems) return;
        setList((p) => ({ ...p, items: p.items.filter((i) => i.id !== id) }));
    }
    function editItem(id: string, title: string) {
        if (!canEditItems) return;
        const t = title.trim();
        if (!t) return;
        setList((p) => ({ ...p, items: p.items.map((i) => (i.id === id ? { ...i, title: t } : i)) }));
    }

    return (
        <div className={s.page}>
            <div className={s.headerTitle}>
            <Header name={list.name} isOwner={isOwner} onRename={renameList}/>
            </div>
            <div>
                <Badge  muted>Owner: {CURRENT_USER.name}</Badge>
            </div>

            <Members
                ownerName={CURRENT_USER.name}
                isOwner={isOwner}
                isMember={isMember}
                members={list.members}
                onAdd={addMemberByEmail}
                onRemove={removeMember}
                onLeave={leaveList}
            />

            <Items
                items={list.items}
                canEdit={canEditItems}
                onAdd={addItem}
                onToggle={toggleItem}
                onDelete={deleteItem}
                onEdit={editItem}
            />
        </div>
    );
}
