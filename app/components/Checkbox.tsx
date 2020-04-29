import React, {useState} from 'react';

// Define noop function to set default value for function type props
// and avoid Typescript compiler's warning to have 'onChange' prop for checkbox inputs by default
const noop = (v) => v;

interface Props {
  label: string;
  defaultValue?: boolean;
  onCheck?: (checked: boolean) => void;
}

const Checkbox: React.FunctionComponent<Props> = (props) => {
  const {label, defaultValue = false, onCheck = noop} = props;

  const [checked, setChecked] = useState(defaultValue);

  const handleClick = () => {
    const newState = !checked;
    setChecked(newState);
    onCheck(newState);
  };

  return (
    <div onClick={handleClick}>
      <input type="checkbox" checked={checked} onChange={noop} />
      <label>{label}</label>
      <style jsx>
        {`
          div {
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            -o-user-select: none;
            user-select: none;
          }

          label {
            margin-top: 4px;
            margin-left: 10px;
            position: relative;
            top: 2px;
          }
        `}
      </style>
    </div>
  );
};

export default Checkbox;
