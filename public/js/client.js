/**Get the document and manipulate the message whenever required */
const messageOne = document.querySelector('#message-1');

/**Display the form for search user along with the message */
document.getElementById('searchUser').addEventListener('click', (e) => {
    e.preventDefault();
    /**Display the search form and message in the header and also hide the add user form if visible */
    document.getElementById('findUser').style.display = 'block';
    document.getElementById('addNewUser').style.display = 'none';
    document.getElementById('userDisplayMessage').textContent = 'Use this page to search user data.';

    /**Empty message content if any */
    messageOne.textContent = "";
})

/**Display the form for adding user along with the message */
document.getElementById('addUserLink').addEventListener('click', (e) => {
    e.preventDefault();

    /**Display the add user form, message and button and also hide search form, edit user button */
    document.getElementById('addNewUser').style.display = 'block';
    document.getElementById('findUser').style.display = 'none';
    document.getElementById('addUser').style.display = "inline-block";
    document.getElementById('editUser').style.display = "none";
    document.getElementById('userDisplayMessage').textContent = 'Use this page to add new user.';
    
    /**Empty all the fields and both message if any value is present */
    document.getElementById('userId').value = "";
    document.getElementById('userName').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('avatar').value = "";
    messageOne.textContent = "";
})

//1change remove the url and add fetch url
/**Display the home page message and hide all the necessaru */
document.getElementById('homePage').addEventListener('click', (e) => {
    e.preventDefault();

    /**Display the header message and hide add user, find user form and message*/
    document.getElementById('addNewUser').style.display = 'none';
    document.getElementById('findUser').style.display = 'none';
    document.getElementById('userDisplayMessage').textContent = 'Use this page to get all user  data.';
    messageOne.textContent = "";

    /**Url to fetch data from */
    const url = "http://localhost:3000/readUser?skip=0&limit=5" ;

    fetchData(url);
})

/**Fetch the data whenever find user form is submite */
findUser.addEventListener('submit', function(e){
    e.preventDefault();

    /**Get the search field value*/
    const searchValue = document.querySelector('#search').value;

    // client side approval if the search field is empty then display error message and return
    if (searchValue === "") {
        return messageOne.textContent = "Please enter any one from id, name, phone number, email";
    }

    /**Fetch the data*/
    const url = readUserLink(searchValue) + "&skip=0&limit=5";
    fetchData(url);
});

/**ADD a new user */
document.getElementById('addUser').addEventListener('click', (e) => {
    e.preventDefault();

    try {
        /**flag to check for the validation  and function call to check validation*/
        let flagError = true;

        flagError = valName(userName) && flagError;
        flagError = valEmail(email) && flagError;
        flagError = valPhone(phone) && flagError;
        flagError = valFile(avatar) && flagError;

        /**If error found on validation then throw error and stop the execution*/
        if (flagError == false) {
            throw new Error("Error found");
        }
        
    } catch (error) {
        return;
    }
    
    /**remove the extra digits which are over */
    // if (addNewUser.phone.value.length > 10 ) {
    //     document.getElementById('phone').value = addNewUser.phone.value.splice(4);
    // }
    addNewUser.phone.value = "+91 " + addNewUser.phone.value

    const formData = new FormData(addNewUser);
    const url = "http://localhost:3000/addUser";

    fetch(url, {
        method: "POST", 
        body: formData 
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then((body) => {
            throw new Error(body.message)
        })
    }).then(data => {
        document.getElementById('homePage').dispatchEvent(new Event("click"));
        messageOne.textContent = "New User Added successfully";
    })
    .catch(error => {
        messageOne.textContent = error.message;
        if (addNewUser.phone.value.length > 10) {
            addNewUser.phone.value = addNewUser.phone.value.substr(4);
        }

    })
})

document.getElementById('editUser').addEventListener('click', (e) => {
    e.preventDefault()

    try {
        let flagError = true;

        flagError = valName(userName) && flagError;
        flagError = valEmail(email) && flagError;
        flagError = valPhone(phone) && flagError;
        flagError = valFile(avatar) && flagError;

        if (flagError == false) {
            throw new Error("Error found");
        }
    } catch (error) {
        return;
    }

    addNewUser.phone.value = "+91 " + addNewUser.phone.value
    const formData = new FormData(addNewUser);
    const url = "http://localhost:3000/user/" + document.getElementById('userId').value;

    fetch(url, {
        method: "PATCH",
        body:  formData
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then((body) => {
            throw new Error(body.message)
        })
    }).then(data => {
        document.getElementById('homePage').dispatchEvent(new Event("click"));
        messageOne.textContent = "User updated successfully";
    })
    .catch(error => {
        messageOne.textContent = error.message;
        if (addNewUser.phone.value.length > 10) {
            addNewUser.phone.value = addNewUser.phone.value.substr(4);
        }
    })
})

