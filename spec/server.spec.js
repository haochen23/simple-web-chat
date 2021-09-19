const { response } = require("express");
const request = require("request");

describe("calc", () => {
  it("should multiply 2 by 2", () => {
    expect(2 * 2).toBe(4);
  });
});

describe("get messages", () => {
  it("should return 200 OK", (done) => {
    request.get("http://localhost:3000/messages", (err, res) => {
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  it("should return a list that not empty", (done) => {
    request.get("http://localhost:3000/messages", (err, res) => {
      expect(JSON.parse(res.body).length).toBeGreaterThan(0);
      done();
    });
  });
});

describe("get messages from user", () => {
  it("should return 200 OK", (done) => {
    request.get("http://localhost:3000/messages/eric", (err, res) => {
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  it("name should be eric", () => {
    request.get("http://localhost:3000/messages/eric", (err, res) => {
      if (JSON.parse(res.body).length == 0)
        expect(JSON.parse(res.body)[0].name).toBe(undefined);
      else expect(JSON.parse(res.body)[0].name).toEqual("eric");
      done();
    });
  });
});
