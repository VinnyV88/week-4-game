
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
	 */
	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	};

	var charsShuffled = [];
	var charsSelected = [];
	var attribsShuffled = [];

	var starwars = {
		charAttribs: [char1 = {health: 120, attack: 8, attackinc: 8, counteratt: 15},
					  char2 = {health: 100, attack: 10, attackinc: 10, counteratt: 5},
					  char3 = {health: 150, attack: 6, attackinc: 6, counteratt: 20},
					  char4 = {health: 180, attack: 4, attackinc: 4, counteratt: 25}
					 ],
		Characters: [obiwan = {name: "Obi-Wan Kenobi", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Old Obi Wan.png", imgfight: "Old Obi Wan.png", imgwin: "", imglose: ""},
					luke = {name: "Luke Skywalker", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Luke Skywalker 03.png", imgfight: "Luke Skywalker 01.png", imgwin: "", imglose: ""},
					leia = {name: "Princess Leia", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Leia.png", imgfight: "Padme Amidala.png", imgwin: "", imglose: ""},
					chewy = {name: "Chewbacca", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Chewbacca.png", imgfight: "chewy.png", imgwin: "", imglose: ""},
					han = {name: "Han Solo", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Han Solo 01.png", imgfight: "Han Solo 02.png", imgwin: "", imglose: ""},
					yoda = {name: "Yoda", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Yoda 01.png", imgfight: "yoda_w_sabre.png", imgwin: "", imglose: ""},
					boba = {name: "Boba Fett", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Boba Fett.png", imgfight: "Boba Fett.png", imgwin: "", imglose: ""},
					r2d2 = {name: "R2-D2", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "R2D2 02.png", imgfight: "R2D2 01.png", imgwin: "", imglose: ""},
					vader = {name: "Darth Vader", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Vader 01.png", imgfight: "Vader 03.png", imgwin: "", imglose: ""},
					maul = {name: "Darth Maul", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Darth Maul 02.png", imgfight: "Darth Maul 01.png", imgwin: "", imglose: ""},
					c3po = {name: "C-3PO", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "C3PO.png", imgfight: "C3PO.png", imgwin: "", imglose: ""},
					jabba = {name: "Jabba the Hut", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Java the Hutt.png", imgfight: "Java the Hutt.png", imgwin: "", imglose: ""},
					emperor = {name: "The Emperor", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "emperor.png", imgfight: "emperor.png", imgwin: "", imglose: ""},
					ewok = {name: "Ewok", type: "rebel", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Wicket Warrick.png", imgfight: "Ewoks.png", imgwin: "", imglose: ""},
					storm = {name: "Storm Trooper", type: "dark", hp: 0, ap: 0, api: 0, cap: 0, 
					imgrdy: "Stormtrooper 02.png", imgfight: "Stormtrooper 02.png", imgwin: "", imglose: ""}
				   ],
	   	selChars: [],
		selPlayer: {},
		selEnemy: {},

		initial: function() {
			this.chooseCharacters();
			this.writeChosenCharacters();
		},

		chooseCharacters: function() {
			charsShuffled = shuffleArray(this.Characters);
			attribsShuffled = shuffleArray(this.charAttribs);

			for (var i = 0; i < 4; i++) {

				charsShuffled[i].hp = attribsShuffled[i].health;
				charsShuffled[i].ap = attribsShuffled[i].attack;
				charsShuffled[i].api = attribsShuffled[i].attackinc;
				charsShuffled[i].cap = attribsShuffled[i].counteratt;

				this.selChars.push(charsShuffled[i]);
			};
		},

		writeChosenCharacters: function() {

			var playerClass = "";

			for (var i = 1; i <= 4; i++) {
				playerClass = "player" + i.toString();
				var newPlayerDiv = $("<div>").addClass("flex-container player " + playerClass)
				    .attr("id", this.selChars[i-1].type).attr("data-player-chosen", "no").attr("data-vs-chosen", "no")
				    .attr("data-player-id", i-1)


				// $(".chooseplyr").append(newPlayerDiv);

				var newPlayerNameDiv = $("<div>").addClass("text-center flex-item playerName");
				
				var newNameP = $("<p>").text(this.selChars[i-1].name);
				

				// $(playerClass).append(newPlayerNameDiv);

				var newPlayerImgDiv = $("<div>").addClass("flex-item");
				
				var newImg = $("<img>").attr("style", "width:100%")
				    .attr("src", "assets/images/" + this.selChars[i-1].imgrdy).attr("alt", "Player " + i);

				var newPlayerHPDiv = $("<div>").addClass("text-center flex-item hp");
				
				newHPp = $("<p>").text("HP: " + this.selChars[i-1].hp);
				
				newPlayerNameDiv.append(newNameP);
				newPlayerDiv.append(newPlayerNameDiv);
				
				newPlayerImgDiv.append(newImg);
				newPlayerDiv.append(newPlayerImgDiv);

				newPlayerHPDiv.append(newHPp);
				newPlayerDiv.append(newPlayerHPDiv);

				$(".chooseplyr").append(newPlayerDiv);

			} // end for loop

		} // end writeChoosePlayer

	}; // end starwars game object


starwars.initial()

	$(".player").on("click", function() {
		//When a player is picked, move him to the left most position
		//Move the other players (siblings) to the Opponents area
		var playerChosen = ($(this).data("player-chosen"));
		var vsChosen = ($(this).data("vs-chosen"));
		var chosenPlayerId = ($(this).data("player-id"));

		if (playerChosen === "no") {
			starwars.selPlayer = starwars.selChars[chosenPlayerId];
			var leftpx = 0;
			var siblings = $(this).siblings();
			$(siblings).each(function() {
				$(this).animate({ top: "+=400px" }, "normal");
				$(this).animate({ left: leftpx }, "normal");
				leftpx += 210;
			});

	        $(this).animate({ left: "0px" }, "normal");

	        $(".player").data("player-chosen", "yes");

	    } //end if
    	else if (vsChosen === "no") {
    		if (!(starwars.selPlayer === starwars.selChars[chosenPlayerId])) {
    			starwars.selEnemy = starwars.selChars[chosenPlayerId];

    			$(".player").data("vs-chosen", "yes");

    			alert("start battle: " + starwars.selPlayer.name + " vs. " + starwars.selEnemy.name);

    		}
    	}

	    // console.log($(".player1").data("player-chosen"));
	    // console.log($(".player2").data("player-chosen"));
	    // console.log($(".player3").data("player-chosen"));
	    // console.log($(".player4").data("player-chosen"));


      });



}); // close of document.ready 
