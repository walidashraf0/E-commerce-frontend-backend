import { faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons";

export const links = [
    {
        name: "Users",
        path: "users",
        icon: faUsers,
        role: ["1995"]
    },
    {
        name: "Add User",
        path: "/dashboard/user/add",
        icon: faUserPlus,
        role: ["1995"]
    },
    {
        name: "Viewer",
        path: "/dashboard/viewer",
        icon: faUsers,
        role: ["1995", "1992"]
    },
];