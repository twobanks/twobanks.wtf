import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { Card } from "./ui/card";

describe("Card", () => {
  it("should render a card container", () => {
    const html = renderToString(<Card>Conteúdo do card</Card>);
    expect(html).toContain('data-slot="card"');
    expect(html).toContain("Conteúdo do card");
  });

  it("should accept className and surface props", () => {
    const html = renderToString(
      <Card surface={2} className="custom-card">
        Card personalizado
      </Card>
    );
    expect(html).toContain("data-surface=\"2\"");
    expect(html).toContain("custom-card");
    expect(html).toContain("Card personalizado");
  });
});
