import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Styles from "./Landing.module.css";
import Hero from "../../Components/Hero/Hero";
import Services from "../../Components/Services/Services";
import Aboutme from "../../Components/Aboutme/Aboutme.jsx";
import Portfolio from "../../Components/Portfolio/Portfolio";
import ContactUs from "../../Components/ContactUs/ContactUs";

function Landing() {
  return (
    <>
      <header className={Styles.header}>
        <Navbar />
      </header>

      <main className={Styles.main}>
        <section className={Styles.hero} id="home">
          <Hero />
        </section>
        <section className={Styles.services} id="services">
          <Services />
        </section>
        <section className={Styles.about} id="aboutme">
          <Aboutme />
        </section>
        <section className={Styles.portfolio} id="portfolio">
          <Portfolio />
        </section>
        <section className={Styles.contactUs} id="contactUs">
          <ContactUs />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Landing;
