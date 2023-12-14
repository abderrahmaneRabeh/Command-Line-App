import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs";

const program = new Command();

const Questions = [
  {
    type: "input",
    name: "prenom",
    message: "donner votre prenom : ",
  },
  {
    type: "input",
    name: "nom",
    message: "donner votre nom : ",
  },
];

const dataPath = "./data.json";

program.name("CommandApp").description("save full name").version("1.0.0");

program
  .command("ajouter")
  .alias("a")
  .description("ajouter le nom/prenom")
  .action(() => {
    inquirer.prompt(Questions).then((reponse) => {
        console.log("reponse :",reponse);
      if (fs.existsSync(dataPath)) {
        fs.readFile(dataPath, "utf8", (err, content) => {
          if (err) {
            console.log("erreur ", err);
            process.exit();
          }
          const dataAsJson = JSON.parse(content);
          dataAsJson.push(reponse);
          fs.writeFile(dataPath, JSON.stringify(dataAsJson), "utf-8", () => {
            console.log("l'ajout success!!");
          });
        });
      } else {
        fs.writeFile(dataPath, JSON.stringify([reponse]), "utf8", () => {
          console.log("l'ajoute successs!!");
        });
      }
    });
  });

  program
  .command('affiche')
  .alias('aff')
  .description('afficher tout les condidat')
  .action(() => {
      fs.readFile(dataPath, 'utf-8', (err, content) => {
        if (err) {
          console.log("Error", err);
          process.exit();
        }
        console.table(JSON.parse(content));
      })
  });

program.parse();
