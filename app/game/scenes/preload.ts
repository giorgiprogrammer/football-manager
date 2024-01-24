import { WebFontFile } from "../helper/webFontLoader";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath(`../../game/assets/`);

    //Font
    this.load.addFile(new WebFontFile(this.load, "Rubik Mono One"));

    //UI
    this.load.image("neon-arrow", "image/ui/neon-arrow.png");
    this.load.image("menu-button", "image/ui/menu-button.png");
    this.load.image("default", "image/ui/default.png");
    this.load.image("circle", "image/ui/circle.png");
    this.load.image("grass", "image/ui/grass.jpg");
    this.load.image("menuIcon", "image/ui/menu-icon.png");
    this.load.image("stadiumFitch", "image/ui/fitch.png");

    //Team Logos

    //Rest Of The World
    this.load.image("al-hilal", "image/teamLogos/restOfTheWorld/Al-Hilal.png");
    this.load.image(
      "al-ittihad",
      "image/teamLogos/restOfTheWorld/Al-Ittihad.png"
    );
    this.load.image("al-nassr", "image/teamLogos/restOfTheWorld/Al-Nassr.png");
    this.load.image(
      "boca-juniors",
      "image/teamLogos/restOfTheWorld/Boca-Juniors.png"
    );
    this.load.image("flamengo", "image/teamLogos/restOfTheWorld/Flamengo.png");
    this.load.image(
      "fluminense",
      "image/teamLogos/restOfTheWorld/Fluminense.png"
    );
    this.load.image("gremio", "image/teamLogos/restOfTheWorld/Gremio.png");
    this.load.image(
      "inter-miami",
      "image/teamLogos/restOfTheWorld/Inter-Miami.png"
    );
    this.load.image(
      "la-galaxy",
      "image/teamLogos/restOfTheWorld/LA-Galaxy.png"
    );
    this.load.image(
      "new-york-city",
      "image/teamLogos/restOfTheWorld/New-York-City.png"
    );
    this.load.image(
      "palmeiras",
      "image/teamLogos/restOfTheWorld/Palmeiras.png"
    );
    this.load.image("Racing", "image/teamLogos/restOfTheWorld/Racing.png");
    this.load.image(
      "river-plate",
      "image/teamLogos/restOfTheWorld/River-Plate.png"
    );
    this.load.image("Santos", "image/teamLogos/restOfTheWorld/Santos.png");
    this.load.image(
      "sao-paulo",
      "image/teamLogos/restOfTheWorld/Sao-Paulo.png"
    );
    this.load.image(
      "changhai-port",
      "image/teamLogos/restOfTheWorld/Shanghai-Port.png"
    );

    // Erovnuli Liga
    this.load.image("bolnisi", "image/teamLogos/erovnuliLiga/Bolnisi.png");
    this.load.image("dila-gori", "image/teamLogos/erovnuliLiga/Dila-Gori.png");
    this.load.image(
      "dinamo-tbilisi",
      "image/teamLogos/erovnuliLiga/Dinamo-Tbilisi.png"
    );
    this.load.image("poti", "image/teamLogos/erovnuliLiga/Poti.png");
    this.load.image("saburtalo", "image/teamLogos/erovnuliLiga/Saburtalo.png");
    this.load.image("samgurali", "image/teamLogos/erovnuliLiga/Samgurali.png");
    this.load.image("shukura", "image/teamLogos/erovnuliLiga/Shukura.png");
    this.load.image(
      "torpedo-kutaisi",
      "image/teamLogos/erovnuliLiga/Torpedo-Kutaisi.png"
    );
    this.load.image(
      "wit-georgia",
      "image/teamLogos/erovnuliLiga/WIT-Georgia.png"
    );

    // La Liga
    this.load.image("alaves", "image/teamLogos/laLiga/Alaves.png");
    this.load.image("almeria", "image/teamLogos/laLiga/Almeria.png");
    this.load.image(
      "athletic-bilbao",
      "image/teamLogos/laLiga/Athletic-Bilbao.png"
    );
    this.load.image(
      "atletico-madrid",
      "image/teamLogos/laLiga/Atletico-Madrid.png"
    );
    this.load.image("barcelona", "image/teamLogos/laLiga/Barcelona.png");
    this.load.image("betis", "image/teamLogos/laLiga/Betis.png");
    this.load.image("cadiz", "image/teamLogos/laLiga/Cadiz.png");
    this.load.image("celta", "image/teamLogos/laLiga/Celta-Vigo.png");
    this.load.image("getafe", "image/teamLogos/laLiga/Getafe.png");
    this.load.image("girona", "image/teamLogos/laLiga/Girona.png");
    this.load.image("granada", "image/teamLogos/laLiga/Granada.png");
    this.load.image("las-palmas", "image/teamLogos/laLiga/Las-Palmas.png");
    this.load.image("mallorca", "image/teamLogos/laLiga/Mallorca.png");
    this.load.image("osasuna", "image/teamLogos/laLiga/Osasuna.png");
    this.load.image(
      "rayo-vallecano",
      "image/teamLogos/laLiga/Rayo-Vallecano.png"
    );
    this.load.image("real-madrid", "image/teamLogos/laLiga/Real-Madrid.png");
    this.load.image(
      "real-sociedad",
      "image/teamLogos/laLiga/Real-Sociedad.png"
    );
    this.load.image("sevilla", "image/teamLogos/laLiga/Sevilla.png");
    this.load.image("valencia", "image/teamLogos/laLiga/Valencia.png");
    this.load.image("villarreal", "image/teamLogos/laLiga/Villarreal.png");

    //Seria A
    this.load.image("atalanta", "image/teamLogos/seriaA/Atalanta.png");
    this.load.image("bologna", "image/teamLogos/seriaA/Bologna.png");
    this.load.image("cagliari", "image/teamLogos/seriaA/Cagliari.png");
    this.load.image("empoli", "image/teamLogos/seriaA/Empoli.png");
    this.load.image("fiorentina", "image/teamLogos/seriaA/Fiorentina.png");
    this.load.image("frosinone", "image/teamLogos/seriaA/Frosinone.png");
    this.load.image("genoa", "image/teamLogos/seriaA/Genoa.png");
    this.load.image("inter", "image/teamLogos/seriaA/Inter.png");
    this.load.image("juventus", "image/teamLogos/seriaA/Juventus.png");
    this.load.image("lazio", "image/teamLogos/seriaA/Lazio.png");
    this.load.image("lecce", "image/teamLogos/seriaA/Lecce.png");
    this.load.image("milan", "image/teamLogos/seriaA/Milan.png");
    this.load.image("monza", "image/teamLogos/seriaA/Monza.png");
    this.load.image("napoli", "image/teamLogos/seriaA/Napoli.png");
    this.load.image("roma", "image/teamLogos/seriaA/Roma.png");
    this.load.image("salernitana", "image/teamLogos/seriaA/Salernitana.png");
    this.load.image("sassuolo", "image/teamLogos/seriaA/Sassuolo.png");
    this.load.image("torino", "image/teamLogos/seriaA/Torino.png");
    this.load.image("udinese", "image/teamLogos/seriaA/Udinese.png");
    this.load.image("verona", "image/teamLogos/seriaA/Verona.png");

    //Premier League
    this.load.image("arsenal", "image/teamLogos/premierLeague/Arsenal.png");
    this.load.image(
      "aston-villa",
      "image/teamLogos/premierLeague/Aston-Villa.png"
    );
    this.load.image(
      "bournemouth",
      "image/teamLogos/premierLeague/Bournemouth.png"
    );
    this.load.image("brentford", "image/teamLogos/premierLeague/Brentford.png");
    this.load.image("brighton", "image/teamLogos/premierLeague/Brighton.png");
    this.load.image("burnley", "image/teamLogos/premierLeague/Burnley.png");
    this.load.image("chelsea", "image/teamLogos/premierLeague/Chelsea.png");
    this.load.image(
      "crystal-palace",
      "image/teamLogos/premierLeague/Crystal-Palace.png"
    );
    this.load.image("everton", "image/teamLogos/premierLeague/Everton.png");
    this.load.image("fulham", "image/teamLogos/premierLeague/Fulham.png");
    this.load.image("liverpool", "image/teamLogos/premierLeague/Liverpool.png");
    this.load.image("luton", "image/teamLogos/premierLeague/Luton.png");
    this.load.image(
      "manchester-city",
      "image/teamLogos/premierLeague/Manchester-City.png"
    );
    this.load.image(
      "manchester-united",
      "image/teamLogos/premierLeague/Manchester-United.png"
    );
    this.load.image("newcastle", "image/teamLogos/premierLeague/Newcastle.png");
    this.load.image(
      "nottingham",
      "image/teamLogos/premierLeague/Nottingham.png"
    );
    this.load.image("sheffield", "image/teamLogos/premierLeague/Sheffield.png");
    this.load.image("tottenham", "image/teamLogos/premierLeague/Tottenham.png");
    this.load.image("west-ham", "image/teamLogos/premierLeague/West-Ham.png");
    this.load.image("wolves", "image/teamLogos/premierLeague/Wolves.png");

    //Tournaments
    this.load.image(
      "georgian-league",
      "image/teamLogos/tournaments/Erovnuli-liga.png"
    );
    this.load.image("la-liga", "image/teamLogos/tournaments/LaLiga.png");
    this.load.image(
      "other-european",
      "image/teamLogos/tournaments/Other-European.png"
    );
    this.load.image(
      "premier-league",
      "image/teamLogos/tournaments/Premier-League.png"
    );
    this.load.image(
      "rest-of-the-world",
      "image/teamLogos/tournaments/Restofthe-World.png"
    );
    this.load.image("seria-A", "image/teamLogos/tournaments/Seria-A.png");

    //GameObjects
    this.load.image("ball", "image/gameObjects/ball.png");
    this.load.image("elipse", "image/gameObjects/elipse.png");
    this.load.image("ground", "image/gameObjects/ground.jpg");
    this.load.image(
      "stadiumSurrounding",
      "image/gameObjects/stadiumSurrounding.jpg"
    );
  }

  create() {
    this.scene.start("Menu");
  }
}
