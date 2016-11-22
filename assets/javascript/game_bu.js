               <div class="flex-container player player1" id="rebel">
                    <div class="text-center flex-item playerName">
                        <p>Luke Skywalker</p>
                    </div>
                    <div class="flex-item">
                        <img style="width:100%" src="assets/images/Luke Skywalker 01.png" alt="Player 1">
                    </div>
                    <div class="text-center flex-item hp">
                        <p>HP: 100</p>
                    </div>
                </div>
                <div class="flex-container player player2" id="rebel">
                    <div class="text-center flex-item playerName">
                        <p>Han Solo</p>
                    </div>
                    <div class="flex-item">
                        <img style="width:100%" src="assets/images/Han Solo 02.png" alt="Player 2">
                    </div>
                    <div class="text-center flex-item hp">
                        <p>HP: 120</p>
                    </div>
                </div>
                <div class="flex-container player player3" id="dark">
                    <div class="text-center flex-item playerName">
                        <p>Darth Maul</p>
                    </div>
                    <div class="flex-item">
                        <img style="width:100%" src="assets/images/Darth Maul 01.png" alt="Player 3">
                    </div>
                    <div class="text-center flex-item hp">
                        <p>HP: 150</p>
                    </div>
                </div>
                <div class="flex-container player player4" id="dark">
                    <div class="text-center flex-item playerName">
                        <p>Darth Vader</p>
                    </div>
                    <div class="flex-item">
                        <img style="width:100%" src="assets/images/Vader 03.png" alt="Player 4">
                    </div>
                    <div class="text-center flex-item hp">
                        <p>HP: 180</p>
                    </div>
                </div>
 





	video.addEventListener("ended",function() {
		video.style.display = "none";
	});

	$("#playall").click(function() {

		hangman.playAll = true
		hangman.muteEffects = false
		hangman.muteAll = false

		$("audio").prop("muted", false);

		$(this).addClass("active");
		$(this).addClass("btn-success");
		$(this).removeClass("btn-default");

		$(this).siblings().removeClass("active");
		$(this).siblings().removeClass("btn-success");
		$(this).siblings().addClass("btn-default");

	});

	$("#muteeffects").click(function() {

		hangman.playAll = false
		hangman.muteEffects = true
		hangman.muteAll = false
		
		$(this).addClass("active");
		$(this).addClass("btn-success");
		$(this).removeClass("btn-default");

		$(this).siblings().removeClass("active");
		$(this).siblings().removeClass("btn-success");
		$(this).siblings().addClass("btn-default");

	});

	$("#muteall").click(function() {

		hangman.playAll = false
		hangman.muteEffects = false
		hangman.muteAll = true

		$("audio").prop("muted", true);
		
		$(this).addClass("active");
		$(this).addClass("btn-success");
		$(this).removeClass("btn-default");

		$(this).siblings().removeClass("active");
		$(this).siblings().removeClass("btn-success");
		$(this).siblings().addClass("btn-default");

	});

	var wordObj = {};

	var starwars = {
		charAttribs: [char1 = {health: 120, attack: 8, attackinc: 8, counteratt: 15},
					  char2 = {health: 100, attack: 10, attackinc: 10, counteratt: 5},
					  char3 = {health: 150, attack: 6, attackinc: 6, counteratt: 20},
					  char4 = {health: 180, attack: 4, attackinc: 4, counteratt: 25}
					 ],
		Characters: [obiwan = {name: "Obi-Wan Kenobi", type: "rebel", imgrdy: "", imgfight: "", imgwin: "", imglose: ""},
					luke = {name: "Luke Skywalker", type: "rebel", imgrdy: "", imgfight: "", imgwin: "", imglose: ""},
					leia = {name: "Princess Leia", type: "rebel", imgrdy: "", imgfight: "", imgwin: "", imglose: ""},
					chewy = {name: "Chewbacca", type: "rebel", imgrdy: "", imgfight: "", imgwin: "", imglose: ""},
					han = {name: "Han Solo", type: "rebel", imgrdy: "", imgfight: "", imgwin: "", imglose: ""},
					yoda = {name: "Yoda", type: "rebel", imgrdy: "", imgfight: "", imgwin: "", imglose: ""},
					boba = {name: "Boba Fett", type: "dark", imgrdy: "", imgfight: "", imgwin: "", imglose: ""},
					r2d2 = {name: "R2-D2", type: "rebel", imgrdy: "", imgfight: "", imgwin: "", imglose: ""},
					vader = {name: "Darth Vader", type: "dark", imgrdy: "", imgfight: "", imgwin: "", imglose: ""},
					maul = {name: "Darth Maul", type: "dark", imgrdy: "", imgfight: "", imgwin: "", imglose: ""},
					c3po = {name: "C-3PO", type: "rebel", imgrdy: "", imgfight: "", imgwin: "", imglose: ""},
					jabba = {name: "Jabba the Hut", type: "dark", imgrdy: "", imgfight: "", imgwin: "", imglose: ""},
					emperor = {name: "The Emperor", type: "dark", imgrdy: "", imgfight: "", imgwin: "", imglose: ""},
					ewok = {name: "Ewok", type: "rebel", imgrdy: "", imgfight: "", imgwin: "", imglose: ""},
					storm = {name: "Storm Trooper", type: "dark", imgrdy: "", imgfight: "", imgwin: "", imglose: ""}
				   ],
		selPlayer: {},
		selEnemy: {},
		fightSounds: ["hit_goddamnright.mp3", "hit_teartomyeye.mp3", "hit_tioding.mp3"],
		battlefields: ["gus_dead.gif", "dead01.jpg", "end.jpg", "felina.png", "breakingbad_dead.jpg", "knocks.jpg", "tio_ding.jpg"],
		backgrounds: ["better_call_saul.mp3", "fringlittlerata.mp3", "gus_is_dead.mp3", "iamthedanger.mp3", "knocks.mp3"],
		playSound: " ",
		playAll: true,
		muteEffects: false,
		muteAll: false,
		mute: "",
		winner: false,
		loser: false,
		message: " ",
		instruct: " ",
		stsimg: " ",
		statusHTML: " ",
		status_imgHTML: " ",
		wordsHTML: " ",
		starwarsHTML: " ",

		initial: function() {
			this.chooseRandomWord()
			this.formatWord()
			this.message = "Welcome to Hangman: Breaking Bad Edition!"
			this.instruct = "Press any letter to start..."
			this.hit = false
			this.miss = false
		},

		chooseRandomWord: function() {
			 
			// this.word = this.words[Math.floor(Math.random() * this.words.length)]
			
			// for(var i=0; i < this.word.length; i++) {

// debugger;
			wordObj = this.owords[Math.floor(Math.random() * this.owords.length)]

			this.word = wordObj.oword
			
			// for(var i=0; i < this.word.length; i++) {

			// 	this.formattedWord[i] = this.word.substr(i, 1)

			// }

			// this.maskedString = this.formattedWord.toString().replace(/,/g, " ")

			
		},//close function chooseRandomWord

		chooseRandomHit: function() {
			//coin flip to dtermine to play sound effect or not
			if (Math.floor(Math.random() * 2) == 0) {
				return this.hitSounds[Math.floor(Math.random() * this.hitSounds.length)]
			}
			else {
				return " "
			}
		},

		chooseRandomMiss: function() {
			//coin flip to dtermine to play sound effect or not
			if (Math.floor(Math.random() * 2) == 0) {
				return this.missSounds[Math.floor(Math.random() * this.missSounds.length)]
			}
			else {
				return " "
			}
		},

		chooseRandomLossPic: function() {
			return this.losePic[Math.floor(Math.random() * this.losePic.length)]
		},

		chooseRandomLossSound: function() {
			return this.loseSound[Math.floor(Math.random() * this.loseSound.length)]
		},

		validKey: function() {
			if ((this.userGuess >= "a") && (this.userGuess <= "z")) {
				this.message = " "
				this.instruct = "Press any letter to continue..."
				this.invKey = false
				return true
			}
			else {
				this.message = "Invalid key pressed, try again!"
				this.instruct = "Press any letter to continue..."
			   	this.invKey = true
				return false
			}
		},

		newLetter: function() {
			if (this.lettersGuessed.indexOf(this.userGuess) >= 0) {
				this.message = "You tried that letter already!"
			   	this.instruct = "Press any letter to continue..."
			   	this.repeat = true
				return false
			}
			else {
				//add letter to guessed letters
				this.lettersGuessed.push(this.userGuess)
				this.repeat = false
				return true	
			}
		},
		
		letterHit: function() {
			if (this.playAll) {
				this.mute = ""
			} else {
				this.mute = " muted"
			}

			if (this.word.indexOf(this.userGuess) >= 0) {
				this.message = "Hit! Keep it up!"
				this.hit = true
				this.miss = false
				this.playSound = this.chooseRandomHit()
				return true
			}
			else {
				this.message = "Miss! Try Again!"
				this.hit = false
				this.miss = true
				this.playSound = this.chooseRandomMiss()
				return false	
			}

		},

		formatWord: function() {
			this.maskedString = ""
			this.hits = 0
				 
			for(var i=0; i < this.word.length; i++) {
				if (this.lettersGuessed.indexOf(this.word.substr(i, 1)) >= 0) {
					// this.formattedWord[i] = this.word.substr(i, 1)
					this.maskedString += (this.word.substr(i, 1) + " ")	
					this.hits++
				}
				else {
					// if space in word, then don't underline
					if (this.word.substr(i, 1) === " ") {
						this.maskedString += "&nbsp;&nbsp;"
						//spaces are free hits
						this.hits++
					}
					else {	
					this.maskedString += "_ "
					}
				}
			}
		},

		letterMiss: function() {
			this.guesses--
			if (this.guesses === 0) {
    			this.message = "Game Over!"
    			this.instruct = "Press Enter to start with a new word."
				this.playSound = this.chooseRandomLossSound()
				this.stsimg = this.chooseRandomLossPic()
 				this.losses++
				if (!(this.muteAll)) {
					this.mute = ""
				} else {
					this.mute = " muted"
				}

    		} 

		},

		checkWin: function() {
			if (this.hits === this.word.length) {
				// this.winner = true
				this.message = "Winner!"
				this.instruct = "Press Enter to start with a new word."
				this.stsimg = wordObj.wpic
				this.playSound = wordObj.wsound
				this.wins++

				if (!(this.muteAll)) {
					this.mute = ""
				} else {
					this.mute = " muted"
				}
			}

		},

		updateStatus: function() {

			this.statusHTML = "<h3> " + this.message + "</h3><h2>Wins: " + this.wins + "</h2><h2>Losses: " + this.losses +  
				"</h2> <h3>" + this.instruct + "</h3>"	

			if (!(this.playSound === " ")) {
				this.statusHTML += "<audio autoplay" + this.mute + "> <source src=\"assets/audio/" + this.playSound + "\" type=\"audio/mp3\"> </audio>"
			}
		},

		updateWords: function() {

			this.wordsHTML = "<h2>" + this.maskedString + "</h2> <br> <h3>Guessed letters: " + this.lettersGuessed.toString() + 
			"</h3> <br> <h3>Guesses remaining: " + this.guesses + "</h3>"	
		},

		updateStatusImg: function() {

			if ((this.gameover) || (this.winner)) {
				this.status_imgHTML = "<img class=\"img-responsive\" id=\"sts\" style=\"width:100%;\" src=\"assets/images/" + this.stsimg + "\" alt=\"status image\">"
				} else if (this.invKey) {
					this.status_imgHTML = "<div class=\"area\">Invalid Key!</div>"
					} else if (this.repeat) {
						this.status_imgHTML = "<div class=\"area\">Letter Repeat!</div>"
						} else if (this.hit) {
							this.status_imgHTML = "<div class=\"area\">Hit!</div>"
							} else if (this.miss) {
								this.status_imgHTML = "<div class=\"area\">Miss!</div>"
								} else {
									this.status_imgHTML = " "
									}

	},

		updateHangman: function() {

			switch(this.guesses) {
			    case 8:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 7:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 6:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 5:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 4:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 3:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_05\" style=\"width:85%;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 2:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_06\" style=\"width:85%;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " +
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 1:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_07\" style=\"width:85%;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " 	
					}
					this.hangmanHTML +=
					"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%; display:none;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\">"
			        break;
			    case 0:
					this.hangmanHTML = "<img class=\"img-responsive\" id=\"hm_bg\" style=\"width:85%;\" src=\"assets/images/hangman_bg_gn.png\" alt=\"Hangman bg\"> " +
					"<img class=\"img-responsive\" id=\"hm_01\" style=\"width:85%;\" src=\"assets/images/hangman_miss_01.png\" alt=\"Hangman 01\"> " +
					"<img class=\"img-responsive\" id=\"hm_02\" style=\"width:85%;\" src=\"assets/images/hangman_miss_02.png\" alt=\"Hangman 02\"> " +
					"<img class=\"img-responsive\" id=\"hm_03\" style=\"width:85%;\" src=\"assets/images/hangman_miss_03.png\" alt=\"Hangman 03\"> " +
					"<img class=\"img-responsive\" id=\"hm_04\" style=\"width:85%;\" src=\"assets/images/hangman_miss_04.png\" alt=\"Hangman 04\"> " +
					"<img class=\"img-responsive\" id=\"hm_05\" style=\"width:85%;\" src=\"assets/images/hangman_miss_05.png\" alt=\"Hangman 05\"> " +
					"<img class=\"img-responsive\" id=\"hm_06\" style=\"width:85%;\" src=\"assets/images/hangman_miss_06.png\" alt=\"Hangman 06\"> " +
					"<img class=\"img-responsive\" id=\"hm_07\" style=\"width:85%;\" src=\"assets/images/hangman_miss_07.png\" alt=\"Hangman 07\"> " 
					if ((this.hit) || (this.repeat) || (this.invKey)) {
						this.hangmanHTML += 
							"<img class=\"img-responsive\" id=\"hm_08\" style=\"width:85%;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\"> " 
					}
					else {
						this.hangmanHTML +=  
							"<img class=\"img-responsive miss\" id=\"hm_08\" style=\"width:85%;\" src=\"assets/images/hangman_miss_08.png\" alt=\"Hangman 08\"> " 	
					}
					
					break;
			    default:
			        this.hangmanHTML = "<h2>ERROR!!</h2>";
			}			
		},

		reset: function() {
			this.guesses = 8
			this.hits = 0
			this.hit = false
			this.miss = false
			this.winner = false
			this.gameover = false
			this.lettersGuessed = []
			this.word = " "
			// this.formattedWord = []
			this.maskedString = " "
			this.chooseRandomWord()
			this.formatWord()
			this.message = "Hangman: Breaking Bad Edition!"
			this.instruct = "Press any letter to start."
		    this.stsimg = " "
			this.playSound = " "


		},

		html: function() {
			
			if (!(this.gameover) && !(this.winner)) {

				if (this.guesses === 0) {
					this.gameover = true
				}

				if (this.hits === this.word.length) {
				this.winner = true
				}

				// Update Instructions and Status
				this.updateStatus()
				document.getElementById("status").innerHTML = (this.statusHTML)

				// Update Word and Guesses
				this.updateWords()
				document.getElementById("words").innerHTML = (this.wordsHTML)

				// Update Status Image
				this.updateStatusImg()
				document.getElementById("status_img").innerHTML = (this.status_imgHTML)
			

				// Update Hangman Images
				this.updateHangman()
				document.getElementById("hangman").innerHTML = (this.hangmanHTML)
				
			}
		}

	} // close object Hangman

	
	//Initial Word, we start here

	hangman.initial()

	hangman.html()

	document.onkeyup = function(event) {

	hangman.stsimg = " "
   	hangman.playSound = " "

 
    if (((event.keyCode == 13) && hangman.winner) || ((event.keyCode == 13) && (hangman.guesses === 0))) {
    	 
    	hangman.reset()

		hangman.html()

    }
    else { 
    	if (hangman.guesses > 0) { //USER LOST: Do not allow user to play until they hit Enter to start a new word!
    		if (!(hangman.winner)) { //USER WON: Do not allow user to play until they hit Enter to start a new word!

			    hangman.userGuess = String.fromCharCode(event.keyCode).toLowerCase();
			    // confirm letter was pressed
			    if (hangman.validKey()) {
		    		// confirm letter was not guessed yet
			    	if (hangman.newLetter()) {
			    		//check letter exist in word
			    		if (hangman.letterHit()) {
						    // if hit, then process hit
						    hangman.formatWord()
			    			hangman.checkWin()
			    		} // hit
			    		else {	
						    // if no hit, then process miss
			    			hangman.letterMiss()
			    		}
			    	} // new letter
			    	// else {
			    	// 	hangman.message = "You tried that letter already!"
			    	// }
			    } // Valid key-stroke
			    // else {
			    // 	hangman.message = "Invalid key pressed, try again!"
			    // }
			 } // Winner, press enter
			 // else {
			 // 	hangman.message = "You Won! Press Enter to start with a new word."
			 // }
		} // guesses = 0, Loser
		// else {
		// 	hangman.message = "Game Over! Press Enter to start with a new word."
		// }
	}

		hangman.html()

	}// key press	

}); //document.ready