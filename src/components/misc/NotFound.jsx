import React from "react";
import "./misc.css"

export default function NotFound({title, subtitle, body, buttonText, buttonLink}) {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">{title}</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">{subtitle}</h3>

                <p>{body}</p>

                <a href={buttonLink} className="link_404">
                  {buttonText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
