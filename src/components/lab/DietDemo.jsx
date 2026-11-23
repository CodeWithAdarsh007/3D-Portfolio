import { useMemo, useState } from "react";
import Icon from "../common/Icon";
import { PLACEHOLDER_LABEL } from "../../data/portfolioContent";

const ACTIVITY = [
  { value: 1.2, label: "Sedentary (little exercise)" },
  { value: 1.375, label: "Light (1–3 days/week)" },
  { value: 1.55, label: "Moderate (3–5 days/week)" },
  { value: 1.725, label: "Active (6–7 days/week)" },
  { value: 1.9, label: "Very active (hard training)" },
];

const SAMPLE_MEALS = {
  light: ["Oats with milk & banana", "Dal, rice & seasonal vegetables", "Curd, nuts & fruit"],
  moderate: ["Eggs/paneer toast + fruit", "Chicken/rajma curry, roti & salad", "Milk, peanut butter & oats"],
  higher: ["Poha + eggs + banana shake", "Rice, dal, chicken/soy & veggies", "Paneer wrap, curd & dry fruits"],
};

function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: "Underweight", tone: "text-warning" };
  if (bmi < 25) return { label: "Normal range", tone: "text-leaf-ink" };
  if (bmi < 30) return { label: "Overweight", tone: "text-warning" };
  return { label: "Obese range", tone: "text-danger" };
}

function Slider({ label, unit, min, max, value, onChange }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-xs font-bold text-ink">
        {label}
        <span className="font-mono text-[11px] text-blue-ink">
          {value} {unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--blue)]"
      />
    </label>
  );
}

/**
 * Honest interactive demo: BMI/BMR/TDEE are real deterministic formulas.
 * The meal suggestion is static sample data — no trained model is involved.
 */
export default function DietDemo() {
  const [age, setAge] = useState(21);
  const [sex, setSex] = useState("male");
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [activity, setActivity] = useState(1.55);

  const results = useMemo(() => {
    const h = height / 100;
    const bmi = weight / (h * h);
    const bmr = 10 * weight + 6.25 * height - 5 * age + (sex === "male" ? 5 : -161);
    const tdee = bmr * activity;
    const band = tdee < 1800 ? "light" : tdee < 2400 ? "moderate" : "higher";
    return { bmi, bmr, tdee, meals: SAMPLE_MEALS[band], category: bmiCategory(bmi) };
  }, [age, sex, height, weight, activity]);

  return (
    <div className="rounded-2xl border border-line bg-raised p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-blue-ink">
          Interactive demo · deterministic formulas · no trained model
        </p>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <Slider label="Age" unit="yrs" min={20} max={80} value={age} onChange={setAge} />
          <Slider label="Height" unit="cm" min={120} max={220} value={height} onChange={setHeight} />
          <Slider label="Weight" unit="kg" min={30} max={150} value={weight} onChange={setWeight} />
          <div className="grid gap-3 min-[420px]:grid-cols-2">
            <label className="block text-xs font-bold text-ink">
              Sex (formula input)
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="mt-2 w-full rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink focus:border-blue"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label className="block text-xs font-bold text-ink">
              Activity level
              <select
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="mt-2 w-full rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink focus:border-blue"
              >
                {ACTIVITY.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
            {[
              { label: "BMI", value: results.bmi.toFixed(1), sub: results.category.label, tone: results.category.tone },
              { label: "BMR", value: Math.round(results.bmr), sub: "kcal at rest" },
              { label: "TDEE", value: Math.round(results.tdee), sub: "kcal / day" },
            ].map((r) => (
              <div key={r.label} className="rounded-xl border border-line bg-surface px-1 py-3 text-center sm:p-3.5">
                <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-muted">{r.label}</p>
                <p className="mt-1 text-lg sm:text-2xl font-extrabold text-ink">{r.value}</p>
                <p className={`mt-0.5 text-[10px] font-bold ${r.tone || "text-muted"}`}>{r.sub}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-dashed border-sunshine/60 bg-surface p-4">
            <p className="flex items-center gap-2 text-xs font-extrabold text-ink">
              <Icon name="Salad" size={14} className="text-leaf-ink" />
              Illustrative meals for the selected activity profile
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {results.meals.map((meal) => (
                <li key={meal} className="flex items-start gap-2 text-xs leading-relaxed text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sunshine" />
                  {meal}
                </li>
              ))}
            </ul>
            <p className="placeholder-label mt-3 inline-block !text-[8.5px]">{PLACEHOLDER_LABEL} · sample meal data</p>
          </div>

          <p className="flex items-start gap-2 text-[10.5px] leading-relaxed text-muted">
            <Icon name="Info" size={13} className="mt-0.5 shrink-0 text-blue-ink" />
            BMI uses weight divided by height squared. BMR uses the Mifflin–St Jeor equation, and TDEE multiplies that estimate by the selected activity factor.
            Meal suggestions are static sample data, not model output, and nothing here is medical
            advice. The related project explores ML integration on top of these foundations.
          </p>
        </div>
      </div>
    </div>
  );
}