import { useState } from "react";
import { evaluate } from "mathjs";

export default function Calculator() {
  const [value, setValue] = useState("");
  const [intermediateResult, setIntermediateResult] = useState("");

  const handleKey = (e) => {
    e.preventDefault();
    if (
      !/[\d\+\-\*\/\.\%\(\)]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Enter" &&
      e.key !== "Escape"
    ) {
      e.preventDefault();
      return;
    }
    if (value === "" && ["+", "*", "/", "%"].includes(e.key)) {
      e.preventDefault();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      calculateResult();
      setIntermediateResult("");
      return;
    }
    if (["+", "-", "*", "/", "%", "."].includes(e.key)) {
      e.preventDefault();
      if (!value.endsWith(e.key)) {
        const updatedValue = value + e.key;
        setValue(updatedValue);
        calculateIntermediateResult(updatedValue);
      }
      return;
    }

    if (e.key === "Backspace") {
      e.preventDefault();
      const updatedValue = value.slice(0, -1);
      setValue(updatedValue);
      calculateIntermediateResult(updatedValue);
      return;
    }

    if (e.key === "Escape") {
      setValue("");
      setIntermediateResult("");
      return;
    }

    if (e.key === "." && !value.includes(".")) {
      setValue((prev) => prev + e.key);
    }

    const updatedValue = value + e.key;

    setValue(updatedValue);
    calculateIntermediateResult(updatedValue);
    return;
  };

  // Check if the operator is valid (not consecutive)
  const isValidOperator = (operator) => {
    const lastChar = value.toString().slice(-1);
    if (["+", "-", "*", "/", "%"].includes(lastChar)) {
      return false;
    }
    return true;
  };

  // Helper function to check if it's valid to add a decimal point
  const isValidDecimal = () => {
    const lastSegment = value.split(/[\+\-\*\/\%]/).pop();
    const hasDecimalAlready = lastSegment && lastSegment.includes(".");

    return !hasDecimalAlready;
  };

  const handleCalculatorClick = (e) => {
    const input = e.target.value;

    if (input === "CA") {
      setValue("");
      setIntermediateResult("");
      return;
    }

    if (input === "DE") {
      const updatedValue = value.toString().slice(0, -1);
      setValue(updatedValue);
      calculateIntermediateResult(updatedValue);
      return;
    }

    if (
      ["+", "*", "/", "%"].includes(input) &&
      (value === "" || !isValidOperator(input))
    ) {
      return;
    }

    if (input === "." && !isValidDecimal()) {
      return;
    }

    const updatedValue = value.toString() + input;
    setValue(updatedValue);
    calculateIntermediateResult(updatedValue);
  };

  const calculateResult = () => {
    try {
      const result = evaluate(value);
      setValue(parseFloat(result.toFixed(10).toString()));
      setIntermediateResult("");
    } catch (error) {
      setValue("Error");
    }
  };

  const calculateIntermediateResult = (expression) => {
    try {
      if (
        expression &&
        !["+", "-", "*", "/", "%", "."].includes(expression.slice(-1))
      ) {
        const result = evaluate(expression);
        setIntermediateResult(parseFloat(result.toFixed(10).toString()));
      } else {
        setIntermediateResult("");
      }
    } catch {
      setIntermediateResult("");
    }
  };

  return (
    <main className="container ">
      <div className="calculator">
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            <input
              type="text"
              className="display"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKey}
            />
          </label>
          <div className="intermediate-display">
            <p>{intermediateResult || "..."}</p>
          </div>
          <div className="calculator-buttons">
            <input
              type="button"
              value="CA"
              className="deleting"
              onClick={(e) => {
                setValue("");
                setIntermediateResult("");
              }}
            />
            <input
              type="button"
              value="DE"
              className="deleting"
              onClick={(e) => {
                const updatedValue = value.slice(0, -1);
                setValue(updatedValue);
                calculateIntermediateResult(updatedValue);
              }}
            />
            <input
              type="button"
              value="%"
              className="deleting"
              onClick={handleCalculatorClick}
            />
            <input
              type="button"
              value="/"
              className="operator"
              onClick={handleCalculatorClick}
            />
          </div>
          <div>
            {["7", "8", "9"].map((num) => (
              <input
                key={num}
                type="button"
                value={num}
                className="numbers"
                onClick={handleCalculatorClick}
              />
            ))}
            <input
              type="button"
              value="*"
              className="operator"
              onClick={handleCalculatorClick}
            />
          </div>
          <div>
            {["4", "5", "6"].map((num) => (
              <input
                key={num}
                type="button"
                value={num}
                className="numbers"
                onClick={handleCalculatorClick}
              />
            ))}
            <input
              type="button"
              value="-"
              className="operator"
              onClick={handleCalculatorClick}
            />
          </div>
          <div>
            {["1", "2", "3"].map((num) => (
              <input
                key={num}
                type="button"
                value={num}
                className="numbers"
                onClick={handleCalculatorClick}
              />
            ))}
            <input
              type="button"
              value="+"
              className="operator"
              onClick={handleCalculatorClick}
            />
          </div>
          <div className="last-row">
            <input
              type="button"
              value="00"
              className="numbers"
              onClick={handleCalculatorClick}
            />
            <input
              type="button"
              value="0"
              className="numbers"
              onClick={handleCalculatorClick}
            />
            <input
              type="button"
              value="."
              style={{ fontSize: "19px" }}
              className="numbers"
              onClick={handleCalculatorClick}
            />
            <input
              type="button"
              value="="
              className="operator"
              onClick={calculateResult}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
