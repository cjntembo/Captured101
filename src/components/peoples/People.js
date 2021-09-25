import React from "react";
import "./People.css"

export const People = () => (
  <section className="peoples">
    <h3 className="people__firstName">DeeDee</h3>
    <h4 className="people__lastName">Jones</h4>
    <div className="people__relationship">Sibling</div>
    <div className="people__notes">Lives Far Away</div>
    <div className="people__date">09-03-1973</div>
    <div className="people__dateType">Birthday</div>
  </section>
)