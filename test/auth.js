const chai = require('chai');
const chaiHttp = require('chai-http');
const apiUrl = 'http://127.0.0.1:3001';
chai.use(chaiHttp);
var expect = chai.expect;

describe('Auth', () => {
    describe('POST /login', () => {
        it('User not exist', (done) => {
            chai.request(apiUrl)
                .post('/login')
                .send({
                    username: 'notexist@qq.com',
                    password: '123456',
                })
                .end((error, response) => {
                    expect(response).to.have.status(422);
                    done();
                });
        });
    });
    describe('POST /register', () => {
        it('Register Successfully', (done) => {
            chai.request(apiUrl)
                .post('/register')
                .send({
                    username: 'notexist@qq.com',
                    password: '123456',
                })
                .end((error, response) => {
                    expect(response).to.have.status(200);
                    done();
                });
        });
    });
    describe('POST /login', () => {
        it('Login Successfully', (done) => {
            chai.request(apiUrl)
                .post('/register')
                .send({
                    username: 'notexist@qq.com',
                    password: '123456',
                })
                .end((error, response) => {
                    expect(response).to.have.status(200);
                    done();
                });
        });
    });
    
});
