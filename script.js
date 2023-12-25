let worker = new Worker("words.js");
let cursor = 0
let cursormin = 0
let line = 1
let lineval = ""
let lineend = false
let word = ""


window.onload = () => {
	document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "green"
	worker.postMessage({ word: "", type: "get" });

	window.addEventListener("keydown", (e) => {
		let val = e.key
		
		console.log(e.key)
		if (val == "Enter") {
			if (!lineend) {
				alert("too small bro")
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
		else if (!lineend && val.match(/^[a-zA-Z]+$/)) {
			val = val.toUpperCase()
			lineval += val
			document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").innerText = val
			if((cursor+1) % 5 != 0){
		document.querySelector(".grid .col:nth-child(" + (cursor + 2) + ")").style.borderColor = "green"
		document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
			}else{
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
			let val = el.innerText
			if (val == "↵") {
				if (!lineend) {
					alert("too small bro")
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
				if((cursor+1) % 5 != 0){
			document.querySelector(".grid .col:nth-child(" + (cursor + 2) + ")").style.borderColor = "green"
			document.querySelector(".grid .col:nth-child(" + (cursor + 1) + ")").style.borderColor = "white"
				}else{
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
				for (let i = cursormin; i < cursor; i++) {
					let el = document.querySelector(".grid .col:nth-child(" + (i + 1) + ")")
					// ellist.push(el)
					let reallineval = lineval.toUpperCase()
					console.log(reallineval)
					lineval = lineval.toLowerCase()
					console.log(lineval.includes(word[i - cursormin]), lineval[i - cursormin], word[i - cursormin], i, cursormin)
					if (lineval[i - cursormin] == word[i - cursormin]) {
						el.style.backgroundColor = "green"
						document.querySelector("[data-key='" + reallineval[i - cursormin] + "']").style.backgroundColor =  "green"
						anime({
							targets: el,
							rotateX: 360*2,
							duration: 1500,
							// color: "#0000",
							backgroundColor: {
								value:['#303030',"green"],
								duration: 500,
							},
							easing: 'easeInOutSine',
							delay: (i - cursormin ) * 100
						})
					} else if (word.includes(lineval[i - cursormin])) {
						el.style.backgroundColor = "#838300"
						document.querySelector("[data-key='" + reallineval[i - cursormin] + "']").style.backgroundColor =  "#838300"
						anime({
							targets: el,
							rotateX: 360,
							duration: 1000,
							// color: "#0000",
							backgroundColor:{ 
								value:['#303030',"#838300"],
								duration: 500,
							},
							easing: 'easeInOutSine',
							delay: (i - cursormin ) * 100
						})
					} else {
						el.style.backgroundColor = "gray"
						document.querySelector("[data-key='" + reallineval[i - cursormin] + "']").style.backgroundColor =  "gray"
				anime({
					targets: el,
					rotateX: 360,
					duration: 1000,
					// color: "#0000",
					backgroundColor: { 
						value:['#303030','#646464'],
						duration: 500,
					},
					easing: 'easeInOutSine',
					delay: (i - cursormin )* 100
				})
					}
				}
				cursormin += 5
				lineval = ""
				line += 1
				lineend = false
				document.querySelector(".grid .col:nth-child(" + (cursor+1) + ")").style.borderColor = "green"
				// alert("exists")
			} else {
				alert("word not found")
			}
		} else {
			word = e.data.val
			console.log(word)
		}
	}
}