/**
 * Footer.jsx
 * 
 * The Footer component displaying the copyright and the year
 */
import React from 'react'

export default function Footer(props) {
    /**
     * Footer component
     * 
     * @param props can receive an attribute called "theme" which can be light or dark
     */

    const date = new Date();
    const year = date.getFullYear();    // Get the current year

    return props.theme === "light" 
        ? (
            <footer className="text-center mb-0 text-light footer-light ">
                ⓒ LEX {year}
            </footer>
        ) : (
            <footer className="text-center mb-0 text-light footer-dark " >
                ⓒ LEX {year}
            </footer>
        );
}
