import React from "react";
import "./misc.css"

export default function NotFound({title, subtitle, body, buttonText, buttonLink}) {
  return (
    <section class="page_404">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div class="four_zero_four_bg">
                <h1 class="text-center ">{title}</h1>
              </div>

              <div class="contant_box_404">
                <h3 class="h2">{subtitle}</h3>

                <p>{body}</p>

                <a href={buttonLink} class="link_404">
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
