/**
 *  Because React Router has remove useBlocker, usePrompt, and Prompt in v6 stable .
 *  This is temporary solution.
 *  According to https://github.com/remix-run/react-router/issues/8139
 */

import type {Blocker, History, Transition} from 'history';
import {ContextType, useCallback, useContext, useEffect} from 'react';
import {Navigator as BaseNavigator, UNSAFE_NavigationContext as NavigationContext} from 'react-router-dom';


interface Navigator {
    block: History['block'];
}

type NavigationContextWithBlock = ContextType<typeof NavigationContext> & { navigator: Navigator };

/**
 * @source https://github.com/remix-run/react-router/commit/256cad70d3fd4500b1abcfea66f3ee622fb90874
 */
 export function useBlocker(blocker: Blocker, when = true) {
    const {navigator} = useContext(NavigationContext) as NavigationContextWithBlock;

    ////////////////////////////////
    //                            //
    //  Listen beforeUnload event //
    //                            //
    ////////////////////////////////
    function handleLeavePage( e: { returnValue: string; }) {
        if (when) {
            const confirmationMessage = '';
            e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
            return confirmationMessage;              // Gecko, WebKit, Chrome <34
        }
    }

    useEffect(() => {
        window.addEventListener('beforeunload', handleLeavePage);
        return () => window.removeEventListener('beforeunload', handleLeavePage);
    }, []);

    useEffect(() => {
        if (!when) {
            return;
        }

        const unblock = navigator.block((tx: Transition) => {
            const autoUnblockingTx = {
                ...tx,
                retry() {
                    unblock();
                    tx.retry();
                },
            };

            blocker(autoUnblockingTx);
        });

        return unblock;
    }, [navigator, blocker, when]);
}

/**
 * @source https://github.com/remix-run/react-router/issues/8139#issuecomment-1021457943
 */
 export function usePrompt(message: string | ((
    location: Transition['location'],
    action: Transition['action'],
) => boolean), when = true) {

    const blocker = useCallback((tx) => {
        let response;
        if (typeof message === 'function') {
            response = message(tx.location, tx.action);
            if (typeof response === 'string') {
                response = window.confirm(response);
            }
        } else {
            response = window.confirm(message);
        }
        if (response) {
            tx.retry();
        }
    }, [message]);

    return useBlocker(blocker, when);
}