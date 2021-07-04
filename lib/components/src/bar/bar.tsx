import React, { Children, FunctionComponent } from 'react';
import { styled } from '@storybook/theming';

import { ScrollArea } from '../ScrollArea/ScrollArea';

export interface SideProps {
  left?: boolean;
  right?: boolean;
}

const Side = styled.div<SideProps>(
  {
    display: 'flex',
    whiteSpace: 'nowrap',
    flexBasis: 'auto',
    flexShrink: 0,
  },
  ({ left }) =>
    left
      ? {
          '& > *': {
            marginLeft: 15,
          },
        }
      : {},
  ({ right }) =>
    right
      ? {
          marginLeft: 30,
          '& > *': {
            marginRight: 15,
          },
        }
      : {}
);
Side.displayName = 'Side';

export const Bar = styled(({ children, className }) => (
  <ScrollArea horizontal vertical={false} className={className}>
    {children}
  </ScrollArea>
))(
  ({ theme, isTopToolBar }) => ({
    color: theme.barTextColor,
    width: '100%',
    height: isTopToolBar ? theme.barHeight : 40,
    flexShrink: 0,
    overflow: 'auto',
    overflowY: 'hidden',
  }),
  ({ theme, border }) =>
    border
      ? {
          boxShadow: `${theme.appBorderColor}  0 -1px 0 0 inset`,
          background: theme.barBg,
        }
      : {}
);
Bar.displayName = 'Bar';

const BarInner = styled.div<{ bgColor: string; isTopToolBar?: boolean }>(({ bgColor }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  flexWrap: 'nowrap',
  flexShrink: 0,
  backgroundColor: bgColor || '',
  alignItems: 'center',
}));

export interface FlexBarProps {
  border?: boolean;
  isTopToolBar?: boolean;
  children?: any;
  backgroundColor?: string;
}

// Kasun Note: This Applies everywhere

export const FlexBar: FunctionComponent<FlexBarProps> = ({
  children,
  backgroundColor,
  isTopToolBar,
  ...rest
}) => {
  const [left, right] = Children.toArray(children);
  return (
    <Bar isTopToolBar={isTopToolBar} {...rest}>
      <BarInner bgColor={backgroundColor} isTopToolBar={isTopToolBar}>
        <Side left>{left}</Side>
        {right ? <Side right>{right}</Side> : null}
      </BarInner>
    </Bar>
  );
};
FlexBar.displayName = 'FlexBar';
