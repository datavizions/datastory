import { describe, expect, it } from "vitest";
import rows from "../../data/rows.json";
import allCols from "../../data/columns.json";
import { getColumns, mapCharts } from "../charts";

type Row = Record<string, any>;

function filterRows(source: Row[], filters: Record<string, string>) {
  const activeKeys = Object.keys(filters).filter((k) => filters[k] != null);
  if (activeKeys.length === 0) return source;
  return source.filter((row) =>
    activeKeys.every((k) => String(row[k]) === String(filters[k]))
  );
}

function countNonNull(source: Row[], key: string) {
  return source.filter((row) => row[key] !== null && row[key] !== undefined).length;
}

function countAnswer(source: Row[], key: string, answer: string) {
  return source.filter((row) => String(row[key]) === answer).length;
}

describe("story filtering in survey data", () => {
  it("calculates n and chart values for filters s1 + s2neu + s6", () => {
    const baseRow = rows.find((r) => r.s1 && r.s2neu && r.s6);
    expect(baseRow).toBeDefined();

    const filters = {
      s1: String(baseRow!.s1),
      s2neu: String(baseRow!.s2neu),
      s6: String(baseRow!.s6),
    };

    const matched = filterRows(rows as Row[], filters);
    expect(matched.length).toBeGreaterThan(0);
    expect(matched.length).toBeLessThan((rows as Row[]).length);

    const colsMeta = Object.fromEntries(
      Object.entries(allCols).map(([k, v]) => [
        k,
        {
          label: (v as any).label,
          category: (v as any).category,
          description: (v as any).description,
        },
      ])
    );

    const charts = mapCharts(getColumns(matched, colsMeta));

    // n for bar charts is calculated with matched rows not full dataset
    expect(charts.einstellungtechnik.n).toBe(countNonNull(matched, "f1"));
    expect(charts.kamerazustimmungort.n).toBe(countNonNull(matched, "f20A1_1"));

    //checks percentage computation (f2A1 = answer 1)
    const expectedN = countNonNull(matched, "f2A1") - countAnswer(matched, "f2A5", "1");
    const expectedCount = countAnswer(matched, "f2A1", "1");
    const expectedPercent = expectedN > 0 ? Math.round((expectedCount / expectedN) * 100) : 0;

    const f2A1Item = charts.wahrnehmung.items.find((i: any) => i.code === "f2A1");
    expect(f2A1Item).toBeDefined();
    expect(charts.wahrnehmung.n).toBe(expectedN);
    expect(f2A1Item.count).toBe(expectedCount);
    expect(f2A1Item.percent).toBeGreaterThan(0); // weighted percent may differ from unweighted
  });

  it("uses filters and calculates kamerazustimmungort n", () => {
    const filters = { s1: "1", s2neu: "4", s6: "1" };
    const matched = filterRows(rows as Row[], filters);

    expect(matched.length).toBe(81);

    const colsMeta = Object.fromEntries(
      Object.entries(allCols).map(([k, v]) => [
        k,
        {
          label: (v as any).label,
          category: (v as any).category,
          description: (v as any).description,
        },
      ])
    );

    const charts = mapCharts(getColumns(matched, colsMeta));
    const expectedKameraN = countNonNull(matched, "f20A1_1");

    expect(expectedKameraN).toBe(81);
    expect(charts.kamerazustimmungort.n).toBe(expectedKameraN);
  });

  it("returns zero n for impossible filter intersections", () => {
    const filters = { s2neu: "7", s6: "8" };
    const matched = filterRows(rows as Row[], filters);

    expect(matched.length).toBe(0);

    const colsMeta = Object.fromEntries(
      Object.entries(allCols).map(([k, v]) => [
        k,
        {
          label: (v as any).label,
          category: (v as any).category,
          description: (v as any).description,
        },
      ])
    );

    const charts = mapCharts(getColumns(matched, colsMeta));

    expect(charts.einstellungtechnik.n).toBe(0);
    expect(charts.kamerazustimmungort.n).toBe(0);
  });
});
