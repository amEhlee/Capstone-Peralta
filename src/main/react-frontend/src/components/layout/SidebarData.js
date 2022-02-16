import {BsFillHouseFill, BsJustify, BsFillBagFill, BsFillPersonLinesFill, BsGraphUp, BsFillGearFill} from "react-icons/bs";

export const SidebarData = [
    {
        title: "Home",
        icon: <BsFillHouseFill/>,
        link: "/"
    },
    {
        title: "Inventory",
        icon: <BsJustify/>,
        link: "/admin/manageitems"
    },
    {
        title: "Orders",
        icon: <BsFillBagFill/>,
        link: "/admin/orders"
    },
    {
        title: "User Accounts",
        icon: <BsFillPersonLinesFill/>,
        link: "/admin/useraccounts"
    },
    {
        title: "Sales",
        icon: <BsGraphUp/>,
        link: "/admin/sales"
    },
    {
        title: "Settings",
        icon: <BsFillGearFill/>,
        link: "/admin/settings"
    }
]