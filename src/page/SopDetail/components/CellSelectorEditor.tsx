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
const scopes = [
    { name: "dept1", code: "dept1" },
    { name: "dept2", code: "dept2" },
    { name: "dept3", code: "dept3" },
    { name: "de88", code: "de88" },
];

const CellSelector = forwardRef((props: ICellRendererParams, ref) => {
    const [value, setValue] = useState(props.value);
    const refInput = useRef<any>(null);

    useEffect(() => {
        refInput && refInput.current.focus();
    }, []);

    const handleOnChange = (evt: any) => {
        setValue(evt.target.value);
    };

    /* Component Editor Lifecycle methods */
    useImperativeHandle(ref, () => {
        return {
            // the final value to send to the grid, on completion of editing
            getValue() {
                // this simple editor doubles any value entered into the input
                return value;
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
                return false;
            },
        };
    });

    return (
        <select ref={refInput} value={value} onChange={handleOnChange}>
            {scopes.map((scope) => {
                return (
                    <option key={scope.code} value={scope.code}>
                        {scope.name}
                    </option>
                );
            })}
        </select>
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
