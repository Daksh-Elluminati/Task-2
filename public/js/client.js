const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

let isEdit = false;

/**Display the form for search user along with the message */
document.getElementById('searchUser').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('findUser').style.display = 'block';
    document.getElementById('addNewUser').style.display = 'none';
    document.getElementById('userDisplayMessage').textContent = 'Use this page to search user data.';

    messageOne.textContent = "";
    messageTwo.textContent = "";
})

/**Display the form for adding user along with the message */
document.getElementById('addUserLink').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('addNewUser').style.display = 'block';
    document.getElementById('findUser').style.display = 'none';
    document.getElementById('userDisplayMessage').textContent = 'Use this page to add new user.';
    document.getElementById('addUser').style.display = "block";
    document.getElementById('editUser').style.display = "none";


    document.getElementById('userId').value = "";
    document.getElementById('userName').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";

    messageOne.textContent = "";
    messageTwo.textContent = "";
})

/**Display the home page message and hide all the necessaru */
document.getElementById('homePage').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('addNewUser').style.display = 'none';
    document.getElementById('findUser').style.display = 'none';
    document.getElementById('userDisplayMessage').textContent = 'Use this page to get all user  data.';

    messageOne.textContent = "";
    messageTwo.textContent = "";

    const url = "http://localhost:3000/readUser";

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data){
                var userTable = document.getElementById('userData');
                userTable.textContent = "";
                var headerRow = document.createElement("tr");

                Object.keys(data[0]).forEach(function(key) {
                    if (key != 'avatar') {
                        var headerCell = document.createElement("th");
                        headerCell.appendChild(document.createTextNode(key));
                        headerCell.classList.add(key)
                        headerRow.appendChild(headerCell);
                    }
                    else{
                        var headerCell = document.createElement("th");
                        headerCell.appendChild(document.createTextNode(key));
                        headerCell.classList.add(key)
                        headerRow.appendChild(headerCell);
                    }
                    
                });

                var actionCell = document.createElement("th");
                actionCell.appendChild(document.createTextNode("Action"));
                actionCell.classList.add("action");
                headerRow.appendChild(actionCell);

                userTable.appendChild(headerRow);

                data.forEach(function(item) {
                    var dataRow = document.createElement("tr");

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
                            image.src = "images/" + item[key];
                            image.classList.add(key)
                            dataCell.appendChild(image);
                            dataRow.appendChild(dataCell);
                        }                    
                    })
                    var dataCell = document.createElement("td");
                
                    var editButton = document.createElement("button");
                    editButton.classList.add("edit");
                    editButton.innerHTML = "Edit";

                    var deleteButton = document.createElement("button");
                    deleteButton.innerHTML = "Delete"
                    deleteButton.classList.add("delete");
                    
                    dataCell.appendChild(editButton);
                    dataCell.appendChild(deleteButton);

                    dataRow.appendChild(dataCell);
                


                    userTable.appendChild(dataRow);
                });
            }
        })
    })
})

findUser.addEventListener('submit', function(e){
    e.preventDefault();

    const searchValue = document.querySelector('#search').value;

    // client side approval if the search field is empty then display error message and return 
    if (searchValue === "") {
        messageOne.textContent = "Please enter any one from id, name, phone number, email";
        return messageTwo.textContent = "";
    }

    const url = 'http://localhost:3000/findUserData?data=' + searchValue;

    fetch(url).then((response) => {

        response.json().then((data) => {
            if (!data.message) {
                messageOne.textContent = "";
                messageTwo.textContent = "";

                var userTable = document.getElementById('userData');
                userTable.textContent = "";
                var headerRow = document.createElement("tr");

                Object.keys(data[0]).forEach(function(key) {
                    if (key != 'avatar') {
                        var headerCell = document.createElement("th");
                        headerCell.appendChild(document.createTextNode(key));
                        headerCell.classList.add(key)
                        headerRow.appendChild(headerCell);
                    }
                    else{
                        var headerCell = document.createElement("th");
                        headerCell.appendChild(document.createTextNode(key));
                        headerCell.classList.add(key)
                        headerRow.appendChild(headerCell);
                    }
                    
                });

                var actionCell = document.createElement("th");
                actionCell.appendChild(document.createTextNode("Action"));
                actionCell.classList.add("action");
                headerRow.appendChild(actionCell);

                userTable.appendChild(headerRow);

                data.forEach(function(item) {
                    var dataRow = document.createElement("tr");

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
                            image.src = "images/" + item[key];
                            image.classList.add(key)
                            dataCell.appendChild(image);
                            dataRow.appendChild(dataCell);
                        }                    
                    })
                    var dataCell = document.createElement("td");
                
                    var editButton = document.createElement("button");
                    editButton.classList.add("edit");
                    editButton.innerHTML = "Edit";

                    var deleteButton = document.createElement("button");
                    deleteButton.innerHTML = "Delete"
                    deleteButton.classList.add("delete");
                    
                    dataCell.appendChild(editButton);
                    dataCell.appendChild(deleteButton);

                    dataRow.appendChild(dataCell);
                


                    userTable.appendChild(dataRow);
                });

            }
            else{
                messageOne.textContent = "";
                messageTwo.textContent = data.message;
            }
        })
    })
});

/**ADD a new user */
document.getElementById('addUser').addEventListener('click', (e) => {
    e.preventDefault();    
    isEdit = false;

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
    
    
    console.log(addNewUser.phone.value.length);
    if (addNewUser.phone.value.length > 10 ) {
        document.getElementById('phone').value = addNewUser.phone.value.splice(4);
    }
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
        messageTwo.textContent = "";
    })
    .catch(error => {
        messageOne.textContent = error.message;
        messageTwo.textContent = "";
    })
})

document.getElementById('editUser').addEventListener('click', (e) => {
    e.preventDefault()
    isEdit = true;

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
        messageTwo.textContent = "";
    })
    .catch(error => {
        messageOne.textContent = error.message;
        messageTwo.textContent = "";
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
    document.getElementById('editUser').style.display = "block";
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
        messageOne.textContent = "Invalid operation performed";
        return messageTwo.textContent = "";
    }

    const url = 'http://localhost:3000/user/' + _id;

    fetch(url,{method: "delete"}).then((response) => {
        response.json().then((data) => {
            if (data) {
                document.getElementById('homePage').dispatchEvent(new Event("click"));
                messageOne.textContent = "User Deleted successfully";
                messageTwo.textContent = "";
            }
        })
    })

})

/**Validate the name field*/
function valName(userName) {
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
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
    const phoneRegex = /^[0-9]{10}$/;
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
    if (isEdit == true && avatar.files.length === 0) {
        document.getElementById('errAvatar').style.display = "none";
        return true;
    }
    else{
        if (isEdit == false && avatar.files.length === 0) {
            document.getElementById('errAvatar').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Please upload an image file.";
            document.getElementById('errAvatar').style.display = "block";
            return false;
        }
        else{
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

    
}

console.log("Git is working");