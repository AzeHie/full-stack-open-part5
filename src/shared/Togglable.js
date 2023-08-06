import { forwardRef, useImperativeHandle, useState } from 'react';

const Togglable = forwardRef((props, ref) => {
  Togglable.displayName = 'Togglable';

  const [visible, setVisible] = useState(props.isVisible || false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // to expose toggleVisibility to the parent component using ref. Allows parent to directly call toggleVisibility
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
