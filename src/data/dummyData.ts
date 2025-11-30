export type User = { id: string; name: string; email: string };
export type Item = { id: string; title: string; checked: boolean; createdBy: string };
export type List = {
    id: string;
    name: string;
    ownerId: string;
    members: User[];
    items: Item[];
    archived?: boolean;
    createdAt?: string;
};

export const CURRENT_USER: User = {id: "me111", name: "Mariia", email: "mariia@mariia.com"};

export const INITIAL_LIST: List = {
    id: "list1",
    name: "Test list",
    ownerId: "me111",
    members: [
        {id: "tomas111", name: "Tomas", email: "tomas@tomas.com"},
        {id: "vaclav111", name: "Vaclav", email: "Vaclav@vaclav.com"},
    ],
    items: [
        {id: "1", title: "Bread", checked: false, createdBy: "tomas111"},
        {id: "2", title: "Milk", checked: true, createdBy: "vaclav111"},
        {id: "3", title: "Tomatoes", checked: false, createdBy: "tomas111"},
        {id: "4", title: "Pasta", checked: false, createdBy: "tomas111"},
        {id: "5", title: "Cheese", checked: false, createdBy: "me111"},
        {id: "6", title: "Ham", checked: false, createdBy: "me111"}
    ],
    archived: false,
    createdAt: "2025-03-05T10:00:00Z",
};

export type ListMeta = {
    id: string;
    name: string;
    ownerId: string;
    itemsCount: number;
    membersCount: number;
    archived?: boolean;
    createdAt: string;
};

export const INITIAL_LISTS: ListMeta[] = [
    {
        id: "list1",
        name: "Test list",
        ownerId: "me111",
        itemsCount: 6,
        membersCount: 2,
        archived: false,
        createdAt: "2025-03-05T10:00:00Z",
    },
    {
        id: "list_party",
        name: "Party",
        ownerId: "tomas111",
        itemsCount: 12,
        membersCount: 3,
        createdAt: "2025-03-02T12:00:00Z",
    },
    {
        id: "list_trip",
        name: "Trip",
        ownerId: "me111",
        itemsCount: 3,
        membersCount: 1,
        archived: true,
        createdAt: "2025-02-28T09:00:00Z",
    },
];

export function getListById(id: string): List | null {
    return id === INITIAL_LIST.id ? INITIAL_LIST : null;
}

export function makeNewListMeta(name: string, ownerId = CURRENT_USER.id): ListMeta {
    const id = "list_" + Math.random().toString(36).slice(2, 8);
    return {
        id,
        name,
        ownerId,
        itemsCount: 0,
        membersCount: 0,
        archived: false,
        createdAt: new Date().toISOString(),
    };
}
