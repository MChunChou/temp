import update from "immutability-helper";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { useDrag, useDrop, useDragLayer, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
// import { Card } from "./Card";
import Card from "./DNDCard";

const style = {
    width: "99vw",
    height: "50vh",
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap",
};

const data = (() => {
    const res = [];
    for (let i = 0; i < 300; i++) {
        res.push({ id: i + 1, text: `dnd_string_${i + 1}` });
    }
    return res;
})();

export interface Item {
    id: number;
    text: string;
}

export interface ContainerState {
    cards: Item[];
}

export const Container = (props: ContainerState) => {
    {
        const [cards, setCards] = useState(data);

        const moveCard = useCallback(
            (dragIndex: number, hoverIndex: number) => {
                setCards((prevCards: Item[]) => {
                    const updateCards = update(prevCards, {
                        $splice: [
                            [dragIndex, 1],
                            [hoverIndex, 0, prevCards[dragIndex] as Item],
                        ],
                    });
                    // const cpCards = [...prevCards];
                    // cpCards.splice(dragIndex, 1);
                    // cpCards.splice(hoverIndex, 0, prevCards[dragIndex]);

                    return updateCards;
                });
            },
            []
        );

        const renderCard = useCallback(
            (card: { id: number; text: string }, index: number) => {
                return (
                    <Card
                        key={card.id}
                        index={index}
                        id={card.id}
                        text={card.text}
                        moveCard={moveCard}
                    />
                );
            },
            []
        );

        return (
            <DndProvider backend={HTML5Backend}>
                <div style={style as React.CSSProperties}>
                    {cards.map((card, i) => renderCard(card, i))}
                </div>
            </DndProvider>
        );
    }
};

export default Container;
