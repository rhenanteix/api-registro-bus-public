const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://busapi:busapi@cluster0.qfftm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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

async function registerEmpresasRegistroSP(req, res) {
    try {
      const { nome, cnpjCpf, tipo, contato, produtos, atendimento, funcionario, tipoPagamento  } = req.body;
  
      if (!req.body) {
        return res
          .status(500)
          .json({ error: "Algum campo  não foi informado do corpo da requisição" });
      }
  
      const database = await getDatabase();
  
      const busCollection = await database.collection("companyRegistro");
  
      const bidExits = await busCollection.findOne({ cnpjCpf });
  
      if (bidExits)
        return res
          .status(500)
          .json({ error: "Um cpf ou cpnj já existe" });
  
          busCollection.insertOne({
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(200).json({ message: "Empresa da cidade de Registro foi criado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Não foi possivel criar essa empresa, verifique com nosso suporte" });
    }
  }

  // cadastrar

  async function registerVagas(req, res) {
    try {
      const { nomeEmpresa, email, celular, nomeVaga, descricaoVaga, descricaoEmpresa, link  } = req.body;
  
      if (!req.body) {
        return res
          .status(500)
          .json({ error: "Algum campo  não foi informado do corpo da requisição" });
      }
  
      const database = await getDatabase();
  
      const busCollection = await database.collection("vagas");
  
          busCollection.insertOne({
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(200).json({ message: "Vaga registrada com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Não foi possivel criar essa empresa, verifique com nosso suporte" });
    }
  }

  async function registerAttractions(req, res) {
    try {
      const { nomeLocal, tipoLocal, cidade, comoChegar, fotos, nota  } = req.body;
  
      if (!req.body) {
        return res
          .status(500)
          .json({ error: "Algum campo  não foi informado do corpo da requisição" });
      }
  
      const database = await getDatabase();
  
      const busCollection = await database.collection("attractions");
  
    //  const bidExits = await busCollection.findOne({ cnpjCpf });
  
    //   if (bidExits)
    //     return res
    //       .status(500)
    //       .json({ error: "Um cpf ou cpnj já existe" });
  
          busCollection.insertOne({
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(200).json({ message: "Empresa da cidade de Registro foi criado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Não foi possivel criar essa empresa, verifique com nosso suporte" });
    }
  }


// crash analitycs - sentry.io

module.exports = {
  register,
  registerEmpresasRegistroSP,
  registerAttractions,
  registerVagas,
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
