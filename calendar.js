const todayEl = $('.today');
const containerEl = $('.container')
let rowEl;
const hoursPerDay = 9;
let currentHour;
let time = [];
let colElHour;
let inputEl;
let saveBtn;
let colElSave;
let colElDesc;
let index = [];

//get current day
//console.log(moment().format('MM/DD/YYYY'));
todayEl.text("Today is " + moment().format('MM/DD/YYYY') + ".");
//console.log(moment().startOf('day').add('8', 'hours').format("h:mmA"))

//get the number of hours in a work day
const timeOneDay = () => {
    var formattedTime = [];
    time = formattedTime;
    for (i = 0; i < hoursPerDay; i++) {
        var timePoint = (9 + i);
        formattedTime.push((moment().startOf('day').add(timePoint, 'hours').format("HH:mm A")));
    }

}

//render calendar
const renderCalendar = () => {
    for (i = 0; i < hoursPerDay; i++) {
        rowEl = $('<div>').attr("class", "row");
        colElHour = $('<div>' + time[i] + '</div>').attr("class", "col-lg-1 hour");
        colElDesc = $('<div>').attr("class", "col-lg-10");
        inputEl = $('<textarea>').attr('value', "").attr("class", "description").attr("id", time[i]);
        index.push(inputEl.attr("id"));
        colElSave = $('<div>').attr("class", "col-lg-1")
        saveBtn = $('<button>').attr("class", "saveBtn").attr("id", time[i]).attr("type", "submit").text("Save");
        clearBtn = $('<button>').attr("class", "clearBtn").attr("id", [i]).attr("type", "submit").text("Clear");
        colElDesc.append(inputEl)
        colElSave.append(saveBtn);
        colElSave.append(clearBtn);
        rowEl.append(colElHour);
        rowEl.append(colElDesc);
        rowEl.append(colElSave);
        containerEl.append(rowEl);
    }
    $(document).on("click", ".saveBtn", saveSchedule);
    $(document).on("click", ".clearBtn", clearSchedule);
}

//determine current time
const currentTime = () => {
    //console.log(moment().format("HH:mm A"));
    currentHour = moment().format("HH:mm A");
    //console.log(currentHour);
    const timeStamp = $('textarea').get();
    let getSched;
    timeStamp.forEach(timeSlot => {
        var timeId = parseInt(timeSlot.id);
        //console.log(parseInt(currentHour));
        //console.log(timeStamp[i].classList.value)
        console.log(timeSlot)
        if (parseInt(currentHour) > timeId) {
            //console.log("Past Time " + timeId)
            //console.log(timeStamp.classList)
            timeSlot.classList.value = "description past";
            //
            getSched = localStorage.getItem(timeSlot.id)
            console.log(getSched);
            timeSlot.value = getSched;
        }
        else if (parseInt(currentHour) < timeId) {
            //console.log("Past Time " + time[i])
            timeSlot.classList.value = "description future";
            getSched = localStorage.getItem(timeSlot.id)
            console.log(getSched);
            timeSlot.value = getSched;
        }
        else {
            console.log("future Time " + parseInt(timeSlot))
            timeSlot.classList.value = "description present";
            getSched = localStorage.getItem(timeSlot.id)
            console.log(getSched);
            timeSlot.value = getSched;
        }
    });
};

function saveSchedule(event) {
    event.preventDefault()
    var input = $(this).parent().parent().find(".description", ['textarea'])[0].value
    var time = $(this).parent().parent().find(".description", ['textarea'])[0].id;
    console.log(time)
    console.log(input)
    localStorage.setItem(time, input)
}

function clearSchedule() {
    $(this).parent().parent().find(".description", ['textarea'])[0].value = "";
    var input = $(this).parent().parent().find(".description", ['textarea'])[0].value
    var time = $(this).parent().parent().find(".description", ['textarea'])[0].id;
    console.log(time)
    console.log(input)
    localStorage.setItem(time, input)
}


timeOneDay();
renderCalendar();
console.log(time);
currentTime();
//