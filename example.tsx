// import { createEvent, createStore } from 'effector';
// import { createView } from '../src/index';

// type Props = {
//   value: string;
//   label?: string;
//   tooltip: string;
//   onChange: (value: string) => void;
// };

// const Input = ({ label, value, onChange, tooltip }: Props) => (
//   <div>
//     {label && <label>{label}</label>}

//     <input
//       value={value}
//       onChange={event => onChange(event.currentTarget.value)}
//     />

//     <span>{tooltip}</span>
//   </div>
// );

// const $value = createStore('');
// const changed = createEvent<string>();

// const Password = createView<Props>()
//   .defaultProps({})
//   .displayName('dsa')
//   .props({
//     onChange: changed,
//     value: $value,
//     kek: 123123
//   })
//   .map(props => ({
//     test: 123
//   }))
//   .view(({ value, onChange, label, tooltip, kek }) => (
//     <Input tooltip={tooltip} value={value} label={label} onChange={onChange} />
//   ));

// const Email = createView(Input)
//   .props({ value: $value, onChange: changed })
//   .view();

