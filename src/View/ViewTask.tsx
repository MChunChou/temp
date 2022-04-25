import React, { useContext, useEffect, useState } from "react";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as dh from "../utils/date-helper";

const TIMEOUT = 0;

const isEditAble = (dataSource: any, isAutoSync: any) => {
    return true;
};

const ViewTask: React.FC<any> = (props: any) => {
    // console.log(props);
    const { value, dataSource, isAutoSync } = props;
    const {
        actlCompleteDate,
        isActlEdieable,
        isPlanEditable,
        keyStaget,
        planDateEnd,
        planDateStart,
        taskId,
        open,
        remark,
    } = value;

    const [start, setStart] = useState(
        planDateStart ? new Date(planDateStart) : null
    );
    const [end, setEnd] = useState(planDateEnd ? new Date(planDateEnd) : null);
    const [complete, setComplete] = useState(
        actlCompleteDate ? new Date(actlCompleteDate) : null
    );
    const [stateRemark, setStateRemark] = useState(remark);

    useEffect(() => {
        console.log(start, end, complete, stateRemark);
    }, [start, end, complete, stateRemark]);

    const collapseAll = (callback: () => void) => {
        const destoryNode: any[] = [];

        const dataFields = props.api
            .getColumnDefs()
            .filter((column: any) => {
                return column.cellRendererParams;
            })
            .map((column: any) => {
                return column.field;
            });

        props.api.forEachNode((node: any, idx: any) => {
            const data = node.data;

            dataFields.forEach((field: any) => {
                if (!data.fullWitdth) {
                    data[field].open = false;
                }
            });

            node.setData({ ...data });
            if (node.data.fullWitdth) {
                destoryNode.push(node.data);
            }
        });

        if (destoryNode.length > 0) {
            /* TIMEOUT 是用來測試 時間內連續點擊會造成的結果 */
            setTimeout(() => {
                props.api.applyTransactionAsync(
                    {
                        remove: destoryNode,
                    },
                    callback
                );
            }, TIMEOUT);
        } else {
            setTimeout(() => {
                callback();
            }, TIMEOUT);
        }
    };

    const getExpandData = () => {
        return {
            fullWitdth: true,
            planDateStart: start,
            planDateEnd: end,
            actlCompleteDate: complete,
            remark: stateRemark,
            isEditAbled: isEditAble(dataSource, isAutoSync),
            setStart,
            setEnd,
            setComplete,
            setRemark: setStateRemark,
        };
    };

    const handleClick = () => {
        collapseAll(() => {
            if (!open) {
                props.setValue({ ...props.getValue(), open: true });
                props.api.applyTransactionAsync({
                    add: [getExpandData()],
                    addIndex: props.node.rowIndex + 1,
                });
            }
        });
    };

    const renderCellDate = () => {
        const endClassName = ["planDate end"];
        const completeClassName = ["planDate"];

        if (dh.isDelay(end, complete)) {
            endClassName.push("has-delay");
        }

        if (dh.isActualDate(start, end, complete)) {
            completeClassName.push("has-ac-date");
        }

        if (isEditAble(dataSource, isAutoSync) && complete) {
            completeClassName.push("has-empty");
        }

        const endNode = end && dh.format(new Date(end), "yyyy/mm/dd");
        const startNode =
            complete && dh.format(new Date(complete), "yyyy/mm/dd");

        return (
            <div className="cellDate">
                <div className={endClassName.join(" ")}>{endNode}</div>
                <div className={completeClassName.join(" ")}>{startNode}</div>
            </div>
        );
    };

    return (
        <div className="cell" onClick={handleClick}>
            <div className="cellDetailSwitch">
                {renderCellDate()}
                {props.value.open ? (
                    <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                    <FontAwesomeIcon icon={faAngleDown} />
                )}
            </div>
        </div>
    );
};

export default ViewTask;
