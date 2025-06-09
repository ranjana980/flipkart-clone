import {
    Work,
    AccountBalance,
    Power,
    LocalAtm,
    CheckCircle,
    HourglassEmpty,
    CancelPresentation,
    Email,
    People,
    Help,
    CreditCard,
    Cloud,
    Widgets,
    Group,
    AddShoppingCart,
    ListAlt,
    InsertDriveFile,
    Settings,
    Notifications,
    AirplanemodeActiveRounded,
    GetAppSharp,
    Dashboard,
    Payment
} from "@material-ui/icons";

const IconRenderer = ({ iconName, className, style }) => {
    switch (iconName) {
        case "AccountBalance":
            return <AccountBalance className={className} style={style} />;
        case "Work":
            return <Work className={className} style={style} />;
        case "Power":
            return <Power className={className} style={style} />;
        case "LocalAtm":
            return <LocalAtm className={className} style={style} />;
        case "CheckCircle":
            return <CheckCircle className={className} style={style} />;
        case "HourglassEmpty":
            return <HourglassEmpty className={className} style={style} />;
        case "CancelPresentation":
            return <CancelPresentation className={className} style={style} />;
        case "Email":
            return <Email className={className} style={style} />;
        case "People":
            return <People className={className} style={style} />;
        case "CreditCard":
            return <CreditCard className={className} style={style} />;
        case "Help":
            return <Help className={className} style={style} />;
        case "Widgets":
            return <Widgets className={className} style={style} />;
        case "Cloud":
            return <Cloud className={className} style={style} />;
        case "Group":
            return <Group className={className} style={style} />;
        case "AddShoppingCart":
            return <AddShoppingCart className={className} style={style} />;
        case "ListAlt":
            return <ListAlt className={className} style={style} />;
        case "InsertDriveFile":
            return <InsertDriveFile className={className} style={style} />;
        case "Settings":
            return <Settings className={className} style={style} />;
        case "Notifications":
            return <Notifications className={className} style={style} />;
        case "AirplanemodeActiveRounded":
            return <AirplanemodeActiveRounded className={className} style={style} />;
        case "GetAppSharp":
            return <GetAppSharp className={className} style={style} />;
        case "Dashboard":
            return <Dashboard className={className} style={style} />;
        case "Card":
            return <Payment className={className} style={style} />;
        case "Gpay":
            return <Payment className={className} style={style} />;
        case "PhonePay":
            return <Payment className={className} style={style} />;
        case "Paypal":
            return <Payment className={className} style={style} />;
        default:
            return null;
    }
};

export default IconRenderer;