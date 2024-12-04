export default function Calculator() {
  return (
    <main className="container ">
      <div className="calculator">
        <form>
          <label>
            <input type="text" className="display" />
          </label>
          <div>
            <input type="button" value="C" className="deleting" />
            <input type="button" value="DE" className="deleting" />
            <input type="button" value="%" className="deleting" />
            <input type="button" value="/" className="operator" />
          </div>
          <div>
            <input type="button" value="7" />
            <input type="button" value="8" />
            <input type="button" value="9" />
            <input type="button" value="*" className="operator" />
          </div>
          <div>
            <input type="button" value="4" />
            <input type="button" value="5" />
            <input type="button" value="6" />
            <input type="button" value="-" className="operator" />
          </div>
          <div>
            <input type="button" value="1" />
            <input type="button" value="2" />
            <input type="button" value="3" />
            <input type="button" value="+" className="operator" />
          </div>
          <div className="last-row">
            <input type="button" value="00" />
            <input type="button" value="0" />
            <input type="button" value="•" />
            <input type="button" value="=" className="operator" />
          </div>
        </form>
      </div>
    </main>
  );
}
