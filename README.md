# React Hook Event

```jsx
import {useEmitter, useEvent} from "react-hook-event";

const ComponentB = () => {
    const emit = useEmitter();
    
    return (
        <button 
          onClick={() => emit('click', 1,2,3,4)}
        >
          Click
        </button>
    )
}

const ComponentA = () => {
    useEvent('click', (...values) => {
        console.log(...values);// => 1, 2, 3, 4
    })

    return <div>
        <ComponentB/>
    </div>
}
```