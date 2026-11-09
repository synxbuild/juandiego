"use client";

import type { ComponentType, FocusEvent } from "react";
import { ChevronDown } from "lucide-react";
import { getCountryCallingCode, type Country } from "react-phone-number-input";

type Option = { value?: Country; label: string; divider?: boolean };

type Props = {
  value?: Country;
  onChange: (value?: Country) => void;
  options: Option[];
  iconComponent: ComponentType<{ country?: Country; label: string }>;
  disabled?: boolean;
  readOnly?: boolean;
  onFocus?: (event: FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (event: FocusEvent<HTMLSelectElement>) => void;
};

const INTERNATIONAL = "ZZ";

const callingCode = (country?: Country) => (country ? `+${getCountryCallingCode(country)}` : "+");

/**
 * Country picker for react-phone-number-input: a visible chip (flag + calling code + chevron)
 * over a transparent NATIVE <select>, so phones open their own picker (best touch UX) and
 * keyboard/screen-reader behaviour comes for free.
 */
export function PhoneCountrySelect({ value, onChange, options, iconComponent: Flag, disabled, readOnly, onFocus, onBlur }: Props) {
  const selected = options.find((o) => o.value === value);

  return (
    <div className="eo-country group">
      <span className="eo-country__chip" aria-hidden="true">
        <span className="eo-country__flag">
          <Flag country={value} label={selected?.label ?? ""} />
        </span>
        <span className="tabular-nums">{callingCode(value)}</span>
        <ChevronDown className="size-3.5 text-white/50 transition-transform duration-300 group-focus-within:rotate-180" />
      </span>
      <select
        aria-label={`Código de país: ${selected?.label ?? "Internacional"} ${callingCode(value)}`}
        className="eo-country__select"
        value={value ?? INTERNATIONAL}
        onChange={(e) => onChange(e.target.value === INTERNATIONAL ? undefined : (e.target.value as Country))}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled || readOnly}
      >
        {options.map((o, i) =>
          o.divider ? (
            <option key={`divider-${i}`} disabled>
              ──────────
            </option>
          ) : (
            <option key={o.value ?? INTERNATIONAL} value={o.value ?? INTERNATIONAL}>
              {o.label} {o.value ? `(${callingCode(o.value)})` : ""}
            </option>
          ),
        )}
      </select>
    </div>
  );
}
