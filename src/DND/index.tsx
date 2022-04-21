import update from "immutability-helper";
import type { FC } from "react";
import { useCallback, useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card } from "./Card";

const style = {
    width: 400,
};

const data = (() => {
    const res = [];
    for (let i = 0; i < 200; i++) {
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

export const Container: FC = () => {
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
                <div style={style}>
                    {cards.map((card, i) => renderCard(card, i))}
                </div>
            </DndProvider>
        );
    }
};

export default Container;
