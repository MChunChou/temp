import React, {
    useState,
    useEffect,
    useMemo,
    useRef,
    useCallback,
} from "react";
import { Prompt, Redirect, useHistory } from "react-router";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import useTest from "../hook/useTest";

// import { usePrompt } from '../usePrompt/usePrompt';
// import AlertDialog from "./AlertDialog";

import CustomePrompt from "./CustomePrompt";
import useDate from "../hook/useDate";
import DemoPage2 from "./DemoPage2";

const Demo = (props: any) => {
    const [date, setDate] = useState<Date | Date[] | undefined>(undefined);

    const [isSave, setIsSave] = useState(false);
    const [isBlocking, setIsBlocking] = useState(false);
    const [shouldBlock, setShouldBlock] = useState(true);
    const [isRedirect, setIsRedirect] = useState(false);
    const [location, setLocation] = useState<string | null>(null);
    const mydate = useDate({
        startDate: "2022/1/1",
        endDate: "2022/1/8",
        completeDate: null,
        facCd: "0001",
    });

    const testHook = useTest();

    const monthNavigatorTemplate = (e: any) => {
        return (
            <Dropdown
                value={e.value}
                options={e.options}
                onChange={(event) =>
                    e.onChange(event.originalEvent, event.value)
                }
                style={{ lineHeight: 1 }}
            />
        );
    };

    const yearNavigatorTemplate = (e: any) => {
        return (
            <Dropdown
                value={e.value}
                options={e.options}
                onChange={(event) =>
                    e.onChange(event.originalEvent, event.value)
                }
                className="ml-2"
                style={{ lineHeight: 1 }}
            />
        );
    };

    const [selectedCities1, setSelectedCities1] = useState(null);

    console.log(mydate);
    return (
        <div className="filter">
            {/* <button
                onClick={() => {
                    setIsSave(!isSave);
                }}
            >
                ChangeSave
            </button>
            <div>This is Filter : {isSave ? "T" : "F"}</div> */}
            {/* <Prompt
                when={isSave}
                message={(location, action) => {
                    console.log(location, action);
                    // need confirm
                    setIsBlocking(true);
                    setLocation(location.pathname);
                    if (shouldBlock) {
                        return false;
                    }

                    // return true or false
                    // return type is string meaning confirm
                    return true;
                }}
            />
            {isRedirect && location ? <Redirect to={location} /> : <></>} */}
            {/* <div>next Location :: {location}</div> */}

            {/* <CustomePrompt
                when={isSave}
                // Navigate function
                navigate={(path: any) => history.push(path)}
                // Use as "message" prop of Prompt of React-Router
                shouldBlockNavigation={(location: { pathname: string }) => {
                    // This case it blocks the navigation when:
                    // 1. the login form is dirty, and
                    // 2. the user is going to 'sign-up' scene.
                    //    (Just an example, in real case you might
                    //     need to block all location regarding this case)
                    if (isSave) {
                        return true;
                    }
                    return false;
                }}
            /> */}
            {/* <CustomePrompt
                when={isSave}
                message={"Are you sure leave without saving?"}
            /> */}

            {/* <Calendar
                id="navigatorstemplate"
                value={date}
                onChange={(e) => setDate(e.value)}
                onBlur={() => {
                    setDate(new Date("2022/4/6"));
                }}
                monthNavigator
                yearNavigator
                yearRange="2010:2030"
                monthNavigatorTemplate={monthNavigatorTemplate}
                yearNavigatorTemplate={yearNavigatorTemplate}
            /> */}

            {/* <DemoPage2 mydate={mydate} /> */}

            {/* <div>
                <div>{testHook.d}</div>
                <input
                    onChange={(e) => {
                        testHook.set(e.target.value);
                    }}
                    value={testHook.d}
                ></input>
                <button
                    onClick={() => {
                        testHook.get();
                    }}
                >
                    Get TesT
                </button>
            </div> */}
            <DemoPage2 mydate={mydate} />
        </div>
    );
};

export default Demo;
