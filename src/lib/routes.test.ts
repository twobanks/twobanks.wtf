import { describe, expect, it } from "vitest";
import { ROUTES, type RouteMap } from "./routes";

describe("routes", () => {
  describe("ROUTES map", () => {
    it("should have ROOT route", () => {
      expect(ROUTES.ROOT).toBe("/");
    });

    it("should have LOGIN route", () => {
      expect(ROUTES.LOGIN).toBe("/login");
    });

    describe("ADMIN routes", () => {
      it("should have ADMIN.ROOT", () => {
        expect(ROUTES.ADMIN.ROOT).toBe("/admin");
      });

      it("should have ADMIN.CARTEIRA", () => {
        expect(ROUTES.ADMIN.CARTEIRA).toBe("/admin/carteira");
      });

      it("should have ADMIN.CARTEIRA_CARTOES", () => {
        expect(ROUTES.ADMIN.CARTEIRA_CARTOES).toBe("/admin/carteira/cartoes");
      });

      it("should generate ADMIN.CARTEIRA_CARTAO with id", () => {
        expect(ROUTES.ADMIN.CARTEIRA_CARTAO("123")).toBe("/admin/carteira/cartoes/123");
        expect(ROUTES.ADMIN.CARTEIRA_CARTAO(456)).toBe("/admin/carteira/cartoes/456");
      });

      it("should have ADMIN.CARTEIRA_CATEGORIAS", () => {
        expect(ROUTES.ADMIN.CARTEIRA_CATEGORIAS).toBe("/admin/carteira/categorias");
      });

      it("should have ADMIN.CARTEIRA_CONTAS", () => {
        expect(ROUTES.ADMIN.CARTEIRA_CONTAS).toBe("/admin/carteira/contas");
      });

      it("should have ADMIN.CARTEIRA_FATURAS", () => {
        expect(ROUTES.ADMIN.CARTEIRA_FATURAS).toBe("/admin/carteira/faturas");
      });

      it("should have ADMIN.CARTEIRA_INVESTIMENTOS", () => {
        expect(ROUTES.ADMIN.CARTEIRA_INVESTIMENTOS).toBe("/admin/carteira/investimentos");
      });

      it("should have ADMIN.CARTEIRA_LISTAS", () => {
        expect(ROUTES.ADMIN.CARTEIRA_LISTAS).toBe("/admin/carteira/listas");
      });

      it("should have ADMIN.CARTEIRA_RECORRENTES", () => {
        expect(ROUTES.ADMIN.CARTEIRA_RECORRENTES).toBe("/admin/carteira/recorrentes");
      });

      it("should have ADMIN.BLOG", () => {
        expect(ROUTES.ADMIN.BLOG).toBe("/admin/blog");
      });

      it("should generate ADMIN.BLOG_POST with id", () => {
        expect(ROUTES.ADMIN.BLOG_POST("abc")).toBe("/admin/blog/abc");
      });

      it("should have ADMIN.BLOG_NOVO", () => {
        expect(ROUTES.ADMIN.BLOG_NOVO).toBe("/admin/blog/novo");
      });

      it("should have ADMIN.LIVROS", () => {
        expect(ROUTES.ADMIN.LIVROS).toBe("/admin/livros");
      });

      it("should generate ADMIN.LIVRO with id", () => {
        expect(ROUTES.ADMIN.LIVRO("xyz")).toBe("/admin/livros/xyz");
      });

      it("should have ADMIN.LIVROS_NOVO", () => {
        expect(ROUTES.ADMIN.LIVROS_NOVO).toBe("/admin/livros/novo");
      });

      it("should have ADMIN.TAREFAS", () => {
        expect(ROUTES.ADMIN.TAREFAS).toBe("/admin/tarefas");
      });

      it("should have ADMIN.CONTRATOS", () => {
        expect(ROUTES.ADMIN.CONTRATOS).toBe("/admin/contratos");
      });
    });
  });

  describe("RouteMap type", () => {
    it("should be assignable from ROUTES", () => {
      const routes: RouteMap = ROUTES;
      expect(routes.ROOT).toBe("/");
    });
  });
});