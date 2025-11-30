import {useState} from "react";
import s from "../styles/lists.module.scss";

type Props = {
    open: boolean;
    onClose: () => void;
    onCreate: (name: string) => void;
};

export default function AddList({
                                    open, onClose, onCreate
                                }: Props) {
    const [name, setName] = useState("");

    if (!open) return null;

    function submit() {
        const v = name.trim();
        if (!v) return;
        onCreate(v);
        setName("");
        onClose();
    }

    return (
        <div className={s.modalBackdrop} onClick={onClose}>
            <div className={s.modalCard} onClick={(e) => e.stopPropagation()}>
                <h3>Create new shopping list</h3>
                <div className={s.field}>
                    <label>Name</label>
                    <input className={s.input} value={name} onChange={(e) => setName(e.target.value)}
                           placeholder="groceries 15.01.2026"/>
                </div>
                <div className={s.modalActions}>
                    <button className={`${s.btn}`} onClick={onClose}>Cancel</button>
                    <button className={`${s.btn} ${s.btnPrimary}`} onClick={submit}>Create</button>
                </div>
            </div>
        </div>
    );
}