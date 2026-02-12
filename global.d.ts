// FIX: Import React to bring its types into scope and enable JSX for standard HTML elements.
// This resolves numerous "Property 'div' does not exist on type 'JSX.IntrinsicElements'"
// errors throughout the application by ensuring TypeScript's JSX support is correctly initialized.
import * as React from 'react';

// This file extends the JSX namespace to include the 'ion-icon' custom element,
// which is used for icons throughout the application. The import above makes this
// file a module, which is required for global augmentation.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
        },
        HTMLElement
      >;
    }
  }
}
