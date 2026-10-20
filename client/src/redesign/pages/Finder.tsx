import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { AmazonButton } from "../components/ProductCard";
import { Disclosure } from "../components/SiteLayout";
import { featuredProducts } from "../data/catalog";
import { getRecommendations, type Recommendation } from "../data/comparisons";
import { productImages } from "../data/site";

type FinderSelections = {
  goal: string;
  phone: string;
  charging: string;
};

type FinderKey = keyof FinderSelections;

type FinderQuestion = {
  key: FinderKey;
  label: string;
  helper: string;
  options: { value: string; title: string; detail: string }[];
};

const questions: FinderQuestion[] = [
  {
    key: "goal",
    label: "What do you want this tech to do most?",
    helper: "Choose the job you expect it to do most often.",
    options: [
      {
        value: "everyday",
        title: "Everyday wearable",
        detail: "A practical mix of daily information and wearable basics.",
      },
      {
        value: "fitness",
        title: "Fitness and GPS",
        detail: "A watch for activity sessions and location-aware movement.",
      },
      {
        value: "sleep",
        title: "Sleep and recovery",
        detail: "Overnight context with less emphasis on a screen.",
      },
      {
        value: "audio",
        title: "Audio and commutes",
        detail: "Listening, noise control, and moving between environments.",
      },
    ],
  },
  {
    key: "phone",
    label: "Which phone do you use?",
    helper: "Compatibility is a practical filter, not a minor detail.",
    options: [
      {
        value: "iphone",
        title: "iPhone",
        detail: "Keep iPhone-compatible options in the running.",
      },
      {
        value: "android",
        title: "Android",
        detail: "Show options that work with Android.",
      },
    ],
  },
  {
    key: "charging",
    label: "How do you feel about charging?",
    helper:
      "Battery estimates are only useful when their stated conditions suit your routine.",
    options: [
      {
        value: "daily",
        title: "Daily charging is fine",
        detail: "A regular top-up can fit into my routine.",
      },
      {
        value: "less-often",
        title: "I would rather charge less often",
        detail: "Longer stated battery modes matter to me.",
      },
    ],
  },
];

const initialSelections: FinderSelections = {
  goal: "",
  phone: "",
  charging: "",
};

function resultCompareLink(
  recommendations: Recommendation[],
  productId: string
) {
  const otherId = recommendations.find(
    recommendation => recommendation.productId !== productId
  )?.productId;
  return `/compare?products=${otherId ? `${productId},${otherId}` : productId}`;
}

