const request = require('supertest')
const should = require('should')
const app = require('../../index')
const models = require('../../models/index')

describe('GET /users', () => {
  const users = [{ name: 'alice', email: 'alice@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' },
  { name: 'bek', email: 'bek@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' },
  { name: 'chris', email: 'chris@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' }]
  before(() => models.sequelize.sync({ force: true }))
  before(() => {
    return models.User.bulkCreate(users)
  })

  describe('성공시', () => {
    it('유저 객체를 담은 배열로 응답한다 ', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          // console.log('resbody', res.body)
          res.body.should.be.instanceOf(Array);
          done();
        })
    })

    it('최대 limit 갯수만큼 응답한다', (done) => {
      request(app)
        .get('/users?limit=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(2)
          done()
        })
    })
  })

  describe('실패시', () => {
    it('limit이 숫자형이 아니면 400을 응답한다 ', (done) => {
      request(app)
        .get('/users?limit=two')
        .expect(400)
        .end(done)
    })
  })
})

describe('GET /users/:id', () => {
  const users = [{ name: 'alice', email: 'alice@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' },
  { name: 'bek', email: 'bek@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' },
  { name: 'chris', email: 'chris@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' }]
  before(() => models.sequelize.sync({ force: true }))
  before(() => {
    return models.User.bulkCreate(users)
  })
  describe('성공시', () => {
    it('id가 1인 유저 객체를 반환한다', (done) => {
      request(app)
        .get('/users/1')
        .end((err, res) => {
          // console.log('resbody', res.body)
          res.body.should.have.property('id', 1)
          done()
        })
    })
  })

  describe('실패시', () => {
    it('id가 숫자가 아닐 경우 400으로 응답한다', (done) => {
      request(app)
        .get('/users/one')
        .expect(400)
        .end(done)
    })
    it('id로 유저를 찾을 수 없을 경우 404로 응답한다', (done) => {
      request(app)
        .get('/users/999')
        .expect(404)
        .end(done)
    })
  })
})

describe('DELETE /users/:id', () => {
  const users = [{ name: 'alice', email: 'alice@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' },
  { name: 'bek', email: 'bek@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' },
  { name: 'chris', email: 'chris@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' }]
  before(() => models.sequelize.sync({ force: true }))
  before(() => {
    return models.User.bulkCreate(users)
  })
  describe('성공시', () => {
    it('204를 응답한다', (done) => {
      request(app)
        .delete('/users/1')
        .expect(204)
        .end(done)
    })
  })
  describe('실패시', () => {
    it('id가 숫자가 아닐 경우 400으로 응답한다', (done) => {
      request(app)
        .delete('/users/one')
        .expect(400)
        .end(done)
    })
  })
})

describe('POST /users', () => {
  const users = [{ name: 'alice', email: 'alice@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' },
  { name: 'bek', email: 'bek@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' },
  { name: 'chris', email: 'chris@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' }]
  before(() => models.sequelize.sync({ force: true }))
  before(() => {
    return models.User.bulkCreate(users)
  })
  describe('성공시', () => {
    let body
    before(done => {
      request(app)
        .post('/users')
        .send({ name: 'daniel', email: 'daniel@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' })
        .expect(201)
        .end((err, res) => {
          body = res.body
          done()
        })
    })
    it('생성된 유저 객체를 반환한다', () => {
      // console.log('resbody', body)
      body.should.have.property('id')
    })
    it('입력한 name을 반환한다', () => {
      body.should.have.property('name', 'daniel')
    })
    it('입력한 email을 반환한다', () => {
      body.should.have.property('email', 'daniel@gmail.com')
    })
  })

  describe('실패시', () => {
    it('email 파라미터 누락 시 400을 반환한다', (done) => {
      request(app)
        .post('/users')
        .send({})
        .expect(400)
        .end(done)
    })
    it('email 파라미터 중복 시 409를 반환한다', (done) => {
      request(app)
        .post('/users')
        .send({ email: 'daniel@gmail.com' })
        .expect(409)
        .end(done)
    })
  })
})

describe('PUT /users/:id', () => {
  const users = [{ name: 'alice', email: 'alice@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' },
  { name: 'bek', email: 'bek@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' },
  { name: 'chris', email: 'chris@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' }]
  before(() => models.sequelize.sync({ force: true }))
  before(() => {
    return models.User.bulkCreate(users)
  })
  describe('성공시', () => {
    it('변경된 name, email을 응답한다', (done) => {
      request(app)
        .put('/users/3')
        .send({ name: 'den', email: 'den@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' })
        .end((err, res) => {
          // console.log('resbody', res.body)
          res.body.should.have.property('name', 'den')
          res.body.should.have.property('email', 'den@gmail.com')
          done()
        })
    })
  })
  describe('실패시', () => {
    const email = 'den@gmail.com'
    it('정수가 아닌 id일 경우 400을 응답한다', (done) => {
      request(app)
        .put('/users/one')
        .expect(400)
        .end(done)
    })
    it('email이 없을 경우 400을 응답한다', (done) => {
      request(app)
        .put('/users/1')
        .send({})
        .expect(400)
        .end(done)
    })
    it('없는 유저번호 일 경우 404을 응답한다', (done) => {
      request(app)
        .put('/users/9999')
        .send({ email: 'foo' })
        .expect(404)
        .end(done)
    })
    it('email이 중복일 경우 409을 응답한다', (done) => {
      request(app)
        .put('/users/1')
        .send({ email })
        .expect(409)
        .end(done)
    })

  })
})

describe('DB 초기화한다', () => {
  it('DB 초기화한다', (done) => {
    models.sequelize.sync({ force: true })
    done()
  })
})
