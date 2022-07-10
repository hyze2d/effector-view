# effector-view

Library to provide a factory for your components with effector mapping and separation between component render and data mapping with automatically mapped types so you dont need to duplicate props definition.

## Component Factory

To construct your components there's a `createView` function.

```tsx
// Let's take counter model as an example

const increment = createEvent();

const decrement = createEvent();

const reset = createEvent();

const $count = createStore(0);

$count
    .on(increment, state => state + 1)

    .on(decrement, state => state - 1)

    .reset(reset);


// And component which uses that model

const clearClicked = createEvent();

const decrementClicked = createEvent();

const incrementClicked = createEvent();

sample({
    clock: clearClicked,

    target: reset
});

sample({
    clock: decrementClicked,

    target: decrement
});

sample({
    clock: incrementClicked,

    target: increment
});


type CounterProps = {
    title: string;
}


// Counter props 
const Counter = createView<CounterProps>()
    .units({
        count: $count,
        
        onClearClick: clearClicked,
        
        onDecrementClick: decrementClicked,
        
        onIncrementClick: incrementClicked,
    })
    

    // props include mapped units
    .map((props) => {
        // this function called during render so you can use react hooks there if you want
        // for example if you're using some library that provides functionality via hooks you can call it there to keep render function pure and have separate map function to map needed props
        const somethingFromMap = useSomeLibraryHookForExample(); 
        
        return {
            somethingFromMap
        }
    })
    
    // Accepts object with a useStoreMap configurations
    // NOTE: keys accept a function which gets current mapped props as parameter ( you can explictly type it if you want ) 
    
    .select({
        isDisabled: {
            store: $someStore,

            keys: ({ id }) => [id],
            
            fn: (someStoreState, [id]) => !!someStoreState[id],
        }
    })

    // Called right after the map(or instead of there's no map function provided)
    // You can ignore it if you dont care about separating side effects from props map function 
    .effect((props) => {
        useEffect(() => {
            // ...
        }, [])
    })

    // Works the same way as units but to provide any static values you wanna move outside of component (for example some array with data you dont wanna put in the same file with component because it's too big)
    .static({
        // gonna appear in .view props as well
        categories
    })

    // There are many cases where you need to do something on component mount even tho it's better to move that logic from mount to somewhere else ( for example history change if you're getting some data on page mount )
    .enter(anyCallableFunction)
    
    // basically unfolds useEffect with cleanup function with enter/exit called in body of passed callback or in body of cleanup function
    .exit(anyCallableFunction)
    
    // Sets display name of resulting component
    .displayName('Counter')

    // default props for a resulting component
    .defaultProps({
        // gonna make title prop optional
        title: 'Some Default Title'
    })

    // if called, resulting component gonna have Memo version pre-made so you can use it as <Counter.Memo />
    .memo()

    // render function props are types according to what you mapped before
    .view(({ title, somethingFromMap, count, onClearClicked, onDecrementClick, onIncrementClick }) => (
        <div className='counter'>
            <h1 className='title'>{title}</h1>

            <div>
                <button className='decrement' onClick={onDecrementClick}></button>
                
                <div className='count'>{count}</div>
                
                <button className='increment' onClick={onIncrementClick}></button>
            </div>

            <div>
                <button className='clear' onClick={onClearClick}>Clear</button>
            </div>

            <div>
                {somethingFromMap.someProp}
            </div>
        </div>
    ));


// Somewhere in other component
<Counter title='Title goes there' />

// Resulting component has: 

// Value passed into the corresponding builder function calls 
Counter.units
Counter.map 
Counter.effect
Counter.static
Counter.enter
Counter.exit
Counter.select
Counter.displayName

// Memorized component if .memo() was called 
Counter.Memo 

// Component w/o any bindings and props typed according what it accepts inside the .view call so you can use it w/o bindings if you want or inside the tests so you can test everything separatly 
Counter.View

// Sometimes you need certain external props only to use them inside the .map or .effect functions (for example id which gonna be used inside the useStoreMap to select certain element) 
// According to types it's still gonna require those props even if you dont use them inside the render
// If you sure they're not used inside the render function ( sadly there's not way to check it automatically ), you can provide "dependency" kind of props inside the second type argument for createView<UserProps, 'id'>();
<User id={id} user={user} />

```

## Component decorator

If you have an existing component you want to bind to certain effector units you can use `createView` as well.

```tsx

const UserCounter = createView(Counter)

// all those methods work the same but require you to provide only fields which present in passed component prop type.
.units()

.map()

.defaultProps()

.static()

// those methods are also work for the decoration usage

.enter()

.exit()

.memo()

.displayName()

// you dont pass anything else there
.view();

// all props you mapped via decoration gonna be omitted from require props so type-wise it's gonna be accurate of what component needs
<UserCounter />

```




