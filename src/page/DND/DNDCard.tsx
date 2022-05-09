import React, { useRef } from "react";
import { DragSourceMonitor, useDrag, useDrop } from "react-dnd";
import type { Identifier, XYCoord } from "dnd-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle, faBars } from "@fortawesome/free-solid-svg-icons";
import { ItemTypes } from "./ItemTypes";

const style = {
    border: "1px solid gray",
    borderRadius: "20px",
    padding: "0.5rem 1rem",
    margin: "0.2rem .5rem",
    backgroundColor: "white",
    width: "200px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    cursor: "move",
};

interface DragItem {
    index: number;
    id: string;
    type: string;
}

interface CardProps {
    text: string;
    index: number;
    id: string | number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const Card = ({ id, text, index, moveCard }: CardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop<DragItem>({
        accept: ItemTypes.CARD,
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag, preview] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index };
        },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    return (
        <div ref={ref} style={{ ...style, opacity }}>
            <div>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <span>{text}</span>
            <div
                style={{
                    cursor: "pointer",
                }}
            >
                <FontAwesomeIcon icon={faXmarkCircle} />
            </div>
        </div>
    );
};

export default Card;