document.getElementById('homePage').dispatchEvent(new Event("click"));

$("#userData").on("click", ".edit", function (e) {  
    e.preventDefault();

    /**Show the user form and hide the search form*/
    document.getElementById('addNewUser').style.display = 'block';
    document.getElementById('findUser').style.display = 'none';

    /**Show the edit button and hide add button also update the heading*/
    document.getElementById('addUser').style.display = "none";
    document.getElementById('editUser').style.display = "inline-block";
    document.getElementById('userDisplayMessage').textContent = 'Use this page to edit user.';

    /**Get all the data from the row */
    const tr = $(this).closest("tr").html();
    const name = $(this).closest("tr").find(".name").html();
    const email = $(this).closest("tr").find(".email").html();
    let phone = $(this).closest("tr").find(".phone").html();
    const _id = $(this).closest("tr").find("._id").html();
    phone = phone.slice(4);

    /**Set all the values to the form */
    document.getElementById('userId').value = _id;
    document.getElementById('userName').value = name;
    document.getElementById('email').value = email;
    document.getElementById('phone').value = phone;
});

$("#userData").on("click", ".delete", function (e) {  
    e.preventDefault();

    const tr = $(this).closest("tr").html();
    const _id = $(this).closest("tr").find("._id").html();

    if (_id === undefined) {
        return messageOne.textContent = "Invalid operation performed";
    }
    var confirmation = confirm("Are you sure you want to delete the user")

    if (confirmation === true) {
        const url = 'http://localhost:3000/user/' + _id;
    
        fetch(url,{method: "delete"}).then((response) => {
            response.json().then((data) => {
                if (data) {
                    document.getElementById('homePage').dispatchEvent(new Event("click"));
                    messageOne.textContent = "User Deleted successfully";
                }
            })
        })
    }

})

/**Validate the name field*/
function valName(userName) {
    /**If name is empty display error message else return true and hide error message if any*/
    if (userName.value == "") {
        document.getElementById('errName').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Please enter a name.";
        document.getElementById('errName').style.display = "block";
        return false;
    }
    else{
        document.getElementById('errName').style.display = "none";
        return true;
    }
}

/**Validate the email field */
function valEmail(email) {
    /**Regular expression to match with input email value*/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    /**Compare with input with regex and if error display error message else return true and hide error message*/
    if (!emailRegex.test(email.value)) {
        document.getElementById('errEmail').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Please enter a valid email address.";
        document.getElementById('errEmail').style.display = "block";
        return false;
    }
    else{
        document.getElementById('errEmail').style.display = "none";
        return true;
    }
}

/**Validate the phone field */
function valPhone(phone) {
    /**Regular expression to compare phone number */
    const phoneRegex = /^[0-9]{10}$/;

    /**Compare with input with regex and if error display error message else return true and hide error message */
    if(!phoneRegex.test(phone.value)){
        document.getElementById('errPhone').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Please enter a valid 10 digit phone number.";
        document.getElementById('errPhone').style.display = "block";
        return false;
    }
    else{
        document.getElementById('errPhone').style.display = "none";
        return true;
    }

}

/** Validate the file at the time of adding or updating */
function valFile(file) {

    /**If no file uploaded  return true and hide error message*/
    if (avatar.files.length === 0) {
        document.getElementById('errAvatar').style.display = "none";
        return true;
    }
    else{
        /**If file is provided then check for the type of image uploaded and return error if other than allowed file type is uploaded */
        if ((file.files[0].type == "image/png" ) || (file.files[0].type == "image/jpg") || (file.files[0].type == "image/jpeg") ){
            document.getElementById('errAvatar').style.display = "none";
            return true;
        }
        else{
            document.getElementById('errAvatar').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Please upload a file that is png, jpg or jpeg";
            document.getElementById('errAvatar').style.display = "block";
            return false;
        }
    }    
}

