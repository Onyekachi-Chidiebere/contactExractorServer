const fetchData = async ()=>{
    const url ='https://extractorserver.herokuapp.com/get-data';

    axios.post(url).then((response)=>{
        $('#emails').empty();
        $('#numbers').empty();
        let emails = Array.from(response.data.emails);
        let phoneNumbers = Array.from(response.data.num)
        console.log(response.data.emails,phoneNumbers)

        emails.forEach((email)=>{
            $('#emails').append(`<li>${email}</li>`)
        })

        phoneNumbers.forEach((phoneNumber)=>{
            $('#numbers').append(`<li>${phoneNumber}</li>`)
        })
    }).catch((error)=>{
        console.log(error)
    })
}
document.querySelector('button').addEventListener('click',fetchData)