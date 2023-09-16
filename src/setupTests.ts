/* eslint-disable @typescript-eslint/no-empty-function */
import '@testing-library/jest-dom'

if (typeof window !== 'undefined') {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      }
    }
}
