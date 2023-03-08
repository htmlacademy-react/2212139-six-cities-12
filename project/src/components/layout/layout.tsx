import React, { PropsWithChildren } from 'react';
import Header from '../header/header';

type LayoutProps = PropsWithChildren<{
  className: string;
}>

export default function Layout(props: LayoutProps): JSX.Element {

  const { children, className } = props;

  return(
    <div className={`page ${className}`}>
      <Header/>
      {children}
    </div>

  );
}

