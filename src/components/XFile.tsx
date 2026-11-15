import { XMark, VaultRings } from "./Art";

/** The mystery block: a classified file with a rotating vault ring. Reveals nothing about X itself. */
export function XFile() {
  return (
    <div className="xfile">
      <div className="xvault">
        <VaultRings className="xvault-rings" />
        <XMark glitch className="xvault-x" />
      </div>
      <div className="xdoc">
        <p className="xdoc-head"><span>FILE: X</span><span>STATUS: CLASSIFIED</span></p>
        <div className="redact" aria-hidden="true"><i style={{ width: "92%" }} /><i style={{ width: "78%" }} /><i style={{ width: "86%" }} /><i style={{ width: "54%" }} /></div>
        <p className="xdoc-note">Contents withheld. Revealed to every team at once, halfway through the build.</p>
        <span className="stamp">CLASSIFIED</span>
      </div>
    </div>
  );
}
