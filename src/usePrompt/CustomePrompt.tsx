import { Location, Action } from "history";
import React, { useEffect, useState } from "react";
import { Prompt, Redirect, useHistory, useLocation } from "react-router-dom";
import Confirm from "../component/Confirm";

type messageFuntionType = (
    location?: Location,
    action?: Action
) => boolean | string;

interface Props {
    when: boolean | undefined;
    message: string | messageFuntionType;
    confirmTemplate?: React.ReactNode;
    // navigate: (path: string) => void;
    // shouldBlockNavigation: (location: Location) => boolean;
}

const CustomePrompt = ({
    when,
    message,
}: // navigate,
// shouldBlockNavigation,
Props) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [lastLocation, setLastLocation] = useState<Location | null>(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const pathname = useLocation().pathname;

    const handleConfirmCancel = () => {
        setOpenConfirm(false);
    };

    const handleConfirmClick = () => {
        setOpenConfirm(false);
        setConfirmedNavigation(true);
    };

    // useEffect(() => {
    //     if (confirmedNavigation && lastLocation) {
    //         // Navigate to the previous blocked location with your navigate function
    //         history.push(lastLocation.pathname);
    //     }
    // }, [confirmedNavigation, lastLocation]);

    const handleNavigation = (location: Location, action: Action): boolean => {
        if (location.pathname === pathname) {
            return false;
        }

        if (!confirmedNavigation) {
            if (typeof message === "string") {
                setConfirmMessage(message);
            } else {
                const msg = message();
                if (typeof msg === "string") {
                    setConfirmMessage(msg);
                } else {
                    return msg;
                }
            }

            setOpenConfirm(true);
            setLastLocation(location);
            return false;
        }
        return true;
    };

    let redirect = null;
    if (confirmedNavigation && lastLocation) {
        redirect = <Redirect to={lastLocation.pathname} />;
    }

    return (
        <>
            <Prompt when={when} message={handleNavigation} />
            <Confirm
                open={openConfirm}
                title={confirmMessage}
                onCancel={handleConfirmCancel}
                onConfirm={handleConfirmClick}
            />

            {redirect}
        </>
    );
};
export default CustomePrompt;
