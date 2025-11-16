import React from "react";
import s from "../pages/listDetail/list.module.scss";

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className={s.section}>
            <h2 className={s.sectionTitle}>{title}</h2>
            {children}
        </section>
    );
}

export function Badge({
                         children, onRemove, muted,
                     }: { children: React.ReactNode; onRemove?: () => void; muted?: boolean }) {
    return (
        <span className={`${s.badge} ${muted ? s["badge--muted"] : ""}`}>
      {children}
            {onRemove && (
                <button className={s.badgeRemove} onClick={onRemove} title="Remove">×</button>
            )}
    </span>
    );
}

export function Row({ children }: { children: React.ReactNode }) {
    return <div className={s.row}>{children}</div>;
}

// Button class helpers
export const cls = {
    primary: `${s.btn} ${s["btn--primary"]}`,
    ghost: `${s.btn} ${s["btn--ghost"]}`,
    danger: `${s.btn} ${s["btn--danger"]}`,
    pill: `${s.btn} ${s["btn--pill"]}`,
};

