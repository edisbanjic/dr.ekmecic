"use client";

import dynamic from "next/dynamic";

/**
 * Code-split BookingForm: the form's chunk stays out of the route's first-load
 * JS and streams in after hydration (home) or on first modal open (subpages).
 * The placeholder holds the card's approximate height so nothing shifts.
 */
const BookingFormLazy = dynamic(() => import("@/components/BookingForm"), {
  loading: () => <div aria-busy="true" style={{ minHeight: "420px" }} />,
});

export default BookingFormLazy;
