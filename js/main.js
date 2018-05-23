//get the endpoint and assign to an object
var endpoint = {"buttons":[11,29,-46,-29],"bars":[10,74,82,75],"limit":190};
const barlimit = endpoint.limit;

//load bars
function loadBars(barsDiv , barsArray){
    return new Promise((yes , no) =>{
        let barhead = document.getElementById("bars");
        let barscontent = "";
        let selectcontent = "<select id='barselection'>";
        if(barhead) {
            for (let i = 0; i < barsArray.length; i++) {
                barscontent += "<div id='bar"+i+"' class='barwrapper'>"
                        +"<div id='barprogress"+i+"' class='bar' style='width:"+barsArray[i]+"%;'>"+barsArray[i]+"%</div> "
                    +"</div>";
                selectcontent += "<option value='barprogress"+i+"'>Progress Bar "+(i+1)+"</option>";

            }
            selectcontent +="</select>";
            barhead.insertAdjacentHTML('afterbegin', barscontent);
            barhead.insertAdjacentHTML('afterend', selectcontent);
            if (typeof (yes) === "function") {
                yes();
            }
        }else{
            if (typeof (no) === "function") {
                no();
            }
        }
    });
}

//load buttons
function loadButtons(btnDiv , btnArray){
    return new Promise((yes , no) =>{
    let btnhead = document.getElementById("buttons");
        if(btnhead) {
            for (let i = 0; i < btnArray.length; i++) {
                let btnNode = document.createElement("input");
                btnNode.id = "btn" + i;
                btnNode.className = "btn";
                btnNode.setAttribute("value", btnArray[i]);
                btnNode.setAttribute("type", "button");
                let btnTextNode = document.createTextNode(btnArray[i]+"%");
                btnNode.appendChild(btnTextNode);
                btnhead.appendChild(btnNode);
            }
            if (typeof (yes) === "function") {
                yes();
            }
        }else{
            if (typeof (no) === "function") {
                no();
            }
        }
    });
}

function bindButtons(){
    let btns = document.getElementsByClassName("btn");

    let myFunction = function() {
        let btnvalue = parseInt(this.getAttribute("value"));
        changeProgressBar(btnvalue);
    };

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', myFunction, false);
    }
}

function changeProgressBar(value){
    let barselection = document.getElementById("barselection");
    let selectedBar = barselection.options[barselection.selectedIndex].value;
    let bar = document.getElementById(selectedBar);
    let currentVal = parseInt(bar.innerText);
    let output = parseInt(currentVal+value);
    if(output > 100){
        bar.style.width = "100%";
        bar.style.backgroundColor = "red";
        (output >= barlimit) ? bar.innerHTML = barlimit+"%" : bar.innerHTML = output+"%";
    }else if(currentVal+value < 100){
        bar.style.backgroundColor = "steelblue";
        if(output < 0){
            bar.innerHTML = "0%";
            bar.style.width = "0%";
        }else{
            bar.innerHTML = output+"%";
            bar.style.width = output+"%";
        }
    }

}

window.onload = function() {
    const promise1 = loadBars("bars", endpoint.bars);
    const promise2 = promise1.then(loadButtons("buttons", endpoint.buttons));
    promise2.then(bindButtons());
};