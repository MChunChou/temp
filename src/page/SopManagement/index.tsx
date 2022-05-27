import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";

import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import SopSummary from "./components/Summary";
import testData from "../../test.json";

const sopData = testData.sop;

const TabHeader = (props: {
    from: string;
    to: string;
    iconClassName: string;
}) => {
    return (
        <span>
            From {props.from}
            <span className={`tabs-icon sop ${props.iconClassName}`}>
                <FontAwesomeIcon icon={faLink} />
            </span>
            TO
            <span className="font">{props.to}</span>
        </span>
    );
};

const SopManagement: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const icon = <FontAwesomeIcon icon={faLink} />;

    return (
        <div className="sop">
            <div className="tabs">
                <TabView
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                >
                    <TabPanel
                        header={
                            <TabHeader
                                from="Task"
                                to="SOP"
                                iconClassName="sop"
                            />
                        }
                    >
                        <SopSummary title="SOP Summary Linked By Task" />
                    </TabPanel>
                    <TabPanel
                        header={
                            <TabHeader
                                from="SOP"
                                to="Task"
                                iconClassName="task"
                            />
                        }
                    >
                        <SopSummary title="Task Summary Linked By SOP" />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default SopManagement;
