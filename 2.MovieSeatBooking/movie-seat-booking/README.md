## Movie Seat Booking

Display movie choices and seats in a theater to select from in order to purchase tickets

## Project Specifications

- Display UI with movie select, screen, seats, legend & seat info
- User can select a movie/price
- User can select/deselect seats
- User can not select occupied seats
- Number of seats and price will update
- Save seats, movie and price to local storage so that UI is still populated on refresh

Design inspiration from [Dribbble](https://dribbble.com/shots/3628370-Movie-Seat-Booking)

- [appearance](https://css-tricks.com/almanac/properties/a/appearance/)
- [appearance](https://developer.mozilla.org/en-US/docs/Web/CSS/appearance)
- [:nth-of-type()](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-of-type)

Check:

- :nth-last-of-type(2)
- .seat:not(.occupied):hover

:not()
The :not() CSS pseudo-class represents elements that do not match a list of selectors. Since it prevents specific items from being selected, it is known as the negation pseudo-class.

/_ Selects any element that is NOT a paragraph _/
:not(p) {
color: blue;
}

- perspective
  The perspective CSS property determines the distance between the z=0 plane and the user in order to give a 3D-positioned element some perspective.

### Javascript

- [JavaScript HTML DOM Document](https://www.w3schools.com/js/js_htmldom_document.asp)
- querySelector()
  Returns the first matching Element node within the node's subtree. If no matching node is found, null is returned.

  Syntax

  element = document.querySelector(selectors);

  Parameters

  selectors

  A DOMString containing one or more selectors to match. This string must be a valid CSS selector string; if it isn't, a SyntaxError exception is thrown. See Locating DOM elements using selectors for more about selectors and how to manage them.

- querySelectorAll()
  Returns a NodeList containing all matching Element nodes within the node's subtree, or an empty NodeList if no matches are found.
- [Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)

- HTMLSelectElement.selectedIndex
  The HTMLSelectElement.selectedIndex is a long that reflects the index of the first or last selected <option> element, depending on the value of multiple. The value -1 indicates that no element is selected.
