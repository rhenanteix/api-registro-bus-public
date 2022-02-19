const MongoClient = require("mongodb").MongoClient;
const url =
  "CLUSTER";
const ObjectID = require("mongodb").ObjectID;

async function getDatabase() {
  const connection = await MongoClient.connect(url, {
    useUnifiedTopology: true,
  });
  const database = connection.db("busapi");

  return database;
}

async function register(req, res) {
  try {
    const { bid, bairro, tipoSemana, bidLocal, nomeLocal, horariosSaida  } = req.body;

    if (!req.body) {
      return res
        .status(500)
        .json({ error: "Algum campo  não foi informado do corpo da requisição" });
    }

    const database = await getDatabase();

    const busCollection = await database.collection("bus");

    const bidExits = await busCollection.findOne({ bidLocal });

    if (bidExits)
      return res
        .status(500)
        .json({ error: "Um bid com esse código já existe" });

        busCollection.insertOne({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json({ message: "Horários Criado com Sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Não foi possivel gerar um horário" });
  }
}

async function update(req, res) {
  const { _id, auth_id } = req.body;
  try {
    if (!_id) {
      return res
        .status(500)
        .json({ error: "Voucher ID não informado do corpo da requisição" });
    }

    if (!auth_id) {
      return res
        .status(500)
        .json({ error: "Usuário ID não informado do corpo da requisição" });
    }

    const database = await getDatabase();

    const voucherCollection = await database.collection("vouchers");

    const voucherExits = await voucherCollection.findOne({ auth_id });

    if (voucherExits)
      return res
        .status(500)
        .json({ error: "Esse usuário já está autenticado" });

    voucherCollection.updateOne({
      ...req.body,

      $set: {
        auth_id,
        updateAt: new Date(),
      },

      //   {
      //     $set: {
      //       auth_id,
      //       updatedAt: new Date(),
      //     },
      //   }
    });
    res.status(200).json({ message: "Associação com usuário efetivada" });
  } catch (error) {
    res.status(500).json({ error: "Não foi possivel gerar uma associação" });
  }
}

// crash analitycs - sentry.io

module.exports = {
  register,
  update,
//   getList(_req, res) {
//     MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
//       if (err) throw err;
//       var dbo = db.db("heroku_brqgjrjq");
//       dbo
//         .collection("plans")
//         .find()
//         .toArray(function (err, result) {
//           if (err) throw err;
//           res.send(result);
//           db.close();
//         });
//     });
//   },
//   update(req, res) {
//     const { _id, ativo, auth_id } = req.body;

//     MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
//       if (err) throw err;
//       var dbo = db.db("heroku_brqgjrjq");
//       dbo
//         .collection("vouchers")
//         .updateOne(
//           { _id: ObjectID(_id) },
//           {
//             $set: {
//               ativo,
//               auth_id,
//               updatedAt: new Date(),
//             },
//           }
//         )
//         .then(() => {
//           res.send("Seu voucher kiddlepass foi associado com o usuário");
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     });
//   },

//   getVoucher(req, res) {
//     const id = req.body.id;
//     MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
//       if (err) throw err;
//       var dbo = db.db("heroku_brqgjrjq");
//       dbo
//         .collection("vouchers")
//         .findOne({ id })
//         .then((result) => {
//           res.send(result);
//           db.close();
//         })
//         .catch((err) => console.log(err));
//     });
//   },
};
