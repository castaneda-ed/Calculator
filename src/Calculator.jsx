import { useState } from "react";

export default function Calculator() {
  const [value, setValue] = useState("");
  return (
    <main className="container ">
      <div className="calculator">
        <form>
          <label>
            <input type="text" className="display" value={value} />
          </label>
          <div>
            <input
              type="button"
              value="AC"
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
              onClick={(e) => setValue(value + e.target.value)}
            />
            <input
              type="button"
              value="/"
              className="operator"
              onClick={(e) => setValue(value + e.target.value)}
            />
          </div>
          <div>
            <input
              type="button"
              value="7"
              className="numbers"
              onClick={(e) => setValue(value + e.target.value)}
            />
            <input
              type="button"
              value="8"
              className="numbers"
              onClick={(e) => setValue(value + e.target.value)}
            />
            <input
              type="button"
              value="9"
              className="numbers"
              onClick={(e) => setValue(value + e.target.value)}
            />
            <input
              type="button"
              value="*"
              className="operator"
              onClick={(e) => setValue(value + e.target.value)}
            />
          </div>
          <div>
            <input
              type="button"
              value="4"
              className="numbers"
              onClick={(e) => setValue(value + e.target.value)}
            />
            <input
              type="button"
              value="5"
              className="numbers"
              onClick={(e) => setValue(value + e.target.value)}
            />
            <input
              type="button"
              value="6"
              className="numbers"
              onClick={(e) => setValue(value + e.target.value)}
            />
            <input
              type="button"
              value="-"
              className="operator"
              onClick={(e) => setValue(value + e.target.value)}
            />
          </div>
          <div>
            <input
              type="button"
              value="1"
              className="numbers"
              onClick={(e) => setValue(value + e.target.value)}
            />
            <input
              type="button"
              value="2"
              className="numbers"
              onClick={(e) => setValue(value + e.target.value)}
            />
            <input
              type="button"
              value="3"
              className="numbers"
              onClick={(e) => setValue(value + e.target.value)}
            />
            <input
              type="button"
              value="+"
              className="operator"
              onClick={(e) => setValue(value + e.target.value)}
            />
          </div>
          <div className="last-row">
            <input
              type="button"
              value="00"
              className="numbers"
              onClick={(e) => setValue(value + e.target.value)}
            />
            <input
              type="button"
              value="0"
              className="numbers"
              onClick={(e) => setValue(value + e.target.value)}
            />
            <input
              type="button"
              value="."
              style={{ fontSize: "19px" }}
              className="numbers"
              onClick={(e) => setValue(value + e.target.value)}
            />
            <input
              type="button"
              value="="
              className="operator"
              onClick={(e) => setValue(eval(value))}
            />
          </div>
        </form>
      </div>
    </main>
  );
}
