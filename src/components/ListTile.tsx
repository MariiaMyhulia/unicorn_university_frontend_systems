import { Link } from "react-router-dom";
import s from "../styles/lists.module.scss";

export type ListMeta = {
    id: string;
    name: string;
    ownerId: string;
    itemsCount: number;
    membersCount: number;
    archived?: boolean;
    createdAt: string;
};

export default function ListTile({
                                     data, isOwner, onDelete,
                                 }: { data: ListMeta; isOwner: boolean; onDelete: (id: string) => void }) {
    return (
        <div className={s.tile}>
            <h3 className={s.tileTitle}>
                <Link to={`/lists/${data.id}`}>{data.name}</Link>
            </h3>
            <div className={s.badges}>
                <span className={s.badge}>{data.itemsCount} items</span>
                <span className={s.badge}>{data.membersCount + 1} members</span>
                {data.archived && <span className={s.badge}>archived</span>}
            </div>
            <div className={s.meta}>Created {new Date(data.createdAt).toLocaleDateString()}</div>
            <div className={s.row}>
                <Link className={`${s.btn}`} to={`/lists/${data.id}`}>Open</Link>
                {isOwner && (
                    <button className={`${s.btn} ${s.btnDanger}`} onClick={() => onDelete(data.id)}>Delete</button>
                )}
            </div>
        </div>
    );
}
