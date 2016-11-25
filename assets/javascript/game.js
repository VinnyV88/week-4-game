
//Star Wars: RPG

//Steps:
// 1. Characters are created/defined by their attributes 
//    - Name, Health Points, Attack Power, Counter-Attack Power, and Attack Power Increment
//    - Attack Power increases by the Increment after every attack, but not for a Counter-Attack
//    - Only Health Points are displayed on the character 
// 2. Display a list of four characters for the player to choose as their fighter
// 3. After the player makes their choice, the other three characters become 
//    the opponents for which the player has to defeat
// 4. The player selects his first opponent from the three choices
// 5. After the player chooses his opponent, the battlefield is prepared by facing 
//    the two opponents face-off and giving the player an option to attack via a button 
// 6. The Attack/Counter-Attack occurs every time the player pushes the attack button until we have a winner
// 7. Repeat steps 4 - 6 until either the player dies or all 3 opponents are defeated
// 8. The player wins if all three opponents are defeated
// 9. The player loses if he loses all his health points before defeating his opponents
// 10. Important rules:
//	   - The Health Points, Attack Power and Counter Attack Power of each character must differ
//     - Your players should be able to win and lose the game no matter what character they choose

$(document).ready(function() {

	/**
	 * Randomize array element order in-place.
	 * Using Durstenfeld shuffle algorithm.
	 **/
	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	};

	var starwars = {
		charAttribs: [char1 = {health: 120, attack: 8, attackinc: 8, counteratt: 5},
					  char2 = {health: 100, attack: 10, attackinc: 10, counteratt: 10},
					  char3 = {health: 150, attack: 6, attackinc: 6, counteratt: 25},
					  char4 = {health: 180, attack: 4, attackinc: 4, counteratt: 15}
					 ],
		Characters: [obiwan = {name: "Obi-Wan Kenobi", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Old Obi Wan.png", imgfightp: "Old Obi Wan.png", imgfighte: "Old Obi WanE.png", imgwin: "", imglose: ""},
					luke = {name: "Luke Skywalker", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Luke Skywalker 03.png", imgfightp: "Luke Skywalker 01.png", imgfighte: "Luke Skywalker 01E.png", imgwin: "", imglose: ""},
					leia = {name: "Princess Leia", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Leia.png", imgfightp: "Padme Amidala.png", imgfighte: "Padme AmidalaE.png", imgwin: "", imglose: ""},
					chewy = {name: "Chewbacca", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Chewbacca.png", imgfightp: "chewy.png", imgfighte: "chewyE.png", imgwin: "", imglose: ""},
					han = {name: "Han Solo", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Han Solo 01.png", imgfightp: "Han Solo 02.png", imgfighte: "Han Solo 02E.png", imgwin: "", imglose: ""},
					yoda = {name: "Yoda", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Yoda 02.png", imgfightp: "Yoda 01.png", imgfighte: "Yoda 01E.png", imgwin: "", imglose: ""},
					boba = {name: "Boba Fett", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Boba Fett.png", imgfightp: "Boba Fett.png", imgfighte: "Boba FettE.png", imgwin: "", imglose: ""},
					r2d2 = {name: "R2-D2", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "R2D2 02.png", imgfightp: "R2D2 01.png", imgfighte: "R2D2 01E.png", imgwin: "", imglose: ""},
					vader = {name: "Darth Vader", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Vader 01.png", imgfightp: "Vader 03.png", imgfighte: "Vader 03E.png", imgwin: "", imglose: ""},
					maul = {name: "Darth Maul", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Darth Maul 02.png", imgfightp: "Darth Maul 01.png", imgfighte: "Darth Maul 01E.png", imgwin: "", imglose: ""},
					c3po = {name: "C-3PO", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "C3PO.png", imgfightp: "C3PO.png", imgfighte: "C3POE.png", imgwin: "", imglose: ""},
					jabba = {name: "Jabba the Hut", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Java the Hutt.png", imgfightp: "Java the Hutt.png", imgfighte: "Java the HuttE.png", imgwin: "", imglose: ""},
					emperor = {name: "The Emperor", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "emperor.png", imgfightp: "emperor.png", imgfighte: "emperorE.png", imgwin: "", imglose: ""},
					ewok = {name: "Ewok", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Ewoks.png", imgfightp: "Wicket Warrick.png", imgfighte: "Wicket WarrickE.png", imgwin: "", imglose: ""},
					storm = {name: "Storm Trooper", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Stormtrooper 02.png", imgfightp: "Stormtrooper 02.png", imgfighte: "Stormtrooper 02E.png", imgwin: "", imglose: ""}
				   ],
		charsShuffled:[],
		attribsShuffled: [],
	   	selChars: [],
		selPlayer: {},
		selPlayerIndex: 0,
		selEnemy: {},
		selEnemyIndex: 0,
		Wins: 0,
		GameOver: false,
		bgindex: 0,
		mdbgindex: 0,

		initial: function() {
			$(".battleground-messages").empty()
			$(".gameover-messages").empty()
			this.chooseCharacters();
			this.writeChosenCharacters();
			this.wins = 0;
			this.GameOver = false;
		},

		initSelChars: function() {

			//empty out the selChars array. new characters will be pushed below.
			this.selChars = [];

			for (var i = 0; i < 4; i++) {

				this.charsShuffled[i].hp = this.attribsShuffled[i].health;
				this.charsShuffled[i].ap = this.attribsShuffled[i].attack;
				this.charsShuffled[i].api = this.attribsShuffled[i].attackinc;
				this.charsShuffled[i].cap = this.attribsShuffled[i].counteratt;

				this.selChars.push(this.charsShuffled[i]);
			};

		},

		chooseCharacters: function() {
			this.charsShuffled = shuffleArray(this.Characters);
			this.attribsShuffled = shuffleArray(this.charAttribs);

			this.initSelChars();
		},

		writeChosenCharacters: function() {

			var playerClass = "";

			for (var i = 0; i < 4; i++) {
				playerClass = "player" + i.toString();
				var newPlayerDiv = $("<div>").addClass("flex-container player " + playerClass)
				    .attr("id", this.selChars[i].type).attr("data-player-chosen", "no").attr("data-vs-chosen", "no")
				    .attr("data-player-id", i).attr("data-defeated", false)

				var newPlayerNameDiv = $("<div>").addClass("text-center flex-item playerName");
				
				var newNameP = $("<p>").text(this.selChars[i].name);
				
				var newPlayerImgDiv = $("<div>").addClass("flex-item");
				
				var newImg = $("<img>").attr("style", "width:100%")
				    .attr("src", "assets/images/" + this.selChars[i].imgrdy).attr("alt", "Player " + i);

				var newPlayerHPDiv = $("<div>").addClass("text-center flex-item hp");
				
				newHPp = $("<p>").text("HP: " + this.selChars[i].hp);
				
				newPlayerNameDiv.append(newNameP);
				newPlayerDiv.append(newPlayerNameDiv);
				
				newPlayerImgDiv.append(newImg);
				newPlayerDiv.append(newPlayerImgDiv);

				newPlayerHPDiv.append(newHPp);
				newPlayerDiv.append(newPlayerHPDiv);

				$(".chooseplyr").append(newPlayerDiv);

			} // end for loop

		}, // end writeChoosePlayer

		createBattlefield: function() {
			// $("body").css("background-image", "url(\"assets/images/backdrop08.jpg\") no-repeat");
			// $("chooseplyrhdr").css("display", "none");
			// $("chooseplyr").css("display", "none");
			// $("chooseopphdr").css("display", "none");

			var vsTitle = this.selPlayer.name + " vs. " + this.selEnemy.name;
			var battleClass = ".battleground"

			$(".battleground").empty();
			$(".battleground-messages").empty();
			$(".modal-btn-group").empty();

			this.createFighters(battleClass);

			//Use a drop down modal box to carry out the battle scene

			$(".battleground-title").html(vsTitle);

			var attackButton = $("<button>").attr("type", "button").addClass("btn btn-lg btn-attack").text("Attack!");
			var retreatButton = $("<button>").attr("type", "button").attr("data-dismiss", "modal").addClass("btn btn-lg btn-retreat").text("Retreat");

			$(".modal-btn-group").append(attackButton).append(retreatButton);

			$("#battleModal").modal({
				backdrop: "static",
				keyboard: false});

		}, //end createBattlefield

		createFighters: function(modalClass) {

			//Use flex box to contain battle images

			// Player Fighter Generation
			var PlayerFighterDiv = $("<div>").addClass("flex-battle playerfighter").attr("id", this.selPlayer.type + "fighter")

			var PlayerFighterNameDiv = $("<div>").addClass("text-center flex-item playerName");
			
			var PlayerFighterNameP = $("<p>").text(this.selPlayer.name);

			var PlayerFighterImgDiv = $("<div>").addClass("flex-item");
			
			var PlayerFighterImg = $("<img>").attr("style", "width:100%")
			    .attr("src", "assets/images/" + this.selPlayer.imgfightp).attr("alt", "Player Fighter");

			var PlayerFighterHPDiv = $("<div>").addClass("text-center flex-item hp");
			
			PlayerFighterHPp = $("<p>").text("HP: " + this.selPlayer.hp);
			
			PlayerFighterNameDiv.append(PlayerFighterNameP);
			PlayerFighterDiv.append(PlayerFighterNameDiv);
			
			PlayerFighterImgDiv.append(PlayerFighterImg);
			PlayerFighterDiv.append(PlayerFighterImgDiv);

			PlayerFighterHPDiv.append(PlayerFighterHPp);
			PlayerFighterDiv.append(PlayerFighterHPDiv);


			// Enemy Fighter Generation
			var EnemyFighterDiv = $("<div>").addClass("flex-battle enemyfighter").attr("id", this.selEnemy.type + "fighter")

			var EnemyFighterNameDiv = $("<div>").addClass("text-center flex-item playerName");
			
			var EnemyFighterNameP = $("<p>").text(this.selEnemy.name);

			var EnemyFighterImgDiv = $("<div>").addClass("flex-item");
			
			var EnemyFighterImg = $("<img>").attr("style", "width:100%")
			    .attr("src", "assets/images/" + this.selEnemy.imgfighte).attr("alt", "Enemy Fighter");

			var EnemyFighterHPDiv = $("<div>").addClass("text-center flex-item hp");
			
			EnemyFighterHPp = $("<p>").text("HP: " + this.selEnemy.hp);
			
			EnemyFighterNameDiv.append(EnemyFighterNameP);
			EnemyFighterDiv.append(EnemyFighterNameDiv);
			
			EnemyFighterImgDiv.append(EnemyFighterImg);
			EnemyFighterDiv.append(EnemyFighterImgDiv);

			EnemyFighterHPDiv.append(EnemyFighterHPp);
			EnemyFighterDiv.append(EnemyFighterHPDiv);

			$(modalClass).append(PlayerFighterDiv);

			$(modalClass).append(EnemyFighterDiv);

		}, // end createFighters 

		gameoverSeq: function(results) {

			this.GameOver = true;

			starwars.updatePlayerCards();

			//Setup Main screen Game Over
			//create buttons for user to restart current game or start a new game
			var gameoverButtonsDiv = $("<div>").addClass("button-group")
			var restartButton = $("<button>").attr("type", "button").addClass("btn btn-lg btn-gameover btn-restart").text("Restart");
			var newgameButton = $("<button>").attr("type", "button").addClass("btn btn-lg btn-gameover btn-newgame").text("New Game");

			if (results === "loss") {
				var gameoverMessage = "<h3>" + this.selPlayer.name + " has been defeated!<br><br>" +
				"Press the Restart button to play this game again.<br>Press the New Game button to start a new game.</h3><br><br>";
				var gameoverHTML = "<p class = \"gameoverFlash text-center\">Game Over!</p><br>"
				var gameoverModalMsg = this.selPlayer.name + " has been defeated by " + this.selEnemy.name;

				var PlayerDefDiv = $("<div>").addClass("text-center").html("<p class=\"defeated\">DEFEATED</p>");

				$(".playerfighter").append(PlayerDefDiv);

			} else { // results = win
				var gameoverMessage = "<h3>" + this.selPlayer.name + " has defeated all opponents!<br><br>" +
				"Press the Restart button to play this game again with a different character.<br>Press the New Game button to start a new game.</h3><br><br>";
				var gameoverHTML = "<p class = \"gameoverFlash text-center\">You Won!</p><br>"
				var gameoverModalMsg = this.selPlayer.name + " has defeated all opponents!";

				var EnemyDefDiv = $("<div>").addClass("text-center").html("<p class=\"defeated\">DEFEATED</p>");

				$(".enemyfighter").append(EnemyDefDiv);

			}

			gameoverButtonsDiv.append(restartButton).append(newgameButton);

			$(".main-messages").html(gameoverMessage);
			$(".main-messages").append(gameoverButtonsDiv);

			//Game Over Modal
			$(".battleground-messages").empty();

			$(".battleground-messages").html(gameoverHTML).append(gameoverModalMsg);

			this.modalBtnClose();
		},

		modalBtnClose: function() {

			$(".modal-btn-group").empty();

			var closeButton = $("<button>").attr("type", "button").attr("data-dismiss", "modal").addClass("btn btn-lg").text("Close");

			$(".modal-btn-group").append(closeButton);

		},

		updatePlayerCards: function() {
			// Update Player and Enemy cards with current values
			// close modal and allow player to select a new opponent

			this.selChars[this.selPlayerIndex].hp = this.selPlayer.hp;
			this.selChars[this.selPlayerIndex].ap = this.selPlayer.ap;

			this.selChars[this.selEnemyIndex].hp = this.selEnemy.hp;

			//Update Main Page cards
			var selPlayerTag = "div.player" + this.selPlayerIndex;
			var selEnemyTag = "div.player" + this.selEnemyIndex;

			$(selPlayerTag).children("div.hp").html("<p>HP: " + this.selPlayer.hp + "</p>");
			$(selEnemyTag).children("div.hp").html("<p>HP: " + this.selEnemy.hp + "</p>");

			if (this.selEnemy.hp <= 0) {
				$(selEnemyTag).data("defeated", true);
				var EnemyDefDiv = $("<div>").addClass("text-center flex-defeated").html("<p class=\"defeated\">DEFEATED</p>");

				$(selEnemyTag).append(EnemyDefDiv);
			};

			if (this.selPlayer.hp <= 0) {
				$(selPlayerTag).data("defeated", true);
				var PlayerDefDiv = $("<div>").addClass("text-center flex-defeated").html("<p class=\"defeated\">DEFEATED</p>");

				$(selPlayerTag).append(PlayerDefDiv);
			};

		},

		enemyDefeated: function() {
			
			$("div.battleground-messages").html("<p class = \"battleground-message\">" + starwars.selPlayer.name + " Attacked " + 
			starwars.selEnemy.name + " and caused " + starwars.selPlayer.ap + " points of damage!")

			$("div.battleground-messages").append("<p class = \"battleground-message\">" + starwars.selPlayer.name + " DEFEATED " + 
			starwars.selEnemy.name + "!")


			var EnemyDefDiv = $("<div>").addClass("text-center").html("<p class=\"defeated\">DEFEATED</p>");

			$(".enemyfighter").append(EnemyDefDiv);

			this.updatePlayerCards();
			this.modalBtnClose();

		},

		changeBackground: function (){
    		var imgs = [
            	"assets/images/backdrop03.jpg",
            	"assets/images/backdrop05.jpg",
            	"assets/images/backdrop10.jpg"
        		];

        	this.bgindex +=1
        	if (this.bgindex >= imgs.length) {
        		this.bgindex = 0;
        	};

    	   	$("body").css("background", "url("+imgs[this.bgindex]+")");
    	},

		changeModalBackground: function (){
    		var imgs = [
            	"assets/images/backdrop08.jpg",
            	"assets/images/backdrop01.jpg",
            	"assets/images/backdrop02.jpg",
            	"assets/images/backdrop07.jpg",
            	"assets/images/backdrop09.jpg"
        		];

        	this.mdbgindex +=1
        	if (this.mdbgindex >= imgs.length) {
        		this.mdbgindex = 0;
        	};

    	   	$(".battleground-body").css("background", "url("+imgs[this.mdbgindex]+")");
    	},
		resetGame: function() {

			$(".main-messages").empty();
			$(".chooseplyr").empty();
			$(".chooseopphdr").empty();
			$(".battleground-messages").empty();
			$(".gameover-messages").empty();

			this.changeBackground();
			this.changeModalBackground();
			this.initSelChars();
			this.wins = 0;
			this.GameOver = false;		

		}

	}; // end starwars game object


starwars.initial()  //This executes the start of the game



$(document).on("click", ".player", function() {
		//When a player is picked, move him to the left most position
		//Move the other players (siblings) to the Opponents area

		if (!(starwars.GameOver)) {

			var playerChosen = ($(this).data("player-chosen"));
			var vsChosen = ($(this).data("vs-chosen"));
			var chosenPlayerId = ($(this).data("player-id"));
			var defeatedOpp = ($(this).data("defeated"));

			if (playerChosen === "no") {
				$(".chooseopphdr").append("<h1>Choose Your Opponent</h1>");
				starwars.selPlayer = starwars.selChars[chosenPlayerId];
				starwars.selPlayerIndex = chosenPlayerId;
				var leftpx = 0;
				var siblings = $(this).siblings();
				$(siblings).each(function() {
					$(this).animate({ top: "+=360px" }, "normal");
					$(this).animate({ left: leftpx }, "normal");
					leftpx += 210;
				});

		        $(this).animate({ left: "0px" }, "normal");

		        $(".player").data("player-chosen", "yes");

		    } //end if
	    	else if (!(defeatedOpp) && (!(starwars.selPlayer === starwars.selChars[chosenPlayerId]))) {
    			starwars.selEnemy = starwars.selChars[chosenPlayerId];
    			starwars.selEnemyIndex = chosenPlayerId;

    			$(".player").data("vs-chosen", "yes");

    			starwars.createBattlefield();
    
	    		} //end else if
	    	} //end if not gameover

      }); // close player.onclick

$(document).on("click", ".btn-attack", function() { 

	// Hit Enemy and inflict damage equal to Player's Attack Points
	// Increase Player's Attack Points by Attack Points Increment for next Attack
	// Check to see if Enemy has been defeated
	// If Enemy is not defeated, Enemy will Counter Attack and inflict damage equal to Counter Attack Points
	// Check to see if Player has been defeated

	starwars.selEnemy.hp -= starwars.selPlayer.ap

	
	if (starwars.selEnemy.hp > 0) {
		//update Enemy card
		$("div.enemyfighter").children("div.hp").html("<p>HP: " + starwars.selEnemy.hp + "</p>");
		//alert Player of results
		$("div.battleground-messages").html("<p class = \"battleground-message\">" + starwars.selPlayer.name + " Attacked " + 
			starwars.selEnemy.name + " and caused " + starwars.selPlayer.ap + " points of damage!")
		// icrease attack power for next attack
		starwars.selPlayer.ap += starwars.selPlayer.api
		//counter-attack
		starwars.selPlayer.hp -= starwars.selEnemy.cap
		//alert Player of results
		$("div.battleground-messages").append("<p class = \"battleground-message\">" + starwars.selEnemy.name + " Counter Attacked " + 
			starwars.selPlayer.name + " and caused " + starwars.selEnemy.cap + " points of damage!")

		if (starwars.selPlayer.hp <= 0) {
			starwars.selPlayer.hp = 0;
			// process player loss
			starwars.gameoverSeq("loss");

			//Game Over
		}

		$("div.playerfighter").children("div.hp").html("<p>HP: " + starwars.selPlayer.hp + "</p>");
	}
	else { // Enemy has been defeated
		starwars.selEnemy.hp = 0;
		// increase attack power for next attack
		starwars.selPlayer.ap += starwars.selPlayer.api;
		//update Enemy card
		$("div.enemyfighter").children("div.hp").html("<p>HP: " + starwars.selEnemy.hp + "</p>");
		//update cards and close window via retreat button click
		//Mark Enemy as being defeated in the opponent area
		//Check to see if Player has won the game		
		starwars.wins += 1;
		if (starwars.wins === 3) {
			//Player has won the game, initiate game over win sequence
			starwars.gameoverSeq("win");
		} else { // Player has defeated opponent
			//show close button will allow player to select a new opponent
			starwars.enemyDefeated();
		};
	};

}); // close btn-attack.onclick


$(document).on("click", ".btn-retreat", function() { 

	starwars.updatePlayerCards();

}); // close btn-retreat.onclick

$(document).on("click", ".btn-restart", function() {

	starwars.resetGame();
	starwars.writeChosenCharacters();

}); // close btn-restart.onclick

$(document).on("click", ".btn-newgame", function() {

	starwars.resetGame();
	starwars.chooseCharacters();
	starwars.writeChosenCharacters();


}); // close btn-newgame.onclick


}); // close of document.ready 
