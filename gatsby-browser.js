import React from "react";
import { DefaultLayout } from "./src/layouts";
import { DialogProvider } from "./src/contexts/dialog-context";
import { SearchProvider } from './src/components/search'
import "./src/styles/normalize.css";
import "./src/styles/customize.css";

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <SearchProvider>
      <DialogProvider>
        <DefaultLayout>{element}</DefaultLayout>
      </DialogProvider>
    </SearchProvider>
  );
};

// exports.onRouteUpdate = ({ location }) => scrollToAnchor(location)

// /**
//  *
//  * @desc - a function to jump to the correct scroll position
//  * @param {Object} location -
//  * @param {Number} [mainNavHeight] - the height of any persistent nav -> document.querySelector(`nav`)
//  */
function scrollToAnchor(location, mainNavHeight = 0) {
  const hash = location.hash.replace(/^#(\d)/, '#\\3$1');

  // Check for location so build does not fail
  if (location && location.hash) {
    const item = document.querySelector(`${location.hash}`).offsetTop

    window.scrollTo({
      top: item - mainNavHeight,
      behavior: "smooth",
    })
  }

  return true
}
