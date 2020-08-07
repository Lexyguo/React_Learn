import React from 'react';
export default props => {
  console.log(props);
  const { routes, location } = props;
  const title = location.pathname;
  return <div>{props.children}</div>;
};
