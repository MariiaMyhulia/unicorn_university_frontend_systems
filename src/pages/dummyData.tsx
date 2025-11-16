export type User = { id: string; name: string; email: string };
export type Item = { id: string; title: string; checked: boolean; createdBy: string };
export type List = {
    id: string;
    name: string;
    ownerId: string;
    members: User[];
    items: Item[];
    archived?: boolean;
};
export const CURRENT_USER: User = { id: "me111", name: "Mariia", email: "mariia@mariia.com" };

export const INITIAL_LIST: List = {
    id: "list1",
    name: "Test list",
    ownerId: "me111",
    members: [
        { id: "tomas111", name: "Tomas", email: "tomas@tomas.com" },
        { id: "vaclav111", name: "Vaclav", email: "Vaclav@vaclav.com" },
    ],
    items: [
        { id: "1", title: "Bread", checked: false, createdBy: "tomas111" },
        { id: "2", title: "Milk", checked: true, createdBy: "vaclav111" },
        { id: "3", title: "Tomatoes", checked: false, createdBy: "tomas111" },
        { id: "4", title: "Pasta", checked: false, createdBy: "tomas111" },
        { id: "5", title: "Cheese", checked: false, createdBy: "me111" },
        { id: "6", title: "Ham", checked: false, createdBy: "me111" }
    ],
};