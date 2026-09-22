// Template tag mínima para gerar HTML em tempo de build.
// Interpolações são escapadas por padrão; use raw() para HTML confiável.

const RAW = Symbol('raw');

export const raw = (value) => ({ [RAW]: true, value: String(value) });

const escape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const serialize = (value) => {
  if (value == null || value === false) return '';
  if (Array.isArray(value)) return value.map(serialize).join('');
  if (typeof value === 'object' && value[RAW]) return value.value;
  return escape(value);
};

export const html = (strings, ...values) =>
  raw(strings.reduce((out, str, i) => out + str + (i < values.length ? serialize(values[i]) : ''), ''));

export const toString = (fragment) => serialize(fragment);
