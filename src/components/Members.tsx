import { useState } from "react";
import type { User } from "../pages/dummyData";
import s from "../pages/listDetail/list.module.scss";
import { Badge, Section, cls } from "./uiComponents";
export default function Users({
                                    ownerName, isOwner, isMember, members, onAdd, onRemove, onLeave,
                                }: {
    ownerName: string; isOwner: boolean; isMember: boolean; members: User[];
    onAdd: (email: string) => void; onRemove: (userId: string) => void; onLeave: () => void;
}) {
    const [email, setEmail] = useState("");

    return (
        <Section title="Users">
            <div className={s.badges}>
                <Badge muted>{ownerName}</Badge>
                {members.map((m) => (
                    <Badge key={m.id} onRemove={isOwner ? () => onRemove(m.id) : undefined}>
                        {m.name} <span style={{ opacity: 0.7 }}>({m.email})</span>
                    </Badge>
                ))}
            </div>

            {isOwner ? (
                <div className={s.itemsBar}>
                    <input
                        className={s.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="member@email"
                    />
                    <button className={cls.primary} onClick={() => {
                        const v = email.trim();
                        if (!v) return;
                        onAdd(v);
                        setEmail("");
                    }}>
                        Add member
                    </button>
                </div>
            ) : (
                <div>
                    <button className={cls.danger} onClick={onLeave} disabled={!isMember}>
                        Leave list
                    </button>
                </div>
            )}
        </Section>
    );
}