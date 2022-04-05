import React from 'react';
import classNames from 'classnames';

interface ButtonProps {
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

const Button: React.FC<ButtonProps> = (props:ButtonProps) => {

    const className = classNames('button', props.className);
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

export default Button;
