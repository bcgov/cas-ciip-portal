import React, {useState} from 'react';

const noop = v => v;

const Checkbox = (props: {label; defaultValue?; onCheck?}) => {
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
            margin-left: 0.25rem;
          }
        `}
      </style>
    </div>
  );
};

export default Checkbox;
