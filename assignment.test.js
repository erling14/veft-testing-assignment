import mongoose from 'mongoose';
import MongodbMemoryServer from 'mongodb-memory-server';
import request from 'supertest';
import * as addModule from './add';
import {add} from './add';
import {throws} from './throws';
import {loop} from './loop';
import app from './index';

jest.mock('./errorFunction');

mongoose.Promise = global.Promise;
let mongoServer;
let server;

beforeAll(() => {
  return new Promise((resolve, reject) => {
    mongoServer = new MongodbMemoryServer();
    mongoServer.getConnectionString().then(mongoUri => {
      mongoose.connect(mongoUri, {
        useMongoClient: true
      })
      .then(db => {
        server = app(db);
        resolve();
      });
    });
  });
});

describe('utils', () => {
  test('add 1 + 1 equals 2', () => {
    expect(add(1, 1)).toBe(2);
  });

  test('add null + 1 equals 2', () => {
    expect(add(null, 1)).toBe(1);
  });

  test('add undefined + undefined equals NaN', () => {
    expect(Number.isNaN(add())).toBe(true);
  });

  test('add 1 + 1 equals 2', () => {
    expect(throws(4)).toBe(4);
  });

  test('loop gets called 2 times', () => {
    const spy = spyOn(addModule, 'add');
    loop(2);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  test('expected 200 status code response', () => {
    request(server)
    .get('/')
    .expect(200);
  });
});