export default function Finder() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] =
    useState<FinderSelections>(initialSelections);
  const question = questions[step - 1];
  const recommendations =
    step === 4 ? getRecommendations(selections).slice(0, 2) : [];

  const updateSelection = (key: FinderKey, value: string) => {
    setSelections(current => ({ ...current, [key]: value }));
  };

  const startOver = () => {
    setSelections(initialSelections);
    setStep(1);
  };

  return (
    <div className="wrap finder-page">
      <div className="finder-intro">
        <span className="eyebrow">A CLEARER STARTING POINT</span>
        <h1>Find the wearable that fits your routine.</h1>
        <p>
          Answer three practical questions. This is a transparent decision aid,
          not an AI score or a substitute for checking manufacturer details.
        </p>
      </div>

      {step <= 3 && question ? (
        <section
          className="finder-flow"
          aria-labelledby="finder-question-title"
        >
          <div className="finder-progress" aria-label={`Question ${step} of 3`}>
            <span>Step {step} of 3</span>
            <ol>
              {questions.map((item, index) => (
                <li
                  key={item.key}
                  className={
                    index + 1 <= step
                      ? "finder-progress-complete"
                      : "finder-progress-pending"
                  }
                  aria-current={index + 1 === step ? "step" : undefined}
                >
                  <span>{index + 1}</span>
                  <small>{item.key}</small>
                </li>
              ))}
            </ol>
          </div>

          <fieldset className="finder-question">
            <legend id="finder-question-title">{question.label}</legend>
            <p>{question.helper}</p>
            <div className="finder-options">
              {question.options.map(option => (
                <label
                  className={`finder-option ${selections[question.key] === option.value ? "finder-option-selected" : ""}`}
                  key={option.value}
                >
                  <input
                    type="radio"
                    name={question.key}
                    value={option.value}
                    checked={selections[question.key] === option.value}
                    onChange={() => updateSelection(question.key, option.value)}
                  />
                  <span className="finder-option-copy">
                    <strong>{option.title}</strong>
                    <small>{option.detail}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="finder-actions">
            {step > 1 ? (
              <button
                type="button"
                className="button secondary"
                onClick={() => setStep(current => current - 1)}
              >
                <ArrowLeft size={16} />
                Back
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              className="button primary"
              disabled={!selections[question.key]}
              onClick={() => setStep(current => current + 1)}
            >
              {step === 3 ? "See my shortlist" : "Continue"}
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      ) : (
        <section
          className="finder-results"
          aria-labelledby="finder-results-title"
        >
          <div className="finder-results-heading">
            <div>
              <span className="eyebrow">YOUR SHORTLIST</span>
              <h2 id="finder-results-title">A practical place to start.</h2>
              <p>
                These picks use your stated goal, phone, and charging
                preference. They are ordered for that combination, not given a
                percentage score.
              </p>
            </div>
            <button
              type="button"
              className="button secondary"
              onClick={startOver}
            >
              <RotateCcw size={16} />
              Start over
            </button>
          </div>

          <div className="finder-answer-summary" aria-label="Your answers">
            <span>
              <strong>Goal:</strong> {selections.goal.replace("-", " ")}
            </span>
            <span>
              <strong>Phone:</strong>{" "}
              {selections.phone === "iphone" ? "iPhone" : "Android"}
            </span>
            <span>
              <strong>Charging:</strong>{" "}
              {selections.charging === "less-often"
                ? "less often"
                : "daily is fine"}
            </span>
          </div>

          <div className="finder-result-list">
            {recommendations.map((recommendation, index) => {
              const product = featuredProducts.find(
                item => item.id === recommendation.productId
              );
              if (!product) return null;
              return (
                <article className="finder-result" key={product.id}>
                  <div className="finder-result-image">
                    <img
                      src={productImages[product.id] || product.image}
                      alt={product.name}
                      width="360"
                      height="360"
                    />
                  </div>
                  <div className="finder-result-copy">
                    <span className="finder-result-label">
                      {index === 0
                        ? "PRIMARY MATCH"
                        : "ALTERNATIVE TO CONSIDER"}
                    </span>
                    <span className="eyebrow">{product.brand}</span>
                    <h3>{product.name}</h3>
                    <p>{recommendation.reason}</p>
                    <dl className="finder-result-facts">
                      <div>
                        <dt>Phone</dt>
                        <dd>{product.compatibility}</dd>
                      </div>
                      <div>
                        <dt>Battery</dt>
                        <dd>{product.battery}</dd>
                      </div>
                    </dl>
                    <div className="finder-result-links">
                      <a
                        className="button secondary"
                        href={`/product/${product.id}`}
                      >
                        Read review <ArrowRight size={16} />
                      </a>
                      <a
                        className="finder-compare-link"
                        href={resultCompareLink(recommendations, product.id)}
                      >
                        Compare options <ArrowRight size={15} />
                      </a>
                    </div>
                    <AmazonButton product={product} className="finder-amazon" />
                    <span className="paid-link">
                      Paid link · Check current price and availability on
                      Amazon.
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
          {selections.goal === "sleep" && (
            <p className="finder-wellness-note">
              Sleep and heart-rate features provide wellness information, not
              medical advice or diagnosis. Contact a qualified professional
              about symptoms or concerns.
            </p>
          )}
          <Disclosure compact />
        </section>
      )}
    </div>
  );
}
