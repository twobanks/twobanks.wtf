import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { Button } from "./ui/button";

describe("Button", () => {
  it("should render a button element with children", () => {
    const html = renderToString(<Button>Salvar</Button>);
    expect(html).toContain("<button");
    expect(html).toContain("Salvar");
  });

  it("should support variant and size props", () => {
    const html = renderToString(
      <Button variant="destructive" size="icon">
        X
      </Button>
    );
    expect(html).toContain("<button");
    expect(html).toContain("X");
  });
});
