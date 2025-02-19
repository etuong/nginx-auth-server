import React from "react";

const About = () => {
  return (
    <div className="row">
      <div className="leftcolumn">
        {Array(2)
          .fill(null)
          .map((_, i) => (
            <div className="card" key={i}>
              <h2>TITLE HEADING</h2>
              <h5>
                Title description, {["Dec 7", "Sep 2"][i]} 2017
              </h5>
              <div className="fakeimg" style={{ height: "200px" }}>
                Image
              </div>
              <p>Some text..</p>
              <p>
                Sunt in culpa qui officia deserunt mollit anim id est laborum
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco.
              </p>
            </div>
          ))}
      </div>

      <div className="rightcolumn">
        <div className="card">
          <h2>About Me</h2>

          <div className="fakeimg" style={{ height: "100px" }}>
            Image
          </div>
          <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
        </div>

        <div className="card">
          <h3>Popular Post</h3>
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <div className="fakeimg" key={i}>
                <p>Image</p>
              </div>
            ))}
        </div>

        <div className="card">
          <h3>Follow Me</h3>
          <p>Some text..</p>
        </div>

      </div>
      <div className="footer">
        <h2>Footer</h2>
      </div>
    </div>
  );
};

export default About;
