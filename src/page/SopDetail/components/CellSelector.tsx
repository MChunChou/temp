import React, {
    forwardRef,
    useState,
    useMemo,
    useRef,
    useEffect,
    useImperativeHandle,
    Component,
    createRef,
} from "react";
import { Dropdown } from "primereact/dropdown";
import { ICellRendererParams } from "ag-grid-community";

const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
];

const CellSelector = forwardRef((props: any, ref) => {
    const [value, setValue] = useState(parseInt(props.value));
    const refInput = useRef<any>(null);

    useEffect(() => {
        // focus on the input
        refInput && refInput.current.focus();
    }, []);

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
        return {
            // the final value to send to the grid, on completion of editing
            getValue() {
                // this simple editor doubles any value entered into the input
                return value * 2;
            },

            // Gets called once before editing starts, to give editor a chance to
            // cancel the editing before it even starts.
            isCancelBeforeStart() {
                return false;
            },

            // Gets called once when editing is finished (eg if Enter is pressed).
            // If you return true, then the result of the edit will be ignored.
            isCancelAfterEnd() {
                // our editor will reject any value greater than 1000
                return value > 1000;
            },
        };
    });

    return (
        <input
            type="number"
            ref={refInput}
            value={value}
            onChange={(event) => setValue(+event.target.value)}
            style={{ width: "100%" }}
        />
    );
});

export default CellSelector;
// export default class DoublingEditor extends Component {
//     inputRef: any;
//     state: { value: number };
//     constructor(props: any) {
//         super(props);

//         this.inputRef = createRef();

//         this.state = {
//             value: 0,
//         };
//     }

//     componentDidMount() {
//         this.inputRef.current.focus();
//     }

//     /* Component Editor Lifecycle methods */
//     // the final value to send to the grid, on completion of editing
//     getValue() {
//         // this simple editor doubles any value entered into the input
//         return this.state.value * 2;
//     }

//     // Gets called once before editing starts, to give editor a chance to
//     // cancel the editing before it even starts.
//     isCancelBeforeStart() {
//         return false;
//     }

//     // Gets called once when editing is finished (eg if Enter is pressed).
//     // If you return true, then the result of the edit will be ignored.
//     isCancelAfterEnd() {
//         // our editor will reject any value greater than 1000
//         return this.state.value > 1000;
//     }

//     render() {
//         return (
//             <input
//                 ref={this.inputRef}
//                 value={this.state.value}
//                 onChange={(event) =>
//                     this.setState({ value: event.target.value })
//                 }
//                 style={{ width: "100%" }}
//             />
//         );
//     }
// }
