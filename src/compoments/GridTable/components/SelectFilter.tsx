import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';
import { MultiSelect } from 'primereact/multiselect';

import { IDoesFilterPassParams, IFilterParams } from "ag-grid-community";

interface SelectFilterProps extends IFilterParams {
    options: any[]
}

const SelectFilter = forwardRef((props: SelectFilterProps, ref) => {
    const [value, setValue] = useState<any[]>()

    useImperativeHandle(ref, () => {
        return {
            doesFilterPass(params: IDoesFilterPassParams) {
                const field = props.colDef.field
                if (field) {
                    // return (params.data[field] + '').match(value);
                    return value?.some((v) => v === params.data[field]);
                }
                return false
            },
            isFilterActive() { return true },
        }
    });

    useEffect(() => {
        props.filterChangedCallback();
    }, [value])

    useEffect(() => {

    }, [])

    return (<div>
        <input value={value} onChange={(e: any) => { setValue(e.target.value) }}></input>
        <MultiSelect value={value} options={props.options || []} onChange={(e) => { setValue(e.value) }} />
    </div>)
});

export default SelectFilter;
