import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";

import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import SopSummary from "./../SopSummary";
import SopDetail from "./../SopDetail/SopDetail";
import testData from "../../test.json";
import { useParams, useLocation } from "react-router-dom";
import queryString from "query-string";

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
    const indexMapping = ['task', 'sop'];

    const [activeIndex, setActiveIndex] = useState(0);
    const [summaryData, setSummaryData] = useState<any>();
    const [test, setTest] = useState(false)
    const loaction = useLocation();
    const query = queryString.parseUrl(loaction.search).query;
    const queryValue = query.value;

    useEffect(() => {

        const getSummaryData = () => {
            fetch("http://localhost:8000/sop?by=" + indexMapping[activeIndex])
                .then((res) => res.json())
                .then((res) => {
                    setSummaryData(res.sop);
                });
        }

        getSummaryData()

    }, [activeIndex]);

    console.log('Query', query, queryValue)
    useEffect(() => {
        console.log('test', test)
        if (queryValue) {
            setTest(false)
        } else {
            setTest(true)
        }
    }, [JSON.stringify(query)])

    const getSummaryElement = useCallback(() => {
        return <div className="sop">
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
                        <SopSummary
                            title="SOP Summary Linked By Task"
                            by="task"
                            data={summaryData}
                        />
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
                        <SopSummary
                            title="Task Summary Linked By SOP"
                            by="sop"
                            data={summaryData}

                        />
                    </TabPanel>
                </TabView>
            </div>
        </div>
    }, [activeIndex, summaryData])


    const detailSequence = useMemo(() => {
        if (summaryData && summaryData.length > 0) {
            switch (activeIndex) {
                case 0:
                    return summaryData.map((data: { make: string }) => data.make)
                case 1:
                    return summaryData.map((data: { file: string }) => data.file)
                default: return []
            }
        }
    }, [JSON.stringify(summaryData), activeIndex]);

    const getDetailElement = useCallback(() => {


        return <SopDetail
            // sequence={{ [indexMapping[activeIndex]]: detailSequence }}
            sequence={detailSequence}
            data={summaryData}
            value={test}
        />
    }, [detailSequence, test]);

    const viewElement: React.ReactNode = queryValue ? getDetailElement() : getSummaryElement();

    return (
        <>{viewElement}</>
    );
};

export default SopManagement;
