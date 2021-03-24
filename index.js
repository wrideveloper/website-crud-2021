var url = 'https://aka-contact-backend.herokuapp.com/contact'
var hasil = '';

// ListContact
var listContact = document.getElementById('listContact')

// Add Data
var addName = document.getElementById('addName')
var addPhone = document.getElementById('addPhone')
var addContact = document.getElementById('addContact')

// Edit Data
var editName = document.getElementById('editName')
var editPhone = document.getElementById('editPhone')



// GET DATA
fetch(url, {
    method: 'GET'
})
    .then(res => res.json())
    .then(data =>
    {
        console.log(data)
        renderData(data)
    })


renderData = (data) =>
{
    data.forEach(item =>
    {
        hasil += `
                <div class="col mb-4">
                    <div class="card mx-auto">
                        <div class="card-body">
                            <div class="contact">
                                <img src="img/contact-name.png">
                                <p class="card-text">${item.name }</p>
                                <img src="img/phone.png">
                                <p class="card-text">${item.phone }</p>
                            </div>
                            <div class="card-button text-center mt-4">
                                <button type="button" class="btn btn-outline-success mx-2" data-bs-toggle="modal"
                                    data-bs-target="#editContact" onclick="editContact( '${item.id }')">EDIT</button>
                                <button type="button" class="btn btn-outline-danger mx-2" data-bs-toggle="modal"
                                    data-bs-target="#deleteContact" onclick = "confirmDelete('${item.id }')">DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
    })

    listContact.innerHTML = hasil;
}

// Add Contact

addContact.addEventListener('submit', (e) =>
{
    e.preventDefault()
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: addName.value,
            phone: addPhone.value
        })
    })
        .then(res => res.json())
        .then(data =>
        {
            var dataArray = []
            dataArray.push(data)
            renderData(dataArray)
            window.location.reload()

        })
})

// Edit Contact
editContact = (id) =>
{
    fetch(url + '/' + id, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data =>
        {
            editName.value = data.name
            editPhone.value = data.phone
        })

    var editContact = document.getElementById('editContact')
    editContact.addEventListener('submit', (e) =>
    {
        e.preventDefault()
        submitEdit(id)
    })
}


// Submit Contact
submitEdit = (id) =>
{
    fetch(url + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: editName.value,
            phone: editPhone.value
        })
    })
        .then(res => res.json())
        .then(data =>
        {
            var dataArray = []
            dataArray.push(data)
            renderData(dataArray)
            window.location.reload();
        })
}


// Confirm Delete
confirmDelete = (id) =>
{
    var deleteContactYes = document.getElementById('deleteContactYes')

    deleteContactYes.addEventListener('click', (e) =>
    {
        console.log(id)
        e.preventDefault()
        deleteContact(id)
    })
}


// Delete Contact 
deleteContact = (id) =>
{
    fetch(url + '/' + id, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data =>
        {
            console.log(data)
            window.location.reload()
        })
}









