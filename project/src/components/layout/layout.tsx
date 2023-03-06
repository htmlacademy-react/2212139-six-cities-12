import React, { PropsWithChildren } from 'react';
import Header from '../header/header';

type LayoutProps = PropsWithChildren<{
  className: string;
}>


function Layout(props: LayoutProps): JSX.Element {

  const { children, className } = props;

  return(
    <div className={`page ${className}`}>
      <Header/>
      {children}
    </div>

  );
}

export default Layout;
