import mongoose from 'mongoose';

const connectDb = handler => async (req, res) => {
  //Database baglantisi varmi yokmu kontrol ediyoruz. Eger yoksa .env den MONGO_URL ile baglantiyi kurmasini sagliyoruz mongoose un.
  if(mongoose.connections[0].readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  //Baglanti varsa zaten handler 'i return yapiyoruz. HANDLER aslinda graphql serverimizin fonksiyonudur. /pages/api/graphql
  return handler(req, res)
};

//Baglantisi db degiskenine atiyoruz. ve Acildiginda once ile 1 kere denetimini saglayip 2. argument ile istedigimzi eventi yaptiriyoruz.
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to mongo');
});

//Daha sonra baglanti fonksiyonunu graphQl Playground u ayaga kaldirdigimiz yerde kullanmak uzere export ediyoruz.
export default connectDb;