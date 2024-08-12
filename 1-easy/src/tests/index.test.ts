import {describe, expect, test, it,vi} from 'vitest';
import request from "supertest";
import { app } from "../index"
import { prismaClient } from '../__mocks__/db';

vi.mock('../db')

describe("POST /sum", () => {
    it("should return the sum of two numbers", async () => {
      prismaClient.request.create.mockResolvedValue({
        id: 1,
        a: 1,
        b: 1,
        answer: 3,
        type:"sum"
      });

        const res = await request(app).post("/sum").send({
          a: 1,
          b: 2
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(3);
      });

      it("should return the sum of two negative numbers", async () => {
        const res = await request(app).post("/sum").send({
          a: -1,
          b: -2
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(-3);
      });

      it("should return the sum of two zero number", async () => {
        const res = await request(app).post("/sum").send({
          a: 0,
          b: 0
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(0);
      });
});


describe("POST /multiply", () => {
  it("should return the multiply of two numbers", async () => {
      const res = await request(app).post("/multiply").send({
        a: 1,
        b: 2
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.answer).toBe(2);
    });

    it("should return the multiply of two negative numbers", async () => {
      const res = await request(app).post("/multiply").send({
        a: -1,
        b: -2
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.answer).toBe(2);
    });

    it("should return the multiply of two zero number", async () => {
      const res = await request(app).post("/multiply").send({
        a: 0,
        b: 0
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.answer).toBe(0);
    });
});