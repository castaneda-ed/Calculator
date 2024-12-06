import { useState } from "react";
import { evaluate } from "mathjs";

export default function Calculator() {
  const [value, setValue] = useState("");

  const handleKey = (e) => {
    if (
      !/[\d\+\-\*\/\.\%\(\)]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Enter" &&
      e.key !== "Escape"
    ) {
      e.preventDefault();
      return;
    } else if (
      (value === "" ||
        ["+", "-", "*", "/", ".", "%"].includes(value.slice(-1))) &&
      e.key === "Enter"
    ) {
      return;
    } else if (value === "" && ["+", "-", "*", "/", ".", "%"].includes(e.key)) {
      e.preventDefault();
      return;
    } else if (e.key === "Enter") {
      e.preventDefault();
      calculateResult();
    } else if (["+", "-", "*", "/", "%", "."].includes(e.key)) {
      e.preventDefault();
      if (!value.endsWith(e.key)) {
        setValue((prev) => prev + e.key);
      }
    } else if (e.key === "Backspace") {
      e.preventDefault();
      setValue((prev) => prev.slice(0, -1));
    } else if (e.key === "Escape") {
      setValue("");
    } else if (e.key === "." && !value.includes(".")) {
      setValue((prev) => prev + e.key);
    }
  };

  // Check if the operator is valid (not consecutive)
  const isValidOperator = (operator) => {
    const lastChar = value.slice(-1);
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

    if (["+", "-", "*", "/", "%"].includes(input)) {
      if (value === "" || !isValidOperator(input)) {
        return;
      }
    }

    if (input === "." && !isValidDecimal()) {
      return;
    }

    setValue((prev) => prev + input);
  };

  const calculateResult = () => {
    try {
      const result = evaluate(value);
      setValue(result.toString());
    } catch (error) {
      setValue("Error");
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
          <div>
            <input
              type="button"
              value="CA"
              className="deleting"
              onClick={(e) => setValue("")}
            />
            <input
              type="button"
              value="DE"
              className="deleting"
              onClick={(e) => setValue(value.slice(0, -1))}
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
