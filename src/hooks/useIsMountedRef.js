// See: https://www.debuggr.io/react-update-unmounted-component/
import {useEffect, useRef} from 'react';
export default function useIsMountedRef() {
    const isMountedRef = useRef(null);
    useEffect(() => {
        isMountedRef.current = true;
        return () => isMountedRef.current = false;
    });
    return isMountedRef;
}