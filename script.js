let thread = false;
// if(thread){
// let worker = new Worker("words.js");
// let cursor = 0
// let cursormin = 0
// let line = 1
// let lineval = ""
// let lineend = false
// let word = ""
// let dlog = document.querySelector(".endscreen");
// let dlog2 = document.querySelector(".errscreen");

// let wordleData = []

// function showModal(){
// 	dlog.style.display = "grid"
// 	dlog.showModal()

// }
// function showhide(data){
// 	dlog2.showModal()
// 	dlog2.querySelector("h1").innerHTML = data;
// 	dlog2.style.display = "grid";
// 	setTimeout(()=>{dlog2.close();dlog2.style.display = "none"},900)

// 	}

// run()
// function run(){
// 	document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "green"
// 	worker.postMessage({ word: "", type: "get" });

// 	window.addEventListener("keydown", (e) => {
// 		let val = e.key
// 		if (val == "Enter") {
// 			if (!lineend) {
// 				showhide("too small bro")
// 				return 0
// 			}
// 			worker.postMessage({ word: lineval.toLowerCase(), type: "find" });
// 			// cursor++
// 		}
// 		else if (val == "Backspace") {
// 			if (cursormin == cursor) return 0;
// 			document.querySelector(".grid .col:nth-child(" + cursor + ")").innerText = ""
// 			lineval = lineval.slice(0, -1);
// 			document.querySelector(".grid .col:nth-child(" + (cursor) + ")").style.borderColor = "green"
// 			cursor--
// 			document.querySelector(".grid .col:nth-child(" + (cursor + 2) + ")").style.borderColor = "white"
// 			// if((cursor+1) % 5 != 0){
// 			// }else{
// 			// 	document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
// 			// }
// 			lineend = false
// 		}
// 		else if (!lineend && val.match(/^[a-zA-Z]+$/) && val.length == 1) {
// 			val = val.toUpperCase()
// 			lineval += val
// 			document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").innerText = val
// 			if ((cursor + 1) % 5 != 0) {
// 				document.querySelector(".grid .col:nth-child(" + (cursor + 2) + ")").style.borderColor = "green"
// 				document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
// 			} else {
// 				document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
// 			}
// 			cursor++
// 			if (cursor % 5 == 0) {
// 				lineend = true
// 			} else {
// 				lineend = false
// 			}
// 		}
// 	})

// 	document.querySelectorAll(".key").forEach((el, i) => {
// 		el.addEventListener("click", (evt) => {
// 			let val = el.dataset.key
// 			if (val == "↵") {
// 				if (!lineend) {
// 					showhide("too small bro")
// 					return 0
// 				}
// 				worker.postMessage({ word: lineval.toLowerCase(), type: "find" });
// 				// cursor++
// 			}
// 			else if (val == "-") {
// 				if (cursormin == cursor) return 0;
// 				document.querySelector(".grid .col:nth-child(" + cursor + ")").innerText = ""
// 				lineval = lineval.slice(0, -1);
// 				document.querySelector(".grid .col:nth-child(" + (cursor) + ")").style.borderColor = "green"
// 				cursor--
// 				document.querySelector(".grid .col:nth-child(" + (cursor + 2) + ")").style.borderColor = "white"
// 				// if((cursor+1) % 5 != 0){
// 				// }else{
// 				// 	document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
// 				// }
// 				lineend = false
// 			}
// 			else if (!lineend) {
// 				lineval += val
// 				document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").innerText = val
// 				if ((cursor + 1) % 5 != 0) {
// 					document.querySelector(".grid .col:nth-child(" + (cursor + 2) + ")").style.borderColor = "green"
// 					document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
// 				} else {
// 					document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
// 				}
// 				cursor++
// 				if (cursor % 5 == 0) {
// 					lineend = true
// 				} else {
// 					lineend = false
// 				}
// 			}
// 			// anime({
// 			// 	targets: document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")"),
// 			// 	// rotateX: 360,
// 			// 	duration: 1000,
// 			// 	// color: "#0000",
// 			// 	backgroundColor:{ 
// 			// 		value:['#303030',"#838300"],
// 			// 		duration: 500,
// 			// 	},
// 			// 	easing: 'easeInOutSine',
// 			// 	// delay: (i - cursormin ) * 100
// 			// })
// 		});
// 	});
// 	function check(){
// 		let ellist = []
// 		// var tl = anime.timeline({
// 		//   easing: 'easeOutExpo',
// 		//   duration: 1000
// 		// });
// 		wordleData[line-1] = []
// 		console.log(wordleData)
// 		for (let i = cursormin; i < cursor; i++) {
// 			let el = document.querySelector(".grid .col:nth-child(" + (i + 1) + ")")
// 			ellist.push(el)
// 			let reallineval = lineval.toUpperCase()

