let worker = new Worker("words.js");
let cursor = 0
let cursormin = 0
let line = 1
let lineval = ""
let lineend = false
let word = ""
let dlog = document.querySelector(".endscreen");
let dlog2 = document.querySelector(".errscreen");

function showModal(){
	dlog.style.display = "grid"
	dlog.showModal()

	}
function showhide(data){
	dlog2.showModal()
	dlog2.querySelector("h1").innerHTML = data;
	dlog2.style.display = "grid";
	setTimeout(()=>{dlog.close();dlog2.style.display = "none"},1000)

	}
	run()
	document.querySelector(".new-up").onclick = () => {
		dlog.querySelector(".answer").innerHTML = word
		showModal()
	}
	document.querySelector(".save").onclick = () => {
		showhide("saving")
	}
	document.querySelector(".closes").onclick = () => {
		dlog.style.display = "none"

		dlog.close()
	}
	document.querySelector(".new").onclick = () => {
		dlog.close()
		location.reload()
	}

function run(){
	document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "green"
	worker.postMessage({ word: "", type: "get" });

	window.addEventListener("keydown", (e) => {
		let val = e.key

		console.log(e.key)
		if (val == "Enter") {
			if (!lineend) {
				showhide("too small bro")
				return 0
			}
			worker.postMessage({ word: lineval.toLowerCase(), type: "find" });
			// cursor++
		}
		else if (val == "Backspace") {
			if (cursormin == cursor) return 0;
			document.querySelector(".grid .col:nth-child(" + cursor + ")").innerText = ""
			lineval = lineval.slice(0, -1);
			document.querySelector(".grid .col:nth-child(" + (cursor) + ")").style.borderColor = "green"
			cursor--
			document.querySelector(".grid .col:nth-child(" + (cursor + 2) + ")").style.borderColor = "white"
			// if((cursor+1) % 5 != 0){
			// }else{
			// 	document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
			// }
			lineend = false
		}
		else if (!lineend && val.match(/^[a-zA-Z]+$/) && val.length == 1) {
			val = val.toUpperCase()
			lineval += val
			document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").innerText = val
			if ((cursor + 1) % 5 != 0) {
				document.querySelector(".grid .col:nth-child(" + (cursor + 2) + ")").style.borderColor = "green"
				document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
			} else {
				document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
			}
			cursor++
			if (cursor % 5 == 0) {
				lineend = true
			} else {
				lineend = false
			}
		}
		console.log(cursor)
	})

	document.querySelectorAll(".key").forEach((el, i) => {
		el.addEventListener("click", (evt) => {
			let val = el.dataset.key
			if (val == "↵") {
				if (!lineend) {
					showhide("too small bro")
					return 0
				}
				worker.postMessage({ word: lineval.toLowerCase(), type: "find" });
				// cursor++
			}
			else if (val == "-") {
				if (cursormin == cursor) return 0;
				document.querySelector(".grid .col:nth-child(" + cursor + ")").innerText = ""
				lineval = lineval.slice(0, -1);
				document.querySelector(".grid .col:nth-child(" + (cursor) + ")").style.borderColor = "green"
				cursor--
				document.querySelector(".grid .col:nth-child(" + (cursor + 2) + ")").style.borderColor = "white"
				// if((cursor+1) % 5 != 0){
				// }else{
				// 	document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
				// }
				lineend = false
			}
			else if (!lineend) {
				lineval += val
				document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").innerText = val
				if ((cursor + 1) % 5 != 0) {
					document.querySelector(".grid .col:nth-child(" + (cursor + 2) + ")").style.borderColor = "green"
					document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
				} else {
					document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
				}
				cursor++
				if (cursor % 5 == 0) {
					lineend = true
				} else {
					lineend = false
				}
			}
			console.log(cursor)
			// anime({
			// 	targets: document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")"),
			// 	// rotateX: 360,
			// 	duration: 1000,
			// 	// color: "#0000",
			// 	backgroundColor:{ 
			// 		value:['#303030',"#838300"],
			// 		duration: 500,
			// 	},
			// 	easing: 'easeInOutSine',
			// 	// delay: (i - cursormin ) * 100
			// })
		});
	});
	worker.onmessage = (e) => {
		if (e.data.type == "find") {
			if (e.data.val) {
				let ellist = []
				// var tl = anime.timeline({
				//   easing: 'easeOutExpo',
				//   duration: 1000
				// });
				for (let i = cursormin; i < cursor; i++) {
					let el = document.querySelector(".grid .col:nth-child(" + (i + 1) + ")")
					ellist.push(el)
					let reallineval = lineval.toUpperCase()
					console.log(reallineval)
					lineval = lineval.toLowerCase()
					console.log(lineval.includes(word[i - cursormin]), lineval[i - cursormin], word[i - cursormin], i, cursormin)
					if (lineval[i - cursormin] == word[i - cursormin]) {
						el.style.backgroundColor = "green"
						document.querySelector("[data-key='" + reallineval[i - cursormin] + "']").style.backgroundColor = "green"
						if (lineval != word) {
						anime({
							targets: el,
							rotateX: 360,
							duration: 1500,
							// color: "#0000",
							backgroundColor: {
								value: ['#242729', "green"],
								duration: 500,
							},
							easing: 'easeInOutSine',
							delay: (i - cursormin) * 100
						})
						}
					} else if (word.includes(lineval[i - cursormin])) {
						el.style.backgroundColor = "#838300"
						document.querySelector("[data-key='" + reallineval[i - cursormin] + "']").style.backgroundColor = "#838300"
						anime({
							targets: el,
							keyframes: [
								{ rotateX: 90 },
								{ rotateX: 0 },
							],
							duration: 1000,
							// color: "#0000",
							backgroundColor: {
								value: ['#242729', "#838300"],
								duration: 500,
							},
							easing: 'easeInOutSine',
							delay: (i - cursormin) * 100
						})
					} else {
						el.style.backgroundColor = "gray"
						document.querySelector("[data-key='" + reallineval[i - cursormin] + "']").style.backgroundColor = "gray"
						anime({
							targets: el,
							// rotateX: 360,
							duration: 1000,
							keyframes: [
								{ rotateX: 90 },
								{ rotateX: 0 },
							],
							// color: "#0000",
							backgroundColor: {
								value: ['#242729', '#646464'],
								duration: 500,
							},
							easing: 'easeInOutSine',
							delay: (i - cursormin) * 100
						})
					}
				}
				if (lineval == word) {
					dlog.querySelector("top h1").innerHTML = `you win hehe`
					dlog.querySelector(".answer").innerHTML = word
					anime({
						targets: ellist,
						duration: 1000,
						keyframes: [
							{ translateY: -40 },
							{ translateY: 0 }
						],
						easing: 'easeInOutSine',
						delay: anime.stagger(100),
						complete: function(anim) {

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
			} else {
				showhide("word not found")
			}
		} else {
			word = e.data.val
			console.log(word)
		}
	}
}
