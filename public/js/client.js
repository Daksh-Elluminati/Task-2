const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

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
                /*console.log(data[0].avatar);
                messageOne.textContent = "";
                messageTwo.innerHTML = "<b>Name: </b>"+ data[0].name + "<br><br><b>Email</b>: " + data[0].email + "<br><br><b>Phone number</b>: " + data[0].phone + "<br><br><p></p><b >Profile pic: </b>" + "<img class=\"avatar\" id=\"searchImage\" src=\"images/" + data[0].avatar + "\" alt=\"No profile pic found\" ></img></p>";

                document.getElementById('searchImage').style.display = 'inline-block';*/


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

addNewUser.addEventListener('submit', async function (e) {  
    e.preventDefault();

    const formData = new FormData(addNewUser);

    fetch(addNewUser.action, {
        method: addNewUser.method, 
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

    // console.log(name.value,email.value,phone.value,profile.value);

    // await document.getElementById('homePage').dispatchEvent(new Event("click"));
    
})

document.getElementById('homePage').dispatchEvent(new Event("click"));

$("#userData").on("click", ".edit", function (e) {  
    e.preventDefault();

    const tr = $(this).closest("tr").html();
    const name = $(this).closest("tr").find(".name").html();
    const email = $(this).closest("tr").find(".email").html();
    const phone = $(this).closest("tr").find(".phone").html();
    const _id = $(this).closest("tr").find("._id").html();

    console.log(name, email, phone, _id);
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