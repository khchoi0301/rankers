const request = require('supertest')
const should = require('should')
const app = require('../../index')
const models = require('../../models/index')


const services = [{ service: 'wedding city', location: 'seoul', profile: 'img1.jpg' },
{ service: 'Wester Bennevis', location: 'seoul', profile: 'img2.jpg' },
{ service: 'apelgamo', location: 'seoul', profile: 'img3.jpg' }]


describe('GET /service', () => {

  before(() => models.sequelize.sync({ force: true }))
  before(() => models.Service.bulkCreate(services))

  describe('성공시', () => {
    it('유저 객체를 담은 배열로 응답한다 ', (done) => {
      request(app)
        .get('/service')
        .end((err, res) => {
          // console.log('spec', res.body)
          res.body.should.be.instanceOf(Array);
          done();
        })
    })

    it('최대 limit 갯수만큼 응답한다', (done) => {
      request(app)
        .get('/service?limit=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(2)
          done()
        })
    })
  })

  describe('실패시', () => {
    it('limit이 숫자형이 아니면 400을 응답한다 ', (done) => {
      request(app)
        .get('/service?limit=two')
        .expect(400)
        .end(done)
    })
  })
})

describe('GET /service/:id', () => {

  describe('성공시', () => {
    it('id가 1인 객체를 반환한다', (done) => {
      request(app)
        .get('/service/1')
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
        .get('/service/one')
        .expect(400)
        .end(done)
    })
    it('id로 유저를 찾을 수 없을 경우 404로 응답한다', (done) => {
      request(app)
        .get('/service/999')
        .expect(404)
        .end(done)
    })
  })
})

describe('DELETE /service/:id', () => {

  describe('성공시', () => {
    it('204를 응답한다', (done) => {
      request(app)
        .delete('/service/1')
        .expect(204)
        .end(done)
    })
  })
  describe('실패시', () => {
    it('id가 숫자가 아닐 경우 400으로 응답한다', (done) => {
      request(app)
        .delete('/service/one')
        .expect(400)
        .end(done)
    })
  })
})

describe('POST /service', () => {

  before(() => models.sequelize.sync({ force: true }))
  before(() => models.Service.bulkCreate(services))

  describe('성공시', () => {
    let body
    before(done => {
      request(app)
        .post('/service')
        .send({ service: 'amoris', location: 'seoul', profile: 'img4.jpg' })
        .expect(201)
        .end((err, res) => {
          body = res.body
          done()
        })
    })
    it('생성된 유저 객체를 반환한다', () => {
      body.should.have.property('id')
    })
    it('입력한 service를 반환한다', () => {
      body.should.have.property('service', 'amoris')
    })
    it('입력한 location을 반환한다', () => {
      body.should.have.property('location', 'seoul')
    })
  })

  describe('실패시', () => {
    it('service 파라미터 누락 시 400을 반환한다', (done) => {
      request(app)
        .post('/service')
        .send({})
        .expect(400)
        .end(done)
    })
    it('service 파라미터 중복 시 409를 반환한다', (done) => {
      request(app)
        .post('/service')
        .send({ service: 'amoris', location: 'seoul', profile: 'img4.jpg' })
        .expect(409)
        .end(done)
    })
  })
})

describe('PUT /service/:id', () => {

  before(() => models.sequelize.sync({ force: true }))
  before(() => models.Service.bulkCreate(services))

  describe('성공시', () => {
    it('변경된 service, location, profile을 응답한다', (done) => {
      request(app)
        .put('/service/3')
        .send({ service: 'apelgamo_선릉', location: 'seoul', profile: 'img5.jpg' })
        .end((err, res) => {
          // console.log('resbody', res.body)
          res.body.should.have.property('service', 'apelgamo_선릉')
          res.body.should.have.property('location', 'seoul')
          res.body.should.have.property('profile', 'img5.jpg')
          done()
        })
    })
  })
  describe('실패시', () => {
    it('정수가 아닌 id일 경우 400을 응답한다', (done) => {
      request(app)
        .put('/service/one')
        .expect(400)
        .end(done)
    })
    it('email이 없을 경우 400을 응답한다', (done) => {
      request(app)
        .put('/service/1')
        .send({})
        .expect(400)
        .end(done)
    })
    it('없는 유저번호 일 경우 404을 응답한다', (done) => {
      request(app)
        .put('/service/9999')
        .send({ service: 'foo' })
        .expect(404)
        .end(done)
    })
    it('service가 중복일 경우 409을 응답한다', (done) => {
      request(app)
        .put('/service/1')
        .send({ service: 'Wester Bennevis' })
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
