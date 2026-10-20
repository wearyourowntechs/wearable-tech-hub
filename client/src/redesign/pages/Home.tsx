import { ArrowRight, ArrowUpRight, Check, Headphones, Moon, Scale, ShieldCheck, Watch } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { CategoryIcon, Disclosure } from "../components/SiteLayout";
import { featuredProducts, guides } from "../data/catalog";
import { primaryCategories, productImages } from "../data/site";
import { comparisonStories } from "../data/comparisons";

export default function Home() {
  return <>
    <section className="decision-hero">
      <div className="wrap decision-hero-layout">
        <div className="decision-hero-copy">
          <span className="eyebrow"><span className="status-dot" /> SMALL TECH. A CLEARER CHOICE.</span>
          <h1>Know your options.<br /><span>Wear your best fit.</span></h1>
          <p>Watch, ring, or something different? Compare the trade-offs, understand what matters, and choose a wearable for the way you actually live.</p>
          <div className="hero-buttons"><a className="button primary" href="/find-your-fit">Find my wearable <ArrowRight size={18} /></a><a className="button secondary" href="/comparisons"><Scale size={17} /> Compare your options</a></div>
          <div className="decision-trust"><ShieldCheck size={15} /><span>Clear sources. Honest trade-offs. No made-up scores.</span></div>
        </div>
        <a className="hero-matchup" href="/comparisons/apple-watch-vs-garmin">
          <div className="matchup-top"><span className="eyebrow">TWO WATCHES. DIFFERENT PRIORITIES.</span><span className="matchup-tag">START HERE</span></div>
          <div className="matchup-images"><div><img src={productImages["apple-watch-series-10"]} alt="Apple Watch Series 10" width="260" height="270" fetchPriority="high" /><span>Apple Watch Series 10</span></div><span className="vs-label">vs.</span><div><img src={productImages["garmin-venu-3"]} alt="Garmin Venu 3" width="260" height="270" fetchPriority="high" /><span>Garmin Venu 3</span></div></div>
          <div className="matchup-answer"><div><strong>Phone-first or fitness-first?</strong><p>Start with compatibility, charging, and your daily routine.</p></div><span className="round-arrow"><ArrowUpRight size={21} /></span></div>
        </a>
      </div>
    </section>

    <section className="intent-bar wrap" aria-label="Start with your main priority">
      <span className="intent-label">What matters to you?</span>
      <a href="/comparisons/sleep-tracking-watch-vs-ring"><Moon size={19} /> Sleep & recovery <ArrowUpRight size={14} /></a>
      <a href="/comparisons/apple-watch-vs-garmin"><Watch size={19} /> Everyday & fitness <ArrowUpRight size={14} /></a>
      <a href="/category/hearables"><Headphones size={19} /> Wearable audio <ArrowUpRight size={14} /></a>
      <a href="/find-your-fit"><Scale size={19} /> Help me decide <ArrowRight size={14} /></a>
    </section>

    <section className="featured-section wrap">
      <div className="section-heading"><div><span className="eyebrow">START WITH A REASON, NOT A RATING</span><h2>Four picks. Four different fits.</h2><p>Our specification-based shortlist—not a claim that one device wins at everything.</p></div><a className="inline-link" href="/reviews">Browse reviews & models <ArrowRight size={17} /></a></div>
      <Disclosure compact /><div className="product-grid">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </section>

    <section className="home-decision-table wrap">
      <div className="section-heading"><div><span className="eyebrow">THE SHORT ANSWER</span><h2>If this is you, start here.</h2></div><a className="inline-link" href="/compare">Compare the details <ArrowRight size={16} /></a></div>
      <div className="decision-table-scroll"><table><caption className="sr-only">Wearable recommendations by everyday priority</caption><thead><tr><th scope="col">Your priority</th><th scope="col">A starting point</th><th scope="col">Why it fits</th><th scope="col">The trade-off</th><th scope="col"><span className="sr-only">Read the review</span></th></tr></thead><tbody>
        <tr><th scope="row">My iPhone, on my wrist</th><td><strong>Apple Watch Series 10</strong></td><td>A display-led daily companion with GPS and sleep tracking.</td><td>iPhone required; plan around regular charging.</td><td><a href="/product/apple-watch-series-10" aria-label="Read the Apple Watch Series 10 review"><ArrowUpRight size={17} /></a></td></tr>
        <tr><th scope="row">More days between charges</th><td><strong>Garmin Venu 3</strong></td><td>Longer manufacturer battery estimates and fitness-focused features.</td><td>Always-on display, GPS, and music shorten runtime.</td><td><a href="/product/garmin-venu-3" aria-label="Read the Garmin Venu 3 review"><ArrowUpRight size={17} /></a></td></tr>
        <tr><th scope="row">A screen-free sleep wearable</th><td><strong>Oura Ring 4</strong></td><td>Discreet overnight tracking in a ring form factor.</td><td>Full features need membership; careful sizing matters.</td><td><a href="/product/oura-ring-4" aria-label="Read the Oura Ring 4 review"><ArrowUpRight size={17} /></a></td></tr>
        <tr><th scope="row">My everyday soundtrack</th><td><strong>Sony LinkBuds Fit</strong></td><td>Noise cancellation and a fit-oriented audio design.</td><td>Not a health tracker; runtime figures include a charging case.</td><td><a href="/product/sony-linkbuds-fit" aria-label="Read the Sony LinkBuds Fit review"><ArrowUpRight size={17} /></a></td></tr>
      </tbody></table></div>
      <p className="decision-table-note">Editorial fits based on cited manufacturer information—not comparative lab testing. Exact variants, ongoing costs, and feature availability matter.</p>
    </section>

    <section className="home-comparisons wrap">
      <div className="section-heading"><div><span className="eyebrow">SIDE BY SIDE. PLAIN ENGLISH.</span><h2>Get to the deciding difference.</h2><p>Useful answers to the questions a product grid can’t answer.</p></div><a className="inline-link" href="/comparisons">All comparisons <ArrowRight size={16} /></a></div>
      <div className="comparison-story-list">{comparisonStories.map((story, index) => <a className="home-story-row" key={story.id} href={`/comparisons/${story.id}`}><span className="story-number">0{index + 1}</span><div><span className="eyebrow">{story.kicker}</span><h3>{story.title}</h3><p>{story.description}</p></div><span className="round-arrow"><ArrowUpRight size={20} /></span></a>)}</div>
    </section>

    <section className="finder-invitation wrap"><div className="finder-invitation-copy"><span className="eyebrow">YOUR PRIORITIES FIRST</span><h2>A short shortlist.<br />A more confident choice.</h2><p>Tell us your phone, main goal, and charging preference. We’ll explain which of our sourced picks fits—and where it doesn’t.</p><a className="button primary" href="/find-your-fit">Find my fit <ArrowRight size={17} /></a><span className="finder-privacy"><Check size={13} /> No email. No account. Just clearer options.</span></div><div className="finder-invitation-visual" aria-hidden="true"><span className="finder-orbit" /><img src={productImages["oura-ring-4"]} alt="" width="300" height="300" loading="lazy" /><div><Moon size={19} /><span>YOUR LIFE.<strong>YOUR CRITERIA.</strong></span></div></div></section>

    <section className="category-section wrap"><div className="category-heading"><h2>A wearable for every direction.</h2><a className="inline-link" href="/reviews">Explore the full catalog <ArrowRight size={15} /></a></div><div className="category-row">{primaryCategories.map((category) => <a className="category-item" key={category.id} href={`/category/${category.id}`}><span className="category-symbol"><CategoryIcon type={category.icon} size={25} /></span><span>{category.name}<small>{category.subtitle}</small></span><ArrowUpRight size={15} /></a>)}</div></section>
    <section className="journal-section wrap"><div className="section-heading"><div><span className="eyebrow">BEFORE YOU BUY</span><h2>The details worth knowing.</h2></div><a className="inline-link" href="/buying-guides">All buying guides <ArrowRight size={16} /></a></div><div className="guide-list">{guides.map((guide, index) => <a className="guide-row" key={guide.id} href={`/guides/${guide.id}`}><span className="guide-number">0{index + 1}</span><div><span className="eyebrow">{guide.eyebrow}</span><h3>{guide.title}</h3><p>{guide.description}</p></div><span className="round-arrow"><ArrowUpRight size={20} /></span></a>)}</div></section>
    <section className="closing-band"><div className="wrap"><span className="eyebrow">LESS GUESSWORK. MORE YOU.</span><h2>Make your next wearable make sense.</h2><a className="button citron" href="/comparisons">Compare before you choose <ArrowUpRight size={18} /></a></div><span className="closing-orbit" aria-hidden="true" /></section>
  </>;
}
