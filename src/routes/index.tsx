import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import mapSvg from "../assets/sound-map.svg?raw";

export const Route = createFileRoute("/")({ component: Home });

const PHONE_HREF = "tel:+14253904171";
const PHONE_LABEL = "(425) 390-4171";

const SERVICES: { name: string; when: string }[] = [
  { name: "Scheduled walkthroughs, inside and out", when: "Every visit" },
  { name: "Water run, vehicles started, heat and power checked", when: "Every visit" },
  { name: "Security system and cameras confirmed", when: "Every visit" },
  { name: "Mail and packages brought in", when: "Every visit" },
  { name: "A dated, photographed report, sent the same day", when: "Every visit" },
  { name: "Storm prep before the weather, full survey after", when: "As needed" },
  { name: "Vendors met at the door and locked up behind", when: "As needed" },
  { name: "Cleaning and climate set before you land", when: "As needed" },
  { name: "Small things handled in passing", when: "If it takes minutes" },
];

const TOWNS = [
  "Bainbridge Island",
  "Kingston",
  "Port Orchard",
  "Bremerton",
  "Mercer Island",
  "Seattle",
  "Gig Harbor",
  "Poulsbo",
  "Silverdale",
];

function Home() {
  const [sent, setSent] = useState(false);
  const [coord, setCoord] = useState("47.6262° N, 122.5215° W");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll(".rise, .wipe");
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px -6% 0px" },
      );
      els.forEach((el) => io.observe(el));
    }

    const marks = Array.from(document.querySelectorAll<HTMLElement>("[data-co]"));
    const co = document.getElementById("co");
    let current = "";
    function read() {
      const mid = window.innerHeight * 0.45;
      let pick = marks[0];
      for (const mark of marks) {
        if (mark.getBoundingClientRect().top <= mid) pick = mark;
      }
      const next = pick?.getAttribute("data-co") ?? "";
      if (next && next !== current) {
        current = next;
        if (co) co.innerHTML = next;
        setCoord(next.replace(/&deg;/g, "°"));
      }
    }
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read, { passive: true });
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <>
      <header className="hero" id="top" data-co="47.6262° N, 122.5215° W">
        <div className="wrap">
          <div className="lockup rise">
            <span className="far">FAR</span>
            <span className="away">away</span>
          </div>
          <div className="strap rise">
            <span>
              Presence, records
              <br />
              & quiet oversight
            </span>
            <span>
              For names
              <br />
              we never speak
            </span>
          </div>
          <div className="hero-rail rise">
            <div className="facts">
              <span>No contracts</span>
              <span>Flat rates</span>
              <span>Working properties since 2001</span>
            </div>
            <span>Puget Sound</span>
          </div>
        </div>
      </header>

      <section className="on-night discreet" data-co="No address on this page">
        <div className="wrap">
          <p className="eyebrow rise">Discretion</p>
          <h2 className="big wipe">
            The only name on this website is <em>mine</em>.
          </h2>
          <div className="lines rise">
            <p className="lead">Twenty years of keys. Not one story.</p>
            <p>
              No testimonials. No case studies. No addresses. No photographs of anyone’s house —
              including the ones I’m proudest of. If that leaves this page thinner than it might be,
              good.
            </p>
          </div>
          <p className="sign rise">Ask anyone who would know. They won’t tell you either.</p>
        </div>
      </section>

      <section className="on-blush" data-co="Every visit, dated">
        <div className="wrap">
          <p className="eyebrow rise">What I do</p>
          <h2 className="big wipe" style={{ maxWidth: "19ch" }}>
            A house with nobody in it does not <em>sit still</em>.
          </h2>
          <p className="opener rise">
            It cools. It settles. It waits. I walk through it before any of that turns into something
            expensive.
          </p>
          <ul className="plain rise">
            {SERVICES.map((item) => (
              <li key={item.name}>
                {item.name} <span>{item.when}</span>
              </li>
            ))}
          </ul>
          <div className="roster rise">
            <p className="tag">Who comes</p>
            <div>
              <p className="hero-line">
                There are two of us. Me, and one security professional I’ve worked alongside for{" "}
                <b>more than twenty years</b>.
              </p>
              <p>
                No crews. No rotating staff. No subcontractor holding a copy of your key. Nobody is sent
                in my place.
              </p>
            </div>
          </div>
          <p className="aside rise">
            I observe, document, and tell you. I do not hire, authorize, or decide. When something needs
            attention, twenty years of local trades are a phone call away and the choice stays yours.
          </p>
        </div>
      </section>

      <section className="on-rose" data-co="47.6° N, 122.5° W">
        <div className="wrap">
          <p className="eyebrow rise" style={{ textAlign: "center" }}>
            Where
          </p>
          <div className="rise" dangerouslySetInnerHTML={{ __html: mapSvg }} />
          <ul className="towns rise">
            {TOWNS.map((town) => (
              <li key={town}>{town}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-blush" data-co="No term. No notice.">
        <div className="wrap">
          <p className="eyebrow rise">What it costs</p>
          <h2 className="big wipe">
            Published, because
            <br />
            you shouldn’t have
            <br />
            to ask.
          </h2>
          <div className="tiers rise">
            <article className="tier">
              <h3>The Glance</h3>
              <p className="cad">One visit each month</p>
              <p className="amt">$350</p>
              <p className="per">per month</p>
              <ul>
                <li>One exterior visit each month</li>
                <li>Dated report and photographs</li>
                <li>Seasonal checklist review</li>
                <li>Issue flags and trusted referrals</li>
              </ul>
            </article>
            <article className="tier">
              <h3>The Walkthrough</h3>
              <p className="cad">Visits every two weeks</p>
              <p className="amt">$500</p>
              <p className="per">per month</p>
              <ul>
                <li className="carry">Everything in The Glance, plus</li>
                <li>Interior and exterior, every two weeks</li>
                <li>Continuous dated visit log</li>
                <li>Mail, packages, agreed small tasks</li>
                <li>Vendor access and a quarterly summary</li>
              </ul>
            </article>
            <article className="tier">
              <h3>The Watch</h3>
              <p className="cad">Weekly visits</p>
              <p className="amt">$1,150</p>
              <p className="per">per month</p>
              <ul>
                <li className="carry">Everything in The Walkthrough, plus</li>
                <li>Weekly interior and exterior review</li>
                <li>Agreed keyholder arrangements</li>
                <li>Post storm checks included</li>
                <li>Arrival prep and departure checks</li>
              </ul>
            </article>
          </div>
          <div className="singles rise">
            <div>
              <strong>The First Look &nbsp;·&nbsp; $250</strong>
              <p>
                One full walkthrough and a dated report. Credited toward your first month if you
                continue.
              </p>
            </div>
            <div>
              <strong>The Storm Check &nbsp;·&nbsp; $250</strong>
              <p>
                A visit after wind, freezing weather, or an outage. I check, document, and call you with
                what I found.
              </p>
            </div>
          </div>
          <p className="fine rise">
            No contracts. A short written agreement covers scope, confidentiality, key handling, and
            notice.
          </p>
        </div>
      </section>

      <section className="on-night" data-co="Email or text first" id="ask">
        <div className="wrap">
          <div className="meet">
            <figure className="portrait rise">
              <div className="shot">
                <img src="/jen.jpg" alt="Jen Stevens" />
              </div>
              <figcaption>
                Jen
                <br />
                Stevens
                <small>Born here. Still here.</small>
              </figcaption>
            </figure>
            <div className="rise">
              <p className="eyebrow">Start</p>
              <h2 className="big" style={{ maxWidth: "14ch" }}>
                Tell me where
                <br />
                it <em>is</em>.
              </h2>
              {sent ? (
                <p className="opener" style={{ color: "var(--blush)", marginTop: "2rem" }}>
                  Received. I’ll reply by email or text.
                </p>
              ) : (
                <form className="ask" onSubmit={onSubmit}>
                  <label htmlFor="w">The property, and what’s on your mind</label>
                  <textarea
                    id="w"
                    name="property"
                    placeholder="Where it is, how often you’re there, and what you’d want looked at."
                    required
                  />
                  <div className="second">
                    <label htmlFor="r">Email or text number</label>
                    <input
                      id="r"
                      name="reply"
                      placeholder="Preferred email or mobile number"
                      required
                    />
                  </div>
                  <button type="submit">Send it</button>
                </form>
              )}
              <p className="or rise">
                Prefer to text or email first. I reply to both.{" "}
                <a href={PHONE_HREF}>{PHONE_LABEL}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer data-co="Faraway">
        <div className="wrap">
          <div className="foot">
            <span>Faraway · Property Watch · Puget Sound</span>
            <a href={PHONE_HREF}>{PHONE_LABEL}</a>
          </div>
          <p className="credits">
            Bainbridge Island · Bremerton · Silverdale · Poulsbo · Kingston · Port Orchard · Gig Harbor ·
            Mercer Island · Seattle
          </p>
        </div>
      </footer>

      <div className="spine">
        <span className="here">
          <i className="pip" />
          <span className="co" id="co">
            {coord}
          </span>
        </span>
        <a className="tel" href={PHONE_HREF}>
          {PHONE_LABEL}
        </a>
      </div>
    </>
  );
}
