import React from 'react';
import classNames from 'classnames';

interface ConfirmProps {
    className? : string
}

/**
 *  React Component for showing confirm
 *  @component
 *  @example
 *     <Confirm
 *          message="Make sure You want to leave"
 *          accept={()=>{ do something if confirm}}
 *          reject={()=>{ do something if cancel}}
 *      />
 */

const Confirm: React.FC<ConfirmProps> = (props:ConfirmProps) => {

    const className = classNames('confirm', props.className);
    return (
        <div className={className}>
            <div className='head'></div>
            <div className='content'></div>
            <div className='footer'>
                <div></div>
                <div>
                    <button>Sure</button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;
