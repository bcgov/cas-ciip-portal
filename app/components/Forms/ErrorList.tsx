import React from 'react';

const ErrorList = (props: {errors?: string[]}) => {
  const {errors = []} = props;
  if (errors.length === 0) {
    return null;
  }

  return (
    <div>
      <ul className="error-detail bs-callout bs-callout-info">
        {errors
          .filter(elem => Boolean(elem))
          .map(error => {
            return (
              <li key={error} className="text-danger">
                {error}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ErrorList;
