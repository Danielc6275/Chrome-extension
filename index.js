let myLeads = [];

// Exercise:
// myLeads = JSON.parse(myLeads);
// myLeads.push("thebestleadwehavehad.com");
// myLeads = JSON.stringify(myLeads);
// console.log(typeof myLeads);
// myLeads = JSON.parse(myLeads);

// myLeads.push("www.epiclead.com");

// console.log(myLeads);

// JSON can only parse strings, not arrays.
// To solve this, you make the array into a string and then use JSON.parse().

// This is the other way around:
// myLeads = ["www.awesomelead.com"];
// myLeads = JSON.stringify(myLeads);



const inputBtn = document.getElementById("input-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector('#ul-el');

const deleteBtn = document.querySelector("#delete-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(`Leads from local storage: ${leadsFromLocalStorage}`);

if ( leadsFromLocalStorage ) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}


const tabBtn = document.getElementById("tab-btn");
tabBtn.addEventListener('click', function () {
    // Refer to 13:22:10 in the video.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs);
        
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })

});


function render(leads) {
    let listItems = "";
    for (i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href= '${leads[i]}'>${leads[i]}</a>
            </li>
        `;
        
        
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener('dblclick', function() {
    localStorage.clear(); // this can be deleted later
    myLeads = []; // this needed to be reassigned to an empty array.
    render(myLeads); // I did not get this at first; it works because
                   // myLeads is an empty array if this button is clicked
    console.log('localStorage has been cleared');
});


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    // Save the myLeads array to localStorage
    // PS: remember JSON.stringify
    localStorage.setItem( "myLeads", JSON.stringify(myLeads) );

    render(myLeads);
    inputEl.value = "";

    // To verify that it works:
    console.log("These are the items in local storage: " + localStorage.getItem("myLeads"));
});
// the HTML, if you use addEventListener(), does not worry about any event listeners.
// function renderLead()
//     let listItem = "<li>" + inputEl.value + "</li>";

//     ulEl.innerHTML += listItem;



    // note: the listItems variable has to be defined within the function so that it will
    // always start as an empty string - the myLeads array holds all of the lead data.

        //use the innerHTML method to render out HTML tags, otherwise the tags will appear
        // instead of what they are supposed to convert to

        //There is another way to do render inner HTML (notice the space between the words):
        // Create element, set text content, append it to ul
        // // const li = document.createElement("li")
        // // li.textContent += myLeads[i]
        // // ulEl.append(li)



//DOM manipulation has a cost; get it for cheaper!!!

// This is the less efficient function:
// // function render() {
// //     let listItems = "";
// //     for (i = 0; i < myLeads.length; i++) {
// //         listItems += "<li>" + myLeads[i] + "</li>";
// //         console.log(listItems);
// //     }
// //     ulEl.innerHTML = listItems;
// // }