/**Fill the data found from response */
function fillData(data) {
    /**Create the pagination button for total number of records and also pop the same element after button creation*/
    createPageBttuon(data[data.length-1].countUser);
    data.pop();

    /**Get table and empty table content */
    var userTable = document.getElementById('userData');
    userTable.textContent = "";
    
    /**Create a new row */
    var headerRow = document.createElement("tr");

    /**Create table header by taking the object keys */
    Object.keys(data[0]).forEach(function(key) {
        var headerCell = document.createElement("th");
        headerCell.appendChild(document.createTextNode(key));
        headerCell.classList.add(key)
        headerRow.appendChild(headerCell);
    });

    /**Add action column to the table header */
    var actionCell = document.createElement("th");
    actionCell.appendChild(document.createTextNode("Action"));
    actionCell.classList.add("action");
    headerRow.appendChild(actionCell);

    /**Add the user table in the header row  */
    userTable.appendChild(headerRow);

    /**Loop for each object in the data */
    data.forEach(function(item) {
        var dataRow = document.createElement("tr");

        /**Feed the data into the table elements and append it after completion*/
        Object.keys(item).forEach(function(key) {
            if (key != 'avatar') {
                var dataCell = document.createElement("td");
                dataCell.appendChild(document.createTextNode(item[key]));
                dataCell.classList.add(key)
                dataRow.appendChild(dataCell);
            }
            else{
                var dataCell = document.createElement("td");
                var image = document.createElement("img");
                if (item[key] === "") image.src = "images/default.jpeg"; 
                else image.src = "images/" + item[key];
                image.alt = "No profice pic found"
                image.classList.add(key)
                dataCell.appendChild(image);
                dataRow.appendChild(dataCell);
            }                    
        })
        var dataCell = document.createElement("td");
    
        /**Add Edit and Delete button at the end of table row data*/
        var editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.innerHTML = "Edit";

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete"
        deleteButton.classList.add("delete");
        
        dataCell.appendChild(editButton);
        dataCell.appendChild(deleteButton);
        dataRow.appendChild(dataCell);
    
        /**Append the data into the table */
        userTable.appendChild(dataRow);
    });
}

/**Perform the pagination operation according to the click on button */
function pagenation(skip, limit) {

    const url = readUserLink() + "&skip=" + skip + "&limit=" + limit ;
    fetchData(url);
}

/**Create pagination button according to requirement */
function createPageBttuon(dataLength) {
    /**Get pagination list, empty the list and set page count */
    let paginationList  = document.getElementById('paginationList')
    paginationList.textContent = "";
    let index = 0; /**Number of documents per page*/
    let pageCount = 0; /**number of page count */

    /**Add the buttons until the records are found */
    while (index < dataLength) {
        /**Create a new list item and button*/
        let listItem = document.createElement("li");
        listItem.classList.add("buttonPageination");

        /**Set the button's text content, id and class along with the on click event and after that insert the button to list item*/
        let buttonPage = document.createElement("button");
        buttonPage.textContent = pageCount+1;
        buttonPage.id = pageCount;
        buttonPage.addEventListener('click', function () {
            pagenation(parseInt(buttonPage.id)*5, 5);
        });
        listItem.appendChild(buttonPage);

        /**Add the list item to the list and increase the index*/
        paginationList.appendChild(listItem);
        index = index + 5;
        pageCount += 1;
    }
}

/**Fetch the data */
function fetchData(url) {
    /**Fetch the data */
    fetch(url).then((response) => {
        /**If data received then parse it into json */
        response.json().then((data) => {
            if (!data.message) {
                messageOne.textContent = "";
                fillData(data);
            }
            else{
                messageOne.textContent = data.message;
            }
        }).catch(() => {
            messageOne.textContent = "No user to display"
        })
    })
    .catch(() => {
        messageOne.textContent = "Unable to fetch data please try again."
    })
}

/**Revert back the link according to the request*/
function readUserLink(searchValue = ""){
    /**If the query is of search return the query of search else return the Page loading query*/
    if (document.getElementById('findUser').style.display == "block") {
        searchValue = document.querySelector('#search').value;
        return "http://localhost:3000/findUserData?data=" + searchValue;
        
    }
    else{
        return "http://localhost:3000/readUser?";
    }
}