// 			lineval = lineval.toLowerCase()
// 			if (lineval[i - cursormin] == word[i - cursormin]) {
// 				el.style.backgroundColor = "green"
// 				document.querySelector("[data-key='" + reallineval[i - cursormin] + "']").style.backgroundColor = "green"
// 				wordleData[line-1].push({value: lineval[i - cursormin],color: "green"})
// 				if (lineval != word) {
// 				anime({
// 					targets: el,
// 					rotateX: 360,
// 					duration: 1500,
// 					// color: "#0000",
// 					backgroundColor: {
// 						value: ['#242729', "green"],
// 						duration: 500,
// 					},
// 					easing: 'easeInOutSine',
// 					delay: (i - cursormin) * 100
// 				})
// 				}
// 			} 
// 			else if (word.includes(lineval[i - cursormin])) {
// 				el.style.backgroundColor = "#838300"
// 				document.querySelector("[data-key='" + reallineval[i - cursormin] + "']").style.backgroundColor = "#838300"
// 				wordleData[line-1].push({value: lineval[i - cursormin],color: "#838300"})
// 				anime({
// 					targets: el,
// 					keyframes: [
// 						{ rotateX: 90 },
// 						{ rotateX: 0 },
// 					],
// 					duration: 1000,
// 					// color: "#0000",
// 					backgroundColor: {
// 						value: ['#242729', "#838300"],
// 						duration: 500,
// 					},
// 					easing: 'easeInOutSine',
// 					delay: (i - cursormin) * 100
// 				})
// 			} 
// 			else {
// 				el.style.backgroundColor = "gray"
// 				document.querySelector("[data-key='" + reallineval[i - cursormin] + "']").style.backgroundColor = "gray"
// 				wordleData[line-1].push({value: lineval[i - cursormin],color: "gray"})
// 				anime({
// 					targets: el,
// 					// rotateX: 360,
// 					duration: 1000,
// 					keyframes: [
// 						{ rotateX: 90 },
// 						{ rotateX: 0 },
// 					],
// 					// color: "#0000",
// 					backgroundColor: {
// 						value: ['#242729', '#646464'],
// 						duration: 500,
// 					},
// 					easing: 'easeInOutSine',
// 					delay: (i - cursormin) * 100
// 				})
// 			}
// 		}
// 		if (lineval == word) {
// 			dlog.querySelector(".top h1").innerHTML = `you win hehe`
// 			dlog.querySelector(".answer").innerHTML = word
// 			anime({
// 				targets: ellist,
// 				duration: 1000,
// 				keyframes: [
// 					{ translateY: -40 },
// 					{ translateY: 0 }
// 				],
// 				easing: 'easeInOutSine',
// 				delay: anime.stagger(100),
// 				complete: function(anim) {

// 					showModal()
// 				  }
// 			})
// 			return 0
// 		}
// 		else if(line == 6){

// 			dlog.querySelector(".answer").innerHTML = word
// 			showModal()
// 			return 0

// 		}
// 		cursormin += 5
// 		lineval = ""
// 		line += 1
// 		lineend = false
// 		document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "green"
// 	}
// 	worker.onmessage = (e) => {
// 		if (e.data.type == "find") {
// 			if (e.data.val) {
// 				check()
// 			} else {
// 				showhide("word not found")
// 			}
// 		} else {
// 			word = e.data.val
// 			console.log(word)
// 		}
// 	}
// }
// document.querySelector(".new-up").onclick = () => {
// 	dlog.querySelector(".answer").innerHTML = word
// 	showModal()
// }
// document.querySelector(".save").onclick = () => {
// 	showhide("saving")
// 	localStorage.setItem("wordle", JSON.stringify(wordleData))
// }
// document.querySelector(".closes").onclick = () => {
// 	dlog.style.display = "none"

// 	dlog.close()
// }
// document.querySelector(".new").onclick = () => {
// 	dlog.close()
// 	location.reload()
// }
// }

