import React, { forwardRef} from 'react';

const Input = forwardRef(({label, ...props}, ref) => (
    <div className="input-group">
      <label>{label}</label>
      <input ref={ref} {...props} />
    </div>
))

export default Input;