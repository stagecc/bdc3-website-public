import React from "react";
import { DefaultLayout } from "./src/layouts";
import "./src/styles/normalize.css";
import "./src/styles/customize.css";

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <DefaultLayout>{element}</DefaultLayout>;
};

export function onRenderBody({ setPostBodyComponents }) {
  setPostBodyComponents([
    <script
      key="0"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
                window.fwSettings={
                    'widget_id': 60000000998
                };
                !function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}() 
            `
      }}
    />,
    <script
      key="1"
      type="text/javascript"
      src="https://widget.freshworks.com/widgets/60000000998.js"
      async
      defer
    ></script>
  ]);
}
