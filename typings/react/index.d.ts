import * as React from '@types/react';

declare module 'react' {
  interface FunctionComponent<P = Record<string, unknown>> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}
