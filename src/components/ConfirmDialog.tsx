import s from "../styles/lists.module.scss";

type Props = {
    open: boolean;
    title: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onClose: () => void;
};

export default function ConfirmDialog({
                                          open, title, message, confirmText = "Delete", cancelText = "Cancel", onConfirm, onClose,
                                      }: Props) {
    if (!open) return null;
    return (
        <div className={s.modalBackdrop} onClick={onClose}>
            <div className={s.modalCard} onClick={(e) => e.stopPropagation()}>
                <h3>{title}</h3>
                {message && <p>{message}</p>}
                <div className={s.modalActions}>
                    <button className={`${s.btn}`} onClick={onClose}>{cancelText}</button>
                    <button className={`${s.btn} ${s.btnDanger}`} onClick={() => {
                        onConfirm();
                        onClose();
                    }}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}