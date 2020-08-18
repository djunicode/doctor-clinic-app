import { useRef } from 'react';

const useWillMount = (func) => {
    const willMount = useRef(true);
    if (willMount.current) {
      func();
    }
    willMount.current = false;
}

export default useWillMount;