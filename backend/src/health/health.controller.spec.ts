import { describe, expect, it, vi } from "vitest";
import { HealthController } from "./health.controller.js";

describe("HealthController", () => {
  it("returns the status from HealthService.check()", async () => {
    const status = {
      status: "ok",
      application: "DevFlix API",
      database: "connected",
      timestamp: "2026-01-01T00:00:00.000Z",
    };
    const healthService = { check: vi.fn().mockResolvedValue(status) };
    const controller = new HealthController(healthService);

    await expect(controller.check()).resolves.toEqual(status);
    expect(healthService.check).toHaveBeenCalledOnce();
  });
});

// Teste unitario: o controller recebe um mock e nao acessa o banco de dados.
// Com Jest, use jest.fn() no lugar de vi.fn() e rode o spec no runner do Jest.
