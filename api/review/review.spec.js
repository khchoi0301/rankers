const request = require('supertest')
const should = require('should')
const app = require('../../index')
const models = require('../../models/index')

const reviews = [{ title: 'was good', contents: '좋아요', stars: 4, img: 'img1.jpg', UserId: 1, ServiceId: 1 },
{ title: 'was really bad', contents: '매우 나빠요', stars: 1, img: 'img2.jpg', UserId: 1, ServiceId: 2 },
{ title: 'was bad', contents: '나빠요', stars: 2, img: 'img3.jpg', UserId: 2, ServiceId: 2 }]
const services = [{ service: 'wedding city', location: 'seoul', profile: 'img1.jpg' },
{ service: 'Wester Bennevis', location: 'seoul', profile: 'img2.jpg' }]
const users = [{ name: 'alice', email: 'alice@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' },
{ name: 'bek', email: 'bek@gmail.com', password: 'pass', provider: 'google', snsId: 'a', profile: 'profile.jpg' }]

const sync = () => models.sequelize.sync({ force: true })
const addUsers = () => models.User.bulkCreate(users)
const addReviews = () => models.Review.bulkCreate(reviews)
const addServices = () => models.Service.bulkCreate(services)

describe('GET /review', () => {

  before(sync)
  before(addUsers)
  before(addServices)
  before(addReviews)

  describe('성공시', () => {
    it('유저 객체를 담은 배열로 응답한다 ', (done) => {
      request(app)
        .get('/review')
        .end((err, res) => {
          // console.log('spec', res.body)
          res.body.should.be.instanceOf(Array);
          done();
        })
    })

    it('최대 limit 갯수만큼 응답한다', (done) => {
      request(app)
        .get('/review?limit=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(2)
          done()
        })
    })
  })

  describe('실패시', () => {
    it('limit이 숫자형이 아니면 400을 응답한다 ', (done) => {
      request(app)
        .get('/review?limit=two')
        .expect(400)
        .end(done)
    })
  })
})

describe('GET /review/:id', () => {

  describe('성공시', () => {
    it('id가 1인 객체를 반환한다', (done) => {
      request(app)
        .get('/review/1')
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
        .get('/review/one')
        .expect(400)
        .end(done)
    })
    it('id로 review를 찾을 수 없을 경우 404로 응답한다', (done) => {
      request(app)
        .get('/review/999')
        .expect(404)
        .end(done)
    })
  })
})

describe('DELETE /review/:id', () => {

  describe('성공시', () => {
    it('204를 응답한다', (done) => {
      request(app)
        .delete('/review/1')
        .expect(204)
        .end(done)
    })
  })
  describe('실패시', () => {
    it('id가 숫자가 아닐 경우 400으로 응답한다', (done) => {
      request(app)
        .delete('/review/one')
        .expect(400)
        .end(done)
    })
  })
})

describe('POST /review', () => {

  before(sync)
  before(addUsers)
  before(addServices)
  before(addReviews)

  describe('성공시', () => {
    let body
    before(done => {
      request(app)
        .post('/review')
        .send({ title: 'was really good', contents: '매우 좋아요', stars: 5, img: 'img4.jpg', UserId: 2, ServiceId: 1 })
        .expect(201)
        .end((err, res) => {
          body = res.body
          done()
        })
    })
    it('생성된 review 객체를 반환한다', () => {
      body.should.have.property('id')
    })
    it('입력한 contects 반환한다', () => {
      body.should.have.property('contents', '매우 좋아요')
    })
    it('입력한 stars 을 반환한다', () => {
      body.should.have.property('stars', 5)
    })
  })

  describe('실패시', () => {
    it('파라미터 누락 시 400을 반환한다', (done) => {
      request(app)
        .post('/review')
        .send({})
        .expect(400)
        .end(done)
    })
    it('잘못된 UserId 파라미터 입력 시 409를 반환한다', (done) => {
      request(app)
        .post('/review')
        .send({ title: 'was really good', contents: '매우 좋아요', stars: 5, img: 'img4.jpg', UserId: 100, ServiceId: 1 })
        .expect(409)
        .end(done)
    })
    it('잘못된 ServiceId 파라미터 입력 시 409를 반환한다', (done) => {
      request(app)
        .post('/review')
        .send({ title: 'was really good', contents: '매우 좋아요', stars: 5, img: 'img4.jpg', UserId: 1, ServiceId: 100 })
        .expect(409)
        .end(done)
    })
  })
})

describe('PUT /review/:id', () => {

  describe('성공시', () => {
    it('변경된 info를 응답한다', (done) => {
      request(app)
        .put('/review/3')
        .send({ title: 'was really good', contents: '매우 좋아요', stars: 5, img: 'img4.jpg', UserId: 2, ServiceId: 1 })
        .end((err, res) => {
          res.body.should.have.property('title', 'was really good')
          res.body.should.have.property('contents', '매우 좋아요')
          res.body.should.have.property('stars', 5)
          res.body.should.have.property('UserId', 2)
          res.body.should.have.property('ServiceId', 1)
          done()
        })
    })
    it('입력 값이 없을 경우 원래 data를 반환한다', (done) => {
      request(app)
        .put('/review/1')
        .send({})
        .end((err, res) => {
          res.body.should.have.property('title', 'was good')
          res.body.should.have.property('contents', '좋아요')
          res.body.should.have.property('stars', 4)
          res.body.should.have.property('UserId', 1)
          res.body.should.have.property('ServiceId', 1)
          done()
        })
    })
  })
  describe('실패시', () => {
    it('정수가 아닌 id일 경우 400을 응답한다', (done) => {
      request(app)
        .put('/review/one')
        .expect(400)
        .end(done)
    })

    it('없는 번호 일 경우 404을 응답한다', (done) => {
      request(app)
        .put('/review/9999')
        .send({ service: 'foo' })
        .expect(404)
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
