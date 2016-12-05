
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
		charAttribsL1: 
					  [char1 = {health: 120, attack: 12, attackinc: 12, counteratt: 5},
					   char2 = {health: 100, attack: 10, attackinc: 10, counteratt: 20},
					   char3 = {health: 150, attack: 6, attackinc: 6, counteratt: 25},
					   char4 = {health: 180, attack: 4, attackinc: 4, counteratt: 15}],
		charAttribsL2:
					  [char1 = {health: 275, attack: 14, attackinc: 14, counteratt: 39},
					   char2 = {health: 245, attack: 11, attackinc: 11, counteratt: 35},
					   char3 = {health: 315, attack: 8, attackinc: 8, counteratt: 30},
					   char4 = {health: 360, attack: 9, attackinc: 9, counteratt: 20}],
		charAttribsL3:
					  [char1 = {health: 500, attack: 15, attackinc: 15, counteratt: 65},
					   char2 = {health: 430, attack: 16, attackinc: 16, counteratt: 55},
					   char3 = {health: 540, attack: 13, attackinc: 13, counteratt: 37},
					   char4 = {health: 570, attack: 20, attackinc: 20, counteratt: 20}],
		
		CharactersL1: 
					[obiwan = {name: "Obi-Wan Kenobi", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Old Obi Wan.png", imgfightp: "Old Obi Wan.png", imgfighte: "Old Obi WanE.png", imgwin: "", imglose: "",
					readySound: "More powerful.mp3", attackSound: "ls_hit2.mp3", deadSound: "The Force will be with you.mp3",
					readySprite: {imgName: "obiwan_ready.png", numFrames: 5}, attackSprite: {imgName: "obiwan_attack.png", numFrames: 11},
					deadSprite: {imgName: "obiwan_dead.png", numFrames: 6}, readySpriteE: {imgName: "obiwan_ready01E.png", numFrames: 5}, 
					attackSpriteE: {imgName: "obiwan_attack01E.png", numFrames: 11}, deadSpriteE: {imgName: "obiwan_dead01E.png", numFrames: 6} 
					},
					r2d2 = {name: "R2-D2", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "R2D2 02.png", imgfightp: "R2D2 01.png", imgfighte: "R2D2 01E.png", imgwin: "", imglose: "",
					readySound: "r2d2_tone.mp3", attackSound: "r2d2_testy.mp3", deadSound: "r2d2_freakout.mp3",
					readySprite: {imgName: "r2d2_ready.png", numFrames: 11}, attackSprite: {imgName: "r2d2_attack.png", numFrames: 6},
					deadSprite: {imgName: "r2d2_dead.png", numFrames: 11}, readySpriteE: {imgName: "r2d2_ready01E.png", numFrames: 11},
					attackSpriteE: {imgName: "r2d2_attack01E.png", numFrames: 6}, deadSpriteE: {imgName: "r2d2_dead01E.png", numFrames: 11}
					},
					yoda = {name: "Yoda", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Yoda 02.png", imgfightp: "Yoda 01.png", imgfighte: "Yoda 01E.png", imgwin: "", imglose: "",
					readySound: "yoda_helpyouyes.mp3", attackSound: "ls_hit5.mp3", deadSound: "yoda_ahhohh.mp3",
					readySprite: {imgName: "yoda_ready.png", numFrames: 5}, attackSprite: {imgName: "yoda_attack.png", numFrames: 17},
					deadSprite: {imgName: "yoda_dead.png", numFrames: 3}, readySpriteE: {imgName: "yoda_ready01E.png", numFrames: 5}, 
					attackSpriteE: {imgName: "yoda_attack01E.png", numFrames: 17}, deadSpriteE: {imgName: "yoda_dead01E.png", numFrames: 3} 
					},
					ewok = {name: "Ewok", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Ewoks.png", imgfightp: "Wicket Warrick.png", imgfighte: "Wicket WarrickE.png", imgwin: "", imglose: "",
					readySound: "ewoks.mp3", attackSound: "ewoks.mp3", deadSound: "ewok_d.mp3",
					readySprite: {imgName: "ewok_ready.png", numFrames: 10}, attackSprite: {imgName: "ewok_attack.png", numFrames: 6},
					deadSprite: {imgName: "ewok_dead.png", numFrames: 3}, readySpriteE: {imgName: "ewok_ready01E.png", numFrames: 10}, 
					attackSpriteE: {imgName: "ewok_attack01E.png", numFrames: 6},  deadSpriteE: {imgName: "ewok_dead01E.png", numFrames: 3}
					},
					storm = {name: "Storm Trooper", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Stormtrooper 02.png", imgfightp: "Stormtrooper 02.png", imgfighte: "Stormtrooper 02E.png", imgwin: "", imglose: "",
					readySound: "Its them.mp3", attackSound: "stormtroopblaster.mp3", deadSound: "Open the blast doors.mp3",
					readySprite: {imgName: "storm_ready.png", numFrames: 3}, attackSprite: {imgName: "storm_attack.png", numFrames: 6},
					deadSprite: {imgName: "storm_dead.png", numFrames: 3}, readySpriteE: {imgName: "storm_ready01E.png", numFrames: 3}, 
					attackSpriteE: {imgName: "storm_attack01E.png", numFrames: 6},  deadSpriteE: {imgName: "storm_dead01E.png", numFrames: 3}
					}],
		CharactersL2:			
					[chewy = {name: "Chewbacca", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Chewbacca.png", imgfightp: "chewy.png", imgfighte: "chewyE.png", imgwin: "", imglose: "",
					readySound: "chewy_aaahhhhwwawahh.mp3", attackSound: "chewyblaster.mp3", deadSound: "chewy_argh.mp3",
					readySprite: {imgName: "chewy_ready.png", numFrames: 4}, attackSprite: {imgName: "chewy_attack.png", numFrames: 10},
					deadSprite: {imgName: "chewy_dead.png", numFrames: 3}, readySpriteE: {imgName: "chewy_ready01E.png", numFrames: 4}, 
					attackSpriteE: {imgName: "chewy_attack01E.png", numFrames: 10}, deadSpriteE: {imgName: "chewy_dead01E.png", numFrames: 3} 
					},
					han = {name: "Han Solo", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Han Solo 01.png", imgfightp: "Han Solo 02.png", imgfighte: "Han Solo 02E.png", imgwin: "", imglose: "",
					readySound: "han_badfeeling.mp3", attackSound: "hsoloblaster.mp3", deadSound: "han_owww.mp3",
					readySprite: {imgName: "hansolo_ready.png", numFrames: 7}, attackSprite: {imgName: "hansolo_attack.png", numFrames: 14},
					deadSprite: {imgName: "hansolo_dead.png", numFrames: 3}, readySpriteE: {imgName: "hansolo_ready01E.png", numFrames: 7}, 
					attackSpriteE: {imgName: "hansolo_attack01E.png", numFrames: 14}, deadSpriteE: {imgName: "hansolo_dead01E.png", numFrames: 3} 
					},
					boba = {name: "Boba Fett", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Boba Fett.png", imgfightp: "Boba Fett.png", imgfighte: "Boba FettE.png", imgwin: "", imglose: "",
					readySound: "bobajets.mp3", attackSound: "bobablaster.mp3", deadSound: "I am Boba Fett.mp3",
					readySprite: {imgName: "bobba_ready.png", numFrames: 3}, attackSprite: {imgName: "bobba_attack.png", numFrames: 8},
					deadSprite: {imgName: "bobba_dead.png", numFrames: 3}, readySpriteE: {imgName: "bobba_ready01E.png", numFrames: 3}, 
					attackSpriteE: {imgName: "bobba_attack01E.png", numFrames: 8},  deadSpriteE: {imgName: "bobba_dead01E.png", numFrames: 3}
					},
					jabba = {name: "Jabba the Hut", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Java the Hutt.png", imgfightp: "Java the Hutt.png", imgfighte: "Java the HuttE.png", imgwin: "", imglose: "",
					readySound: "jabba_oooohhh.mp3", attackSound: "jabba_hahahhohoho.mp3", deadSound: "jabba_wetsnort.mp3",
					readySprite: {imgName: "jabba_ready.png", numFrames: 8}, attackSprite: {imgName: "jabba_attack.png", numFrames: 8},
					deadSprite: {imgName: "jabba_dead.png", numFrames: 3}, readySpriteE: {imgName: "jabba_ready01E.png", numFrames: 8}, 
					attackSpriteE: {imgName: "jabba_attack01E.png", numFrames: 8},  deadSpriteE: {imgName: "jabba_dead01E.png", numFrames: 3}
					}],
		CharactersL3:
					[luke = {name: "Luke Skywalker", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Luke Skywalker 03.png", imgfightp: "Luke Skywalker 01.png", imgfighte: "Luke Skywalker 01E.png", imgwin: "", imglose: "",
					readySound: "ls_powerup2.mp3", attackSound: "ls_hit4.mp3", deadSound: "luke_noooo.mp3",
					readySprite: {imgName: "luke_ready.png", numFrames: 7}, attackSprite: {imgName: "luke_attack.png", numFrames: 10},
					deadSprite: {imgName: "luke_dead.png", numFrames: 4}, readySpriteE: {imgName: "luke_ready01E.png", numFrames: 7}, 
					attackSpriteE: {imgName: "luke_attack01E.png", numFrames: 10}, deadSpriteE: {imgName: "luke_dead01E.png", numFrames: 4} 
					},
					leia = {name: "Princess Leia", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Leia.png", imgfightp: "Leia.png", imgfighte: "Leia.png", imgwin: "", imglose: "",
					readySound: "Do as I tell you.mp3", attackSound: "leiablaster.mp3", deadSound: "Help me Obi Wan.mp3",
					readySprite: {imgName: "leia_ready.png", numFrames: 4}, attackSprite: {imgName: "leia_attack.png", numFrames: 12},
					deadSprite: {imgName: "leia_dead.png", numFrames: 3}, readySpriteE: {imgName: "leia_ready01E.png", numFrames: 4}, 
					attackSpriteE: {imgName: "leia_attack01E.png", numFrames: 12}, deadSpriteE: {imgName: "leia_dead01E.png", numFrames: 3} 
					},
					emperor = {name: "The Emperor", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "emperor.png", imgfightp: "emperor.png", imgfighte: "emperorE.png", imgwin: "", imglose: "",
					readySound: "emperor_fullpower.mp3", attackSound: "Electric.mp3", deadSound: "imperial.mp3",
					readySprite: {imgName: "emperor_ready.png", numFrames: 4}, attackSprite: {imgName: "emperor_attack.png", numFrames: 9},
					deadSprite: {imgName: "emperor_dead.png", numFrames: 3}, readySpriteE: {imgName: "emperor_ready01E.png", numFrames: 4}, 
					attackSpriteE: {imgName: "emperor_attack01E.png", numFrames: 9},  deadSpriteE: {imgName: "emperor_dead01E.png", numFrames: 3}
					},					
					vader = {name: "Darth Vader", type: "dark", hp: 0, ap: 0, api: 0,  cap: 0, 
					imgrdy: "Vader 01.png", imgfightp: "Vader 03.png", imgfighte: "Vader 03E.png", imgwin: "", imglose: "",
					readySound: "dv_dontknowpowerdarkside.mp3", attackSound: "ls_hit5.mp3", deadSound: "dv_nooooooooo.mp3",
					readySprite: {imgName: "vader_ready.png", numFrames: 7}, attackSprite: {imgName: "vader_attack.png", numFrames: 12},
					deadSprite: {imgName: "vader_dead.png", numFrames: 6}, readySpriteE: {imgName: "vader_ready01E.png", numFrames: 7}, 
					attackSpriteE: {imgName: "vader_attack01E.png", numFrames: 12}, deadSpriteE: {imgName: "vader_dead01E.png", numFrames: 6} 
					}],

		charsShuffled:[],
		attribsShuffled: [],
	   	selChars: [],
		selPlayer: {},
		selPlayerIndex: 0,
		selEnemy: {},
		selEnemyIndex: 0,
		Wins: 0,
		characterWins: 0,
		char0Victorious: false,
		char1Victorious: false,
		char2Victorious: false,
		char3Victorious: false,
		gameLevel: 0,
		GameOver: false,
		gamePlayerChosen: false,
		gameVSchosen: false,
		bgindex: 0,
		mdbgindex: 0,

		initial: function() {
			$(".battleground-messages").empty()
			$(".gameover-messages").empty()
			this.gameLevel = 1;
			this.chooseCharacters();
			this.writeChosenCharacters();
			this.wins = 0;
			this.characterWins = 0;
			this.GameOver = false;
			this.displayLevel();
		},

		displayLevel: function() {

			var levelAudio  = new Audio;

			switch (this.gameLevel) {
				case 1:
					levelAudio.src = "assets/audio/maintheme.mp3";
					break;
				case 2:
					levelAudio.src = "assets/audio/maintheme.mp3";
					break;
				case 3:
					levelAudio.src = "assets/audio/imperial.mp3";
					break;
			}

			levelAudio.play();

			$(".level").html("Level " + this.gameLevel);
			// $(".level").css({"display":"inline-block"});
			// $("#logo").css({"display":"inline-block"});
			$(".level").fadeIn(2000, "swing").delay(3000).fadeOut();
			$("#logo").fadeIn(500).delay(4500).fadeOut();

		},

        animatePlayer: function(spriteState) {

        	var framesP = 0;
        	var imgP = "";
        	var framesE = 0;
        	var imgE = "";
        	var soundP = "";
        	var soundE = "";

        	switch (spriteState) {

        		case "readySprite":
        			framesP = this.selPlayer.readySprite.numFrames
        			imgP = "assets/images/sprites/" + this.selPlayer.readySprite.imgName
        			soundP = this.selPlayer.readySound
        			framesE = this.selEnemy.readySpriteE.numFrames
        			imgE = "assets/images/sprites/" + this.selEnemy.readySpriteE.imgName
        			soundE = this.selEnemy.readySound
        			break;
        		case "attackSprite":
        			framesP = this.selPlayer.attackSprite.numFrames
        			imgP = "assets/images/sprites/" + this.selPlayer.attackSprite.imgName
        			soundP = this.selPlayer.attackSound
        			framesE = this.selEnemy.attackSpriteE.numFrames
        			imgE = "assets/images/sprites/" + this.selEnemy.attackSpriteE.imgName
        			soundE = this.selEnemy.attackSound
        			break;
        		case "deadSpriteP":
        			framesP = this.selPlayer.deadSprite.numFrames
        			imgP = "assets/images/sprites/" + this.selPlayer.deadSprite.imgName
        			soundP = this.selPlayer.deadSound
        			framesE = this.selEnemy.attackSpriteE.numFrames
        			imgE = "assets/images/sprites/" + this.selEnemy.attackSpriteE.imgName
        			soundE = this.selEnemy.attackSound
        			break;
        		case "deadSpriteE":
        			framesP = this.selPlayer.attackSprite.numFrames
        			imgP = "assets/images/sprites/" + this.selPlayer.attackSprite.imgName
        			soundP = this.selPlayer.attackSound
        			soundE = this.selEnemy.deadSound
        			framesE = this.selEnemy.deadSpriteE.numFrames
        			imgE = "assets/images/sprites/" + this.selEnemy.deadSpriteE.imgName
        			break;
         	}

        	$("#playerspritediv").empty();

        	var canvasP = $("<canvas>").attr("id", "playersprite");
			$("#playerspritediv").append(canvasP);

			var $canvasP = $("#playersprite");

			$canvasP.spriteAnimate({
  			frameWidth: 120,
  			frameHeight: 100,
  			fps: 7,
  			loop: false,
  			numberOfFrames: framesP,
  			imgSrc: imgP,
			});

			// $canvasP.spriteAnimate("play");

        	$("#enemyspritediv").empty();

        	var canvasE = $("<canvas>").attr("id", "enemysprite");
			$("#enemyspritediv").append(canvasE);

			var $canvasE = $("#enemysprite");

			$canvasE.spriteAnimate({
  			frameWidth: 120,
  			frameHeight: 100,
  			fps: 5,
  			loop: false,
  			numberOfFrames: framesE,
  			imgSrc: imgE,
			});

			var audioP = new Audio;
			var audioE = new Audio;

			audioP.src = "assets/audio/" + soundP;
			audioE.src = "assets/audio/" + soundE;

			switch (spriteState) {

        		case "readySprite":
        			$canvasP.spriteAnimate("play");
					audioP.onended = (function() {
										audioE.play()
										$canvasE.spriteAnimate("play")
										})
					audioP.play()
        			break;
        		case "attackSprite":
        			$canvasP.spriteAnimate("play");
        			$canvasE.spriteAnimate("play");
        			audioP.play()
        			audioE.play()
        			break;
        		case "deadSpriteP":
        			$canvasP.spriteAnimate("play");
        			$canvasE.spriteAnimate("play");
        			audioE.onended = (function() {audioP.play()})
        			audioE.play()
        			break;
        		case "deadSpriteE":
        			$canvasP.spriteAnimate("play");
        			$canvasE.spriteAnimate("play");
					audioP.onended = (function() {audioE.play()})
					audioP.play()
        			break;
         	};

        },          

		initSelChars: function() {

			//empty out the selChars array. new characters will be pushed below.
			this.selChars = [];

			//initialize attributes to original level values

			for (var i = 0; i < 4; i++) {

				this.charsShuffled[i].hp = this.attribsShuffled[i].health;
				this.charsShuffled[i].ap = this.attribsShuffled[i].attack;
				this.charsShuffled[i].api = this.attribsShuffled[i].attackinc;
				this.charsShuffled[i].cap = this.attribsShuffled[i].counteratt;

				this.selChars.push(this.charsShuffled[i]);
			};

		},

		chooseCharacters: function() {

			switch (this.gameLevel) {

				case 1:
					this.charsShuffled = shuffleArray(this.CharactersL1);	
					this.attribsShuffled = shuffleArray(this.charAttribsL1);
					break;	
				case 2:
					this.charsShuffled = shuffleArray(this.CharactersL2);
					this.attribsShuffled = shuffleArray(this.charAttribsL2);		
					break;	
				case 3:
					this.charsShuffled = shuffleArray(this.CharactersL3);
					this.attribsShuffled = shuffleArray(this.charAttribsL3);		
					break;	
			}
			
			

			this.initSelChars();
		},

		writeChosenCharacters: function() {

			var playerClass = "";

			for (var i = 0; i < 4; i++) {
				playerClass = "player" + i.toString();
				var newPlayerDiv = $("<div>").addClass("flex-container player " + playerClass)
				    .attr("id", this.selChars[i].type).attr("data-player-chosen", "no").attr("data-vs-chosen", "no")
				    .attr("data-player-id", i).attr("data-defeated", false).attr("data-victorious", false)
				    .attr("data-type", this.selChars[i].type)

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

		}, // end writeChooseCharacters

		createBattlefield: function() {

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

			//use a setTimeout to delay the ready animation to allow for the modal to drop in before animation begins
			setTimeout(function() {starwars.animatePlayer("readySprite")}, 1000);


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
			//If user has won with all four characters, then user must go to next level 
			//If user won but has not completed the level, then user must replay with different character
			//If user lost, then user must restart level
			
			var gameoverButtonsDiv = $("<div>").addClass("button-group")

			if (results === "loss") {
				var gameoverMessage = "<h3>" + this.selPlayer.name + " has been defeated!<br><br>" +
				"Press the Replay button to play this game again.</h3><br><br>";
				var gameoverHTML = "<p class = \"gameoverFlash text-center\">Game Over!</p><br>"
				var gameoverModalMsg = this.selPlayer.name + " has been defeated by " + this.selEnemy.name;

				var PlayerDefDiv = $("<div>").addClass("text-center").html("<p class=\"defeated\">DEFEATED</p>");

				$(".playerfighter").append(PlayerDefDiv);

				var replayButton = $("<button>").attr("type", "button").addClass("btn btn-lg btn-gameover btn-replay").text("Replay");
				gameoverButtonsDiv.append(replayButton);

			} else if (this.characterWins < 4) { // results = win, level not complete

				//update player with being victorious

				switch (this.selPlayerIndex) {

					case 0: this.char0Victorious = true;
					break;

					case 1: this.char1Victorious = true;
					break;

					case 2: this.char2Victorious = true;
					break;

					case 3: this.char3Victorious = true;
					break;

				}

				var gameoverMessage = "<h3>" + this.selPlayer.name + " has defeated all opponents!<br><br>" +
				"Press the Continue button to play this game again with a different character.<br>" +
				"Once you have won this game with all four characters, you can move on to the next level!</h3><br><br>";
				var gameoverHTML = "<p class = \"gameoverFlash text-center\">You Won!</p><br>"
				var gameoverModalMsg = this.selPlayer.name + " has defeated all opponents!";

				var EnemyDefDiv = $("<div>").addClass("text-center").html("<p class=\"defeated\">DEFEATED</p>");

				$(".enemyfighter").append(EnemyDefDiv);

				var replayButton = $("<button>").attr("type", "button").addClass("btn btn-lg btn-gameover btn-replay").text("Continue");
				gameoverButtonsDiv.append(replayButton);

			} else { //results = win, level complete!
				var gameoverMessage = "<h3> Congratulations! " + this.selPlayer.name + " has defeated all opponents " + 
				"and you have won with all four characters!!<br>" +
				"Press the Next Level button to play with the next set of characters and environments!<br></h3><br><br>";
				var gameoverHTML = "<p class = \"gameoverFlash text-center\">You Won!</p><br>"
				var gameoverModalMsg = this.selPlayer.name + " has defeated all opponents!";

				var EnemyDefDiv = $("<div>").addClass("text-center").html("<p class=\"defeated\">DEFEATED</p>");

				$(".enemyfighter").append(EnemyDefDiv);

				var nextlevelButton = $("<button>").attr("type", "button").addClass("btn btn-lg btn-gameover btn-nextlevel").text("Next Level");
				gameoverButtonsDiv.append(nextlevelButton);				
			}

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

    	   	$("body").css({"background-image": "url("+imgs[this.bgindex]+")"});
    	},

		changeModalBackground: function (){
    		var imgs = [
            	"assets/images/backdrop07.jpg",
            	"assets/images/backdrop01.jpg",
            	"assets/images/backdrop08.jpg"
        		];

        	this.mdbgindex +=1
        	if (this.mdbgindex >= imgs.length) {
        		this.mdbgindex = 0;
        	};

    	   	$(".battleground-body").css({"background-image":"url("+imgs[this.mdbgindex]+")"});
    	},

    	updateVictoriousCharacters: function() {

    		if (this.char0Victorious) {
    			var Player0VicDiv = $("<div>").addClass("text-center flex-victorious").html("<p class=\"victorious\">VICTORIOUS</p>");
    			$("div.player0").data("victorious", true);
    			$("div.player0").append(Player0VicDiv);	
    		}

    		if (this.char1Victorious) {
    			var Player1VicDiv = $("<div>").addClass("text-center flex-victorious").html("<p class=\"victorious\">VICTORIOUS</p>");
    			$("div.player1").data("victorious", true);
    			$("div.player1").append(Player1VicDiv);	
    		}

    		if (this.char2Victorious) {
    			var Player2VicDiv = $("<div>").addClass("text-center flex-victorious").html("<p class=\"victorious\">VICTORIOUS</p>");
    			$("div.player2").data("victorious", true);
    			$("div.player2").append(Player2VicDiv);	
    		}
    		
    		if (this.char3Victorious) {
    			var Player3VicDiv = $("<div>").addClass("text-center flex-victorious").html("<p class=\"victorious\">VICTORIOUS</p>");
    			$("div.player3").data("victorious", true);
    			$("div.player3").append(Player3VicDiv);	
    		}

    	},

    	resetGame: function() {

			$(".main-messages").empty();
			$(".chooseplyr").empty();
			$(".chooseopphdr").empty();
			$(".battleground-messages").empty();
			$(".gameover-messages").empty();    
			this.wins = 0;
			this.GameOver = false;		
			this.gamePlayerChosen = false;
			this.gameVSchosen = false;

    	},

		replayGame: function() {
			//We replay a game if a player has won with 0 -3 characters
			//Update players that have been victorious - can not be selected again

			this.resetGame();
			this.initSelChars();
			this.writeChosenCharacters();
			this.updateVictoriousCharacters();

		},

		nextLevel: function() {

			if (this.gameLevel < 3) {
			this.gameLevel += 1;
			} 
			else {
				this.gameLevel = 1;
			};

			this.characterWins = 0;
			this.char0Victorious = false;
			this.char1Victorious = false;
			this.char2Victorious = false;
			this.char3Victorious = false;
			this.resetGame();
			this.changeBackground();
			this.changeModalBackground();
			this.chooseCharacters();
			this.writeChosenCharacters();
			this.displayLevel();
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
			var playerVictorious = ($(this).data("victorious"));

			
			if ((!(starwars.gamePlayerChosen)) && (!(playerVictorious)))  {
				$(".chooseopphdr").append("<h1>Choose Your Opponent</h1>");
				starwars.selPlayer = starwars.selChars[chosenPlayerId];
				starwars.selPlayerIndex = chosenPlayerId;
				var leftpx = 0;
				var siblings = $(this).siblings();
				$(siblings).each(function() {
					$(this).children(".flex-victorious").empty();
					$(this).children("div").removeClass("flex-victorious");
					$(this).animate({ top: "+=360px" }, "normal");
					$(this).animate({ left: leftpx }, "normal");
					leftpx += 210;
				});

		        $(this).animate({ left: "0px" }, "normal");

		        // $(".player").data("player-chosen", "yes");
		        $(this).data("player-chosen", "yes");
		        starwars.gamePlayerChosen = true;
		    } //end if
	    	else if ((starwars.gamePlayerChosen) && !(defeatedOpp) && (!(starwars.selPlayer === starwars.selChars[chosenPlayerId]))) {
    			starwars.selEnemy = starwars.selChars[chosenPlayerId];
    			starwars.selEnemyIndex = chosenPlayerId;

    			// $(".player").data("vs-chosen", "yes");
    			$(this).data("vs-chosen", "yes");
    			starwars.gameVSchosen = true;

	        	$("#playerspritediv").empty();
	        	$("#enemyspritediv").empty();

	        	$("#playersounddiv").empty();
	        	$("#enemysounddiv").empty();

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

	starwars.animatePlayer("attackSprite");

	starwars.selEnemy.hp -= starwars.selPlayer.ap;

	
	if (starwars.selEnemy.hp > 0) {
		//update Enemy card
		$("div.enemyfighter").children("div.hp").html("<p>HP: " + starwars.selEnemy.hp + "</p>");
		//alert Player of results
		$("div.battleground-messages").html("<p class = \"battleground-message\">" + starwars.selPlayer.name + " Attacked " + 
			starwars.selEnemy.name + " and caused " + starwars.selPlayer.ap + " points of damage!")
		// increase attack power for next attack
		starwars.selPlayer.ap += starwars.selPlayer.api
		//counter-attack
		starwars.selPlayer.hp -= starwars.selEnemy.cap
		//alert Player of results
		$("div.battleground-messages").append("<p class = \"battleground-message\">" + starwars.selEnemy.name + " Counter Attacked " + 
			starwars.selPlayer.name + " and caused " + starwars.selEnemy.cap + " points of damage!")

		if (starwars.selPlayer.hp <= 0) {
			starwars.selPlayer.hp = 0;
			// process player loss
			starwars.animatePlayer("deadSpriteP");
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

		starwars.animatePlayer("deadSpriteE");

		//update cards and close window via retreat button click
		//Mark Enemy as being defeated in the opponent area
		//Check to see if Player has won the game		
		starwars.wins += 1;
		if (starwars.wins === 3) {
			//Player has won the game, initiate game over win sequence
			starwars.characterWins += 1;
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

$(document).on("click", ".btn-replay", function() {
	//
	starwars.replayGame();

}); // close btn-replay.onclick

$(document).on("click", ".btn-nextlevel", function() {

	starwars.nextLevel();

}); // close btn-nextlevel.onclick

$(document).on("mouseover", ".player", function() { 
	
	var playerChosen = ($(this).data("player-chosen"));
	var defeatedOpp = ($(this).data("defeated"));
	var playerType = ($(this).data("type"));

	if ((playerChosen === "no") && (defeatedOpp === false)) {
		if (playerType === "rebel") {
			$(this).children("div").children("img").glow({ radius: "20", color:"green"});
		} else {
			$(this).children("div").children("img").glow({ radius: "20", color:"red"});
		}
	}

}); // close player on mouseover

$(document).on("mouseout", ".player", function() { 
	
	var playerChosen = ($(this).data("player-chosen"));
	var defeatedOpp = ($(this).data("defeated"));
	var playerType = ($(this).data("type"));

	if ((playerChosen === "no") && (defeatedOpp === false)) {
		$(this).children("div").children("img").glow({ disable:true });
	}

}); // close player on mouseover

$(document).on("click", "#help", function() {

	$("#helpModal").modal({
		backdrop: "static",
		keyboard: false});


}); // close help.onclick


}); // close of document.ready 
