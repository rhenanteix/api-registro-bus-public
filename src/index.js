const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 })
);
// app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
// const MongoClient = require("mongodb").MongoClient;
// const url =
//   "mongodb://admin_tech:Kiddle2020@ds245150.mlab.com:45150/heroku_brqgjrjq";
// const admin = require("firebase-admin");
// let serviceAccount = require("../../kiddle-pass-sdk.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// let firestoreDB = admin.firestore();

// app.get("/insert-activities/", function(req, res) {
//   res.send("INSERT ACTIVITIES!");
//   firestoreDB
//     .collection("atividades")
//     .get()
//     .then(snapshot => {
//       snapshot.forEach(doc => {
//         var atividade = {};
//         var item = doc.data();
//         atividade.id_app = doc.id;
//         atividade.nome = item.atividade;
//         atividade.parceiro_id = item.parceiro_id;
//         atividade.parceiro_nome = item.parceiro_nome;
//         atividade.data_cadastro = "30/03/2020";
//         atividade.destaque = item.destaque;
//         atividade.categoria = item.categoria;
//         atividade.subcategoria = item.subcategoria;
//         atividade.tipo_atividade = item.tipo_de_atividade;
//         atividade.descricao = item.descricao;
//         atividade.idade_minima = item.idade_minima;
//         atividade.idade_maxima = item.idade_maxima;
//         atividade.metodologia = item.metodologia;
//         atividade.necessario_levar = item.necessario_levar;
//         atividade.acompanhante = item.necessita_acompanhante;
//         atividade.acompanhante_idade = item.idade_criancas_acompanhadas;
//         atividade.programa_familiar = item.programa_familiar;
//         atividade.orientacoes = item.texto_importante;
//         atividade.vestuario = item.tipo_vestuario;
//         atividade.valor = item.valor;
//         atividade.tipo_recorrente = false;
//         atividade.tipo_curso = item.curso;
//         atividade.curso_datas = item.datas_fixas;
//         atividade.data_inicio = item.data_inicio;
//         atividade.data_fim = item.data_termino;
//         atividade.nivel_tecnico = item.nivel_tecnico;
//         atividade.nivel_tecnico_texto = item.nivel_tecnico_texto;
//         atividade.vouchers = [];
//         atividade.fotos = item.fotos;
//         atividade.horarios = [
//           (seg = item.seg),
//           (ter = item.ter),
//           (qua = item.qua),
//           (qui = item.qui),
//           (sex = item.sex),
//           (sab = item.sab),
//           (dom = item.dom),
//           (feriado = item.feriado)
//         ];

//         MongoClient.connect(url, function(err, db) {
//           if (err) throw err;
//           var dbo = db.db("heroku_brqgjrjq");
//           dbo.collection("activities").insertOne(atividade);
//         });
//       });
//       console.log("TAMANHO TOTAL -->", snapshot.size);
//       return;
//     })
//     .catch(err => {
//       console.log("Error getting documents", err);
//     });
// });

// app.get("/insert-partners/", function (req, res) {
//   res.send("INSERT PARTNERS!");
//   firestoreDB
//     .collection("parceiros")
//     .get()
//     .then(snapshot => {
//       snapshot.forEach(doc => {
//         var partner = {};
//         var item = doc.data();
//         partner.id_app = doc.id;
//         partner.nome_fantasia = item.nome;
//         partner.cnpj = item.cnpj;
//         partner.razao_social = doc.razao_social;
//         partner.tipo_contrato = item.tipo_contrato;
//         partner.contrato_porcentagem = item.contrato_porcentagem;
//         partner.status = item.status;
//         partner.data_status = doc.data_status;
//         partner.data_cadastro = '27/03/2020';
//         partner.descricao = item.detalhes;
//         partner.responsavel_nome = item.responsavel_nome;
//         partner.responsavel_cargo = doc.responsavel_cargo;
//         partner.responsavel_telefone = item.responsavel_telefone;
//         partner.responsavel_email = item.responsavel_email;
//         partner.responsavel_cpf = item.responsavel_cpf;
//         partner.contato_celular = item.celular;
//         partner.contato_email = doc.email;
//         partner.contato_telefone = item.telefone;
//         partner.site = item.site;
//         partner.facebook = item.facebook;
//         partner.instagram = item.instagram;
//         partner.banco_nome = item.banco_nome;
//         partner.banco_agencia = item.banco_agencia;
//         partner.banco_conta = item.banco_conta;
//         partner.banco_titular = item.banco_titular;
//         partner.banco_doc = item.banco_cpf_cnpj;
//         partner.end_cep = item.end_cep;
//         partner.end_rua = item.end_rua;
//         partner.end_bairro = item.end_bairro;
//         partner.end_numero = item.end_numero;
//         partner.end_complemento = item.end_complemento;
//         partner.end_cidade = item.end_cidade;
//         partner.end_uf = item.end_uf;

//         MongoClient.connect(url, function (err, db) {
//           if (err) throw err;
//           var dbo = db.db("heroku_brqgjrjq");
//           dbo.collection("partners").insertOne(partner);
//         });
//       });
//       console.log("TAMANHO TOTAL -->", snapshot.size);
//       return;
//     })
//     .catch(err => {
//       console.log("Error getting documents", err);
//     });
// });

// app.get("/insert-users/", function (req, res) {
//   res.send("INSERT USERS!");
//   firestoreDB
//     .collection("cupons")
//     .get()
//     .then(snapshot => {
//       snapshot.forEach(doc => {
//         var item = doc.data();
//         MongoClient.connect(url, function (err, db) {
//           if (err) throw err;
//           var dbo = db.db("heroku_brqgjrjq");
//           dbo.collection("cupons").insertOne(item).then(() => console.log('sucesso')).catch(err => { console.log(err) })
//         });
//       });
//       console.log("TAMANHO TOTAL -->", snapshot.size);
//       return;
//     })
//     .catch(err => {
//       console.log("Error getting documents", err);
//     });
// });

// app.get("/insert-schedules/", function(req, res) {
//   res.send("INSERT SCHEDULES!");
//   firestoreDB
//     .collection("agendamentos")
//     .get()
//     .then(snapshot => {
//       snapshot.forEach(doc => {
//         var item = doc.data();
//         MongoClient.connect(url, function(err, db) {
//           if (err) throw err;
//           var dbo = db.db("heroku_brqgjrjq");
//           dbo.collection("schedules").insertOne(item);
//         });
//       });
//       console.log("TAMANHO TOTAL -->", snapshot.size);
//       return;
//     })
//     .catch(err => {
//       console.log("Error getting documents", err);
//     });
// });
// app.get("/users-partners/", function (_req, res) {
//   res.send("INSERT USERS Partners!");
//   firestoreDB
//     .collection("usuarios_parceiros")
//     .get()
//     .then((snapshot) => {
//       snapshot.forEach((doc) => {
//         var item = doc.data();
//         MongoClient.connect(url, function (err, db) {
//           if (err) throw err;
//           var dbo = db.db("heroku_brqgjrjq");
//           dbo
//             .collection("users-partners")
//             .insertOne(item)
//             .then(() => console.log("sucesso"))
//             .catch((err) => {
//               console.log(err);
//             });
//         });
//       });
//       console.log("TAMANHO TOTAL -->", snapshot.size);
//       return;
//     })
//     .catch((err) => {
//       console.log("Error getting documents", err);
//     });
// });
