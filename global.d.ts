// FIX: Corrected the global type augmentation for JSX.
// By using named imports for React types, we avoid potential conflicts
// with the React namespace that were causing standard HTML elements to be
// unrecognized in JSX. This resolves the widespread JSX property errors.
import { DetailedHTMLProps, HTMLAttributes } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'ion-icon': DetailedHTMLProps<
                HTMLAttributes<HTMLElement> & {
                    name?: string;
                },
                HTMLElement
            >;
        }
    }
}
