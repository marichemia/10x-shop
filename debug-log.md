
# Debug Log — 10X Shop

This document describes real issues encountered during the development of the 10X Shop React application, their causes, and how they were resolved.

## Bug 1 — TypeScript filename casing conflict

**Problem:**
TypeScript reported a TS1261 error related to inconsistent filename capitalization for the Header component.

**Cause:**
The component filename and its imports did not consistently use the same capitalization (`header.tsx` versus `Header.tsx`).

**Solution:**
I corrected the filename and imports to consistently use `Header.tsx` and restarted the TypeScript server.

**Result:**
The filename conflict was resolved.

## Bug 2 — Possible null CartContext value

**Problem:**
TypeScript warned that the cart Context value might be null when accessing cart methods or properties.

**Cause:**
The null check was originally placed inside a `useEffect` callback, so TypeScript could not guarantee that the cart was available in the rest of the component.

**Solution:**
I moved the null check outside `useEffect` and placed it before accessing the cart in the component's rendering logic.

**Result:**
TypeScript could correctly narrow the Context value, and the component could safely access the cart.

## Bug 3 — Syntax error in CartContext interface

**Problem:**
After adding support for selecting product quantities, the application reported a parse error in `CartContext.ts`.

**Cause:**
Two interface properties, `addItem` and `removeItem`, had accidentally been written on the same line without a separator.

**Solution:**
I separated the two property declarations onto different lines.

**Result:**
The syntax error disappeared and the project built successfully.

## Conclusion

These bugs helped me practice reading compiler errors, identifying their causes, and understanding how TypeScript and React work together.

I also learned the importance of consistent file naming, proper Context null checks, and checking the production build after making changes.
