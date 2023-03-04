import React, { PropsWithChildren } from 'react';
import Header from '../header/header';

type LayoutProps = PropsWithChildren<{
  classNameProps: string;
}>


function Layout(props: LayoutProps): JSX.Element {

  const { children, classNameProps } = props;

  return(
    <div className={`page ${classNameProps}`}>
      <Header/>
      {children}
    </div>

  );
}

export default Layout;
