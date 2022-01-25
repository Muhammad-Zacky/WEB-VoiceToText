 const synth = window.speechSynthesis;

 //Dom Elements

 const textForm = document.querySelector("form");
 const textInput= document.querySelector("#text-input");
 const voiceSelect = document.querySelector("#voice-select");
 const rate = document.querySelector("#rate");
 const rateValue = document.querySelector("#rate-value");
 const pitch = document.querySelector("#pitch");
 const pitchValue = document.querySelector("#pitch-value");
 const body = document.querySelector("body");

 //init voices array

 let voices = [];

 const getVoices = ()=>{
 	voices = synth.getVoices();
 	//loop through voices
 	voices.forEach(voice=>{
 		//create option element
 		const option = document.createElement("option");
 		//fiil option with the voice and language
 		option.textContent = voice.name + "("+voice.lang + ")";
 		//set needed option attributes
 		option.setAttribute("data-lang", voice.lang);
 		option.setAttribute("data-name", voice.name);
 		voiceSelect.appendChild(option);
 	});
 	
 	
 }
getVoices();
 if (synth.onvoiceschanged!==undefined) {
 		synth.onvoiceschanged=getVoices;
 	}

 //speak function

 	const speak = ()=>{
 		//check if speaking
 		if(synth.speaking){
 			console.error("already speaking");
 			return;
 		}
 		if(textInput.value !== ""){
 			//Add background animation 
 			body.style.background = "#141414 url(img/wave.gif)";
 			body.style.backgroundRepeat = "repeat-x";
 			body.style.backgroundSize = "100% 100%";
 			//Get text to speak
 			const speakText = new SpeechSynthesisUtterance(textInput.value);
 			//speak end
 			speakText.onend = e =>{
 				body.style.background= "#141414";
 			}
 			//speak error
 			speakText.onerror= e=>{
 				console.error("something is wrong...");
 			}
 			//selected voice

 			const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");

 			voices.forEach(voice=>{
 				if(voice.name ===selectedVoice){
 					speakText.voice= voice;
 				}
 			});
 			//set pitchrate
 			speakText.rate = rate.value;
 			speakText.pitch=pitch.value;
 			synth.speak(speakText);
 		}
 	}
 //event Listeners

 //form submit

 textForm.addEventListener("submit", e=>{
 	e.preventDefault();
 	speak();
 	textInput.blur();
 });

 //rate and pitch change

 rate.addEventListener("change", e=>(rateValue.textContent = rate.value));
 pitch.addEventListener("change", e=>(pitchValue.textContent = pitch.value));

 //change on voice select

 voiceSelect.addEventListener("change", e=>speak());