// else{
	let cursor = 0
	let cursormin = 0
	let line = 1
	let lineval = ""
	let lineend = false
	let word = random()
	let dlog = document.querySelector(".endscreen");
	let dlog2 = document.querySelector(".errscreen");
	let grid = document.querySelector(".grid");
	let wordleData = []

	function showModal(){
		dlog.style.display = "grid"
		dlog.showModal()

	}
	function showhide(data){
		if(dlog2.open) return 0 
		dlog2.showModal()
		dlog2.querySelector("h1").innerHTML = data;
		dlog2.style.display = "grid";
		setTimeout(()=>{dlog2.close();dlog2.style.display = "none"},900)

	}
	function init(data,news){
		let wordle = data?.wordle
		if(data){
			word = data.word
			cursormin = data.cursormin
			cursor = data.cursormin
			line = data.line
			lineval = ""
		}else if(news){
			document.querySelector(".new-up").style.visibility = "hidden"
			word = random()	
			cursormin = 0
			cursor = 0
			line = 1
			lineval = ""
			lineend = false
			wordleData = []
		}
		showhide("Good Luck Bro")
		console.log(word,wordle)
		grid.innerHTML = ``;
		let k = 0
		for(let i=0;i < 6;i++){
			for(let j=0;j < 5;j++){
				let col = document.createElement("div")
				col.classList.add("col")
				col.classList.add("col-" + (k+1))
				if(wordle && wordle.length > i){	
					col.style.backgroundColor = wordle[i][j].color || "#242729"	;						col.innerText = wordle[i][j].value || "";
				}
				grid.appendChild(col)
				k++
			}
		}
		document.querySelector(".keyboard").innerHTML = ``
		document.querySelector(".keyboard").innerHTML += `<button class="key" tabindex="0" data-key="A">A</button>
<button class="key" tabindex="0" data-key="B">B</button>
<button class="key" tabindex="0" data-key="C">C</button>
<button class="key" tabindex="0" data-key="D">D</button>
<button class="key" tabindex="0" data-key="E">E</button>
<button class="key" tabindex="0" data-key="F">F</button>
<button class="key" tabindex="0" data-key="G">G</button>
<button class="key" tabindex="0" data-key="H">H</button>
<button class="key" tabindex="0" data-key="I">I</button>
<button class="key" tabindex="0" data-key="J">J</button>
<button class="key" tabindex="0" data-key="K">K</button>
<button class="key" tabindex="0" data-key="L">L</button>
<button class="key" tabindex="0" data-key="M">M</button>
<button class="key" tabindex="0" data-key="N">N</button>
<button class="key" tabindex="0" data-key="O">O</button>
<button class="key" tabindex="0" data-key="P">P</button>
<button class="key" tabindex="0" data-key="Q">Q</button>
<button class="key" tabindex="0" data-key="R">R</button>
<button class="key" tabindex="0" data-key="S">S</button>
<button class="key" tabindex="0" data-key="T">T</button>
<button class="key" tabindex="0" data-key="U">U</button>
<button class="key" tabindex="0" data-key="V">V</button>
<button class="key" tabindex="0" data-key="W">W</button>
<button class="key" tabindex="0" data-key="X">X</button>
<button class="key" tabindex="0" data-key="Y">Y</button>
<button class="key" tabindex="0" data-key="Z">Z</button>
		<button class="key cancle" tabindex="0" data-key="-"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg></button>
		<button class="key enter" tabindex="0" data-key="↵">↵</button>`;
		document.querySelectorAll(".key").forEach((el, i) => {
			el.addEventListener("click", (evt) => {
				let val = el.dataset.key
				type(val == "↵" ? "Enter" : val == "-" ? "Backspace" : val)
			});
		});
		document.querySelector(".grid .col-"+(cursor+1)).style.borderColor = "green"

	}
	function add(i,val){
		document.querySelector(".grid .col-" + i).innerText = val
	}
	function animation(el,color,delay){
		if(typeof anime != "fucntion") return 0
		anime({
			targets: el,
			keyframes: [
				{ rotateX: 90 },
				{ rotateX: 0 },
			],
			duration: 500,
			backgroundColor: {
				value: ['#242729', color],
				duration: 500,
			},
			easing: 'easeInOutSine',
			delay: delay
		})
	}
	function type(val){
		if (val == "Enter") {
			document.querySelector(".new-up").style.visibility = "visible"
			if (!lineend) {
				showhide("too small bro")
				return 0
			}
			if(!(binarySearch(arr,lineval.toLowerCase()) > 0)){
				showhide("word not found bro")
				return 0
			}
			let ellist = []
			wordleData[line-1] = []
			console.log(wordleData)
			for (let i = cursormin; i < cursor; i++) {
				let el = document.querySelector(".grid .col-" + (i + 1))
				ellist.push(el)
				let reallineval = lineval.toUpperCase()
				lineval = lineval.toLowerCase()
				if (lineval[i - cursormin] == word[i - cursormin]) {
					el.style.backgroundColor = "green"
					document.querySelector("[data-key='" + reallineval[i - cursormin] + "']").style.backgroundColor = "green"
					wordleData[line-1].push({value: lineval[i - cursormin],color: "green"})
					if (lineval != word) {
					animation(el,"green",(i - cursormin) * 100)
					}
				} 
				else if (word.includes(lineval[i - cursormin])) {
					el.style.backgroundColor = "#838300"
					document.querySelector("[data-key='" + reallineval[i - cursormin] + "']").style.backgroundColor = "#838300"
					wordleData[line-1].push({value: lineval[i - cursormin],color: "#838300"})
					animation(el,"#838300",(i - cursormin) * 100)
				} 
				else {
					el.style.backgroundColor = "gray"
					document.querySelector("[data-key='" + reallineval[i - cursormin] + "']").style.backgroundColor = "gray"
					wordleData[line-1].push({value: lineval[i - cursormin],color: "gray"})
					animation(el,'#646464',(i - cursormin) * 100)
				}
			}
			if (lineval == word) {
				dlog.querySelector(".top h1").innerHTML = `you win hehe`
				dlog.querySelector(".answer").innerHTML = word
				if(typeof anime != "fucntion") {
					showModal()
					return 0
				}
				anime({
					targets: ellist,
					duration: 1000,
					keyframes: [
						{ translateY: -40 },
						{ translateY: 0 }
					],
					easing: 'easeInOutSine',
					delay: anime.stagger(100),
					complete: function() {
					showModal()
					}
				})
				return 0
			}
			else if(line == 6){

				dlog.querySelector(".answer").innerHTML = word
				showModal()
				return 0

			}
			cursormin += 5
			lineval = ""
			line += 1
			lineend = false
			document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "green"
		}
		else if (val == "Backspace") {
			if (cursormin == cursor) return 0;
			add(cursor,"") 
			lineval = lineval.slice(0, -1);
			document.querySelector(".grid .col-" +cursor).style.borderColor = "green"
			cursor--
			document.querySelector(".grid .col-" + (cursor + 2)).style.borderColor = "white"
			lineend = false
		}
		else if (!lineend && val.match(/^[a-zA-Z]+$/) && val.length == 1) {
			val = val.toUpperCase()
			lineval += val
			add(cursor + 1,val)
			if ((cursor + 1) % 5 != 0) {
				document.querySelector(".grid .col:nth-child(" + (cursor + 2) + ")").style.borderColor = "green"
				document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
			} 
			else {
				document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
			}
			cursor++
			if (cursor % 5 == 0) {
				lineend = true
			}
			else {
				lineend = false
			}
		}
	} 
	window.onload = () => {
		if (typeof navigator.serviceWorker !== 'undefined') {
			navigator.serviceWorker.register('sw.js')
		  }
		init()
		window.addEventListener("keydown", (e) => {
			let val = e.key
			if (val == "Enter") {
				e.preventDefault()
			}
			type(val)
		})
		document.querySelector(".new-up").onclick = () => {
			dlog.querySelector(".answer").innerHTML = word
			showModal()
		}
		document.querySelector(".save").onclick = () => {
			if(line > 1) {
				showhide("bro there is nothing to save")
				return 0
			}
			if(line >= 6){
				showhide("bro the game is already finished")
				return 0
}
			showhide("saving")
			localStorage.setItem("wordle", JSON.stringify({line,lineval,cursormin,lineend,cursor,word,wordle:wordleData}))
		}
		document.querySelector(".load").onclick = () => {
			alert("are you sure bro")
			showhide("loading")
			init(JSON.parse(localStorage.getItem("wordle")))
		}
		document.querySelector(".closes").onclick = () => {
			dlog.style.display = "none"

			dlog.close()
		}
		document.querySelector(".new").onclick = () => {
			dlog.close()
			dlog.style.display = "none"

			init(false,true)
		}
	}
