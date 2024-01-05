import prepare from 'mocha-prepare'
import mongoUnit from 'mongo-unit'

prepare(done => mongoUnit.start()
 .then(testMongoUrl => {
   process.env.MONGO_URL = testMongoUrl
   done()
 }));

 export default prepare;