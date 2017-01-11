var data = [{
        "name": "regel1",
        "buzz": 1234,
        "delta": 0.3
    }, {
        "name": "regel2",
        "buzz": 1354,
        "delta": 0.3

    }, {
        "name": "regel3",
        "buzz": 1154,
        "delta": 0.1

    }, {
        "name": "regel4",
        "buzz": 1554,
        "delta": 0.3

    }, {
        "name": "regel5",
        "buzz": 1004,
        "delta": 0.8
    }

]


console.log(data)

function cumulise(data) {
    var vori = 0
    data[0].cum = 0
    for (var i = 1; i < data.length; i++) {    
        vori += data[i-1].buzz
        data[i].cum = vori
        data[i-1].cum_end = vori
    }
    
}

cumulise(data)
console.